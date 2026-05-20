export type ActionType = 'Email' | 'Call' | 'Follow-up' | 'Meeting';

export type ActionTileState =
  | 'completed'
  | 'awaiting-upload'
  | 'ai-suggested'
  | 'planned'
  | 'interrupt';

export type OutcomeFlag = 'positive' | 'neutral' | 'concerns-raised' | 'negative';

export type SuggestionStatus = 'pending' | 'approved' | 'edited-approved' | 'dismissed' | 'expired';

export type ProposalCategory = 'add-action' | 'modify-upcoming' | 'update-client-context';

export interface PlannedAction {
  id: string;
  type: ActionType;
  title: string;
  template?: string;
  dayOffset: number;
  scheduledDate?: string;
  notes?: string;
  talkingPoints?: string[];
}

export interface TimelineTile {
  actionId: string;
  action: PlannedAction;
  source: 'plan' | 'suggestion' | 'interrupt';
  visualState: ActionTileState;
  outcomeTag?: string;
  isCurrentFocus?: boolean;
  suggestionId?: string;
  interruptId?: string;
}

export interface SuggestionReasoning {
  whyNow: string;
  whyThisClient: string;
  whatContent: string;
}

export interface Suggestion {
  id: string;
  campaignId: string;
  clientId: string;
  kind: 'new-action' | 'modify-action' | 'client-context-update';
  title: string;
  reasoning: SuggestionReasoning;
  proposedAction?: PlannedAction;
  modifyPatch?: Partial<PlannedAction>;
  targetActionId?: string;
  status: SuggestionStatus;
  expiresAt?: string;
}

export interface SystemProposal {
  id: string;
  category: ProposalCategory;
  summary: string;
  detail?: string;
  payload: Record<string, unknown>;
}

export interface OutcomeDraft {
  actionId: string;
  talkingPointsUsed: string[];
  concerns: string;
  outcomeFlag: OutcomeFlag;
  attachments: string[];
  emailOpens?: number;
  emailReplies?: number;
  callSummary?: string;
}

export interface OutcomeRecord {
  actionId: string;
  draft: OutcomeDraft;
  submittedAt: string;
  proposals: SystemProposal[];
}

export type InterruptRoute =
  | { mode: 'notify-only' }
  | { mode: 'insert-suggested'; targetCampaignId: string }
  | { mode: 'standalone'; action: PlannedAction };

export interface Interrupt {
  id: string;
  clientId: string;
  campaignId: string;
  trigger: string;
  title: string;
  routed?: InterruptRoute;
}

export interface ClientConcern {
  id: string;
  text: string;
  raisedBy: string;
  raisedAt: string;
  status: 'open' | 'resolved';
}

export interface Holding {
  label: string;
  percent: number;
}

export interface CompetitorFund {
  name: string;
  note: string;
}

export interface RelationshipNote {
  id: string;
  name: string;
  role: string;
  note: string;
}

export interface ClientContext {
  clientId: string;
  clientName: string;
  concerns: ClientConcern[];
  holdings: Holding[];
  competitors: CompetitorFund[];
  relationshipNotes: RelationshipNote[];
}

// --- Events ---

export interface CampaignMeta {
  ts: number;
  userId?: string;
}

export type CampaignEvent =
  | { type: 'CAMPAIGN_ACTIVATED'; campaignId: string; clientId: string; plan: PlannedAction[]; meta?: CampaignMeta }
  | { type: 'ACTION_COMPLETED'; campaignId: string; clientId: string; actionId: string; outcomeTag: string; meta?: CampaignMeta }
  | { type: 'OUTCOME_SUBMITTED'; campaignId: string; clientId: string; outcome: OutcomeRecord; meta?: CampaignMeta }
  | { type: 'SUGGESTION_CREATED'; campaignId: string; clientId: string; suggestion: Suggestion; meta?: CampaignMeta }
  | { type: 'SUGGESTION_RESOLVED'; campaignId: string; clientId: string; suggestionId: string; resolution: SuggestionStatus; patch?: Partial<Suggestion>; meta?: CampaignMeta }
  | { type: 'PROPOSAL_APPROVED'; campaignId: string; clientId: string; outcomeActionId: string; proposalId: string; meta?: CampaignMeta }
  | { type: 'PROPOSALS_BULK_ACCEPTED'; campaignId: string; clientId: string; outcomeActionId: string; proposalIds: string[]; meta?: CampaignMeta }
  | { type: 'INTERRUPT_RECEIVED'; interrupt: Interrupt; meta?: CampaignMeta }
  | { type: 'INTERRUPT_ROUTED'; interruptId: string; route: InterruptRoute; meta?: CampaignMeta }
  | { type: 'CANVAS_LINKED'; campaignId: string; clientId: string; actionId: string; canvasDocId: string; meta?: CampaignMeta }
  | { type: 'CANVAS_SAVED'; campaignId: string; clientId: string; actionId: string; canvasDocId: string; status: 'ready-to-send'; meta?: CampaignMeta };

export type ClientContextEvent =
  | { type: 'CONCERN_ADDED'; clientId: string; concern: ClientConcern }
  | { type: 'CONCERN_RESOLVED'; clientId: string; concernId: string }
  | { type: 'HOLDINGS_UPDATED'; clientId: string; holdings: Holding[] }
  | { type: 'RELATIONSHIP_NOTE_ADDED'; clientId: string; note: RelationshipNote }
  | { type: 'CONTEXT_INITIALIZED'; clientId: string; context: Omit<ClientContext, 'clientId'> };

export interface CampaignProjection {
  campaignId: string;
  clientId: string;
  plan: PlannedAction[];
  approvedActions: PlannedAction[];
  completedActionIds: Set<string>;
  outcomeTags: Record<string, string>;
  canvasStatus: Record<string, 'ready-to-send' | 'linked'>;
  suggestions: Suggestion[];
  interrupts: Interrupt[];
  pendingOutcome?: OutcomeRecord;
  approvedProposalIds: Set<string>;
  tiles: TimelineTile[];
  pendingSuggestion: Suggestion | null;
  focusedActionId: string | null;
}
