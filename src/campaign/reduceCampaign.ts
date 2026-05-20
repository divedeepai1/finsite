import type {
  CampaignEvent,
  CampaignProjection,
  PlannedAction,
  Suggestion,
  TimelineTile,
  ActionTileState,
  Interrupt,
} from './types';

function mergePlan(base: PlannedAction[], approved: PlannedAction[]): PlannedAction[] {
  const byId = new Map<string, PlannedAction>();
  base.forEach((a) => byId.set(a.id, a));
  approved.forEach((a) => byId.set(a.id, a));
  return Array.from(byId.values()).sort((a, b) => a.dayOffset - b.dayOffset);
}

function buildTiles(
  plan: PlannedAction[],
  completedIds: Set<string>,
  outcomeTags: Record<string, string>,
  suggestions: Suggestion[],
  interrupts: Interrupt[],
  canvasStatus: Record<string, string>
): TimelineTile[] {
  const pendingSuggestions = suggestions.filter((s) => s.status === 'pending');
  const pendingByActionId = new Map<string, Suggestion>();
  pendingSuggestions.forEach((s) => {
    if (s.proposedAction) pendingByActionId.set(s.proposedAction.id, s);
    if (s.targetActionId) pendingByActionId.set(s.targetActionId, s);
  });

  const unroutedInterrupts = interrupts.filter((i) => !i.routed);
  const interruptActionIds = new Set<string>();

  const tiles: TimelineTile[] = plan.map((action) => {
    let visualState: ActionTileState = 'planned';
    let source: TimelineTile['source'] = 'plan';
    let outcomeTag: string | undefined;
    let suggestionId: string | undefined;
    let interruptId: string | undefined;

    const pending = pendingByActionId.get(action.id);
    const unrouted = unroutedInterrupts.find(
      (i) => i.routed?.mode === 'insert-suggested' || !i.routed
    );

    if (completedIds.has(action.id)) {
      visualState = 'completed';
      outcomeTag = outcomeTags[action.id] ?? 'DONE';
    } else if (pending?.proposedAction && !completedIds.has(action.id)) {
      if (pending.kind === 'new-action' && pending.proposedAction.id === action.id) {
        visualState = 'ai-suggested';
        source = 'suggestion';
        outcomeTag = 'SUGGESTED';
        suggestionId = pending.id;
      } else if (pending.kind === 'modify-action' && pending.targetActionId === action.id) {
        visualState = 'ai-suggested';
        source = 'suggestion';
        outcomeTag = 'SUGGESTED';
        suggestionId = pending.id;
      }
    } else if (unrouted && !completedIds.has(action.id)) {
      visualState = 'interrupt';
      source = 'interrupt';
      outcomeTag = 'FLAGGED';
      interruptId = unrouted.id;
      interruptActionIds.add(action.id);
    } else if (!completedIds.has(action.id)) {
      visualState = 'planned';
      outcomeTag = 'PLANNED';
    }

    if (canvasStatus[action.id] === 'ready-to-send' && visualState === 'planned') {
      outcomeTag = 'READY';
    }

    return {
      actionId: action.id,
      action,
      source,
      visualState,
      outcomeTag,
      suggestionId,
      interruptId,
    };
  });

  // Append pure suggested actions not yet in plan merge
  pendingSuggestions.forEach((s) => {
    if (s.kind === 'new-action' && s.proposedAction && !plan.find((p) => p.id === s.proposedAction!.id)) {
      tiles.push({
        actionId: s.proposedAction.id,
        action: s.proposedAction,
        source: 'suggestion',
        visualState: 'ai-suggested',
        outcomeTag: 'SUGGESTED',
        suggestionId: s.id,
      });
    }
  });

  tiles.sort((a, b) => a.action.dayOffset - b.action.dayOffset);

  // Mark first non-completed as awaiting-upload (amber focus)
  const firstOpen = tiles.find(
    (t) => t.visualState !== 'completed' && t.visualState !== 'ai-suggested'
  );
  if (firstOpen) {
    firstOpen.visualState = 'awaiting-upload';
    firstOpen.isCurrentFocus = true;
    if (!firstOpen.outcomeTag || firstOpen.outcomeTag === 'PLANNED') {
      firstOpen.outcomeTag = undefined;
    }
  }

  return tiles;
}

export function reduceCampaign(
  events: CampaignEvent[],
  campaignId: string,
  clientId: string
): CampaignProjection {
  let plan: PlannedAction[] = [];
  const approvedActions: PlannedAction[] = [];
  const completedActionIds = new Set<string>();
  const outcomeTags: Record<string, string> = {};
  const canvasStatus: Record<string, 'ready-to-send' | 'linked'> = {};
  const suggestions: Suggestion[] = [];
  const interrupts: Interrupt[] = [];
  let pendingOutcome: CampaignProjection['pendingOutcome'];
  const approvedProposalIds = new Set<string>();

  for (const event of events) {
    if (event.campaignId !== campaignId && event.type !== 'INTERRUPT_RECEIVED' && event.type !== 'INTERRUPT_ROUTED') {
      if (event.type === 'INTERRUPT_RECEIVED' && event.interrupt.campaignId !== campaignId) continue;
    }
    if ('clientId' in event && event.clientId !== clientId) continue;

    switch (event.type) {
      case 'CAMPAIGN_ACTIVATED':
        plan = [...event.plan];
        break;
      case 'ACTION_COMPLETED':
        completedActionIds.add(event.actionId);
        outcomeTags[event.actionId] = event.outcomeTag;
        break;
      case 'OUTCOME_SUBMITTED':
        pendingOutcome = event.outcome;
        break;
      case 'SUGGESTION_CREATED':
        suggestions.push(event.suggestion);
        break;
      case 'SUGGESTION_RESOLVED': {
        const idx = suggestions.findIndex((s) => s.id === event.suggestionId);
        if (idx >= 0) {
          const updated = {
            ...suggestions[idx],
            ...event.patch,
            status: event.resolution,
          };
          suggestions[idx] = updated;
          if (event.resolution === 'approved' || event.resolution === 'edited-approved') {
            if (updated.proposedAction) {
              approvedActions.push(updated.proposedAction);
            }
          }
        }
        break;
      }
      case 'PROPOSAL_APPROVED':
        approvedProposalIds.add(event.proposalId);
        applyProposal(
          event.proposalId,
          pendingOutcome,
          approvedActions,
          completedActionIds,
          outcomeTags,
          approvedProposalIds
        );
        break;
      case 'PROPOSALS_BULK_ACCEPTED':
        event.proposalIds.forEach((pid) => {
          approvedProposalIds.add(pid);
          applyProposal(
            pid,
            pendingOutcome,
            approvedActions,
            completedActionIds,
            outcomeTags,
            approvedProposalIds
          );
        });
        if (pendingOutcome && event.proposalIds.length > 0) {
          completedActionIds.add(pendingOutcome.actionId);
          outcomeTags[pendingOutcome.actionId] =
            pendingOutcome.draft.outcomeFlag === 'positive'
              ? 'DONE'
              : pendingOutcome.draft.outcomeFlag === 'concerns-raised'
                ? 'CONCERNS'
                : 'LOGGED';
          pendingOutcome = undefined;
        }
        break;
      case 'INTERRUPT_RECEIVED':
        if (event.interrupt.campaignId === campaignId) {
          interrupts.push(event.interrupt);
        }
        break;
      case 'INTERRUPT_ROUTED': {
        const i = interrupts.find((x) => x.id === event.interruptId);
        if (i) i.routed = event.route;
        break;
      }
      case 'CANVAS_LINKED':
        canvasStatus[event.actionId] = 'linked';
        break;
      case 'CANVAS_SAVED':
        canvasStatus[event.actionId] = 'ready-to-send';
        break;
    }
  }

  const mergedPlan = mergePlan(plan, approvedActions);
  const tiles = buildTiles(
    mergedPlan,
    completedActionIds,
    outcomeTags,
    suggestions,
    interrupts,
    canvasStatus
  );

  const pendingSuggestion =
    suggestions.find((s) => s.status === 'pending' && s.kind === 'new-action') ?? null;

  const focusedActionId =
    tiles.find((t) => t.isCurrentFocus)?.actionId ?? null;

  return {
    campaignId,
    clientId,
    plan,
    approvedActions,
    completedActionIds,
    outcomeTags,
    canvasStatus,
    suggestions,
    interrupts,
    pendingOutcome,
    approvedProposalIds,
    tiles,
    pendingSuggestion,
    focusedActionId,
  };
}

function applyProposal(
  proposalId: string,
  pendingOutcome: CampaignProjection['pendingOutcome'],
  approvedActions: PlannedAction[],
  completedActionIds: Set<string>,
  outcomeTags: Record<string, string>,
  approvedProposalIds: Set<string>
) {
  if (!pendingOutcome) return;
  const proposal = pendingOutcome.proposals.find((p) => p.id === proposalId);
  if (!proposal || approvedProposalIds.has(proposalId)) return;

  if (proposal.category === 'add-action' && proposal.payload.action) {
    approvedActions.push(proposal.payload.action as PlannedAction);
  }
  if (proposal.category === 'modify-upcoming' && proposal.payload.patch) {
    const targetId = proposal.payload.targetActionId as string;
    const patch = proposal.payload.patch as Partial<PlannedAction>;
    const existing = approvedActions.find((a) => a.id === targetId);
    if (existing) {
      Object.assign(existing, patch);
    } else {
      approvedActions.push({
        id: targetId,
        type: 'Email',
        title: patch.title ?? 'Modified action',
        dayOffset: patch.dayOffset ?? 14,
        ...patch,
      } as PlannedAction);
    }
  }
}
