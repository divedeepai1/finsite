import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { consumeCanvasCampaignSave } from './canvasBridge';
import type { CampaignEvent, ClientContextEvent, OutcomeRecord, Suggestion, SuggestionStatus } from './types';
import { reduceCampaign } from './reduceCampaign';
import { reduceClientContext } from './reduceClientContext';
import {
  hartwellCampaignEvents,
  hartwellClientContextEvents,
  HARTWELL_CAMPAIGN_ID,
  HARTWELL_CLIENT_ID,
  buildMockOutcomeProposals,
} from './mockHartwellCampaign';

type EngineState = {
  campaignEvents: CampaignEvent[];
  clientContextEvents: ClientContextEvent[];
};

type EngineAction =
  | { type: 'APPEND_CAMPAIGN'; event: CampaignEvent }
  | { type: 'APPEND_CLIENT'; event: ClientContextEvent }
  | { type: 'SET_EVENTS'; campaignEvents: CampaignEvent[]; clientContextEvents: ClientContextEvent[] };

function engineReducer(state: EngineState, action: EngineAction): EngineState {
  switch (action.type) {
    case 'APPEND_CAMPAIGN':
      return { ...state, campaignEvents: [...state.campaignEvents, action.event] };
    case 'APPEND_CLIENT':
      return { ...state, clientContextEvents: [...state.clientContextEvents, action.event] };
    case 'SET_EVENTS':
      return {
        campaignEvents: action.campaignEvents,
        clientContextEvents: action.clientContextEvents,
      };
    default:
      return state;
  }
}

export function useCampaignEngine(
  campaignId: string = HARTWELL_CAMPAIGN_ID,
  clientId: string = HARTWELL_CLIENT_ID
) {
  const [state, dispatch] = useReducer(engineReducer, {
    campaignEvents: hartwellCampaignEvents,
    clientContextEvents: hartwellClientContextEvents,
  });

  const campaign = useMemo(
    () => reduceCampaign(state.campaignEvents, campaignId, clientId),
    [state.campaignEvents, campaignId, clientId]
  );

  const clientContext = useMemo(
    () => reduceClientContext(state.clientContextEvents, clientId),
    [state.clientContextEvents, clientId]
  );

  const appendCampaign = useCallback(
    (event: CampaignEvent) => {
      dispatch({ type: 'APPEND_CAMPAIGN', event: { ...event, meta: { ts: Date.now() } } });
    },
    []
  );

  useEffect(() => {
    const pending = consumeCanvasCampaignSave();
    if (pending && pending.campaignId === campaignId && pending.clientId === clientId) {
      dispatch({
        type: 'APPEND_CAMPAIGN',
        event: {
          type: 'CANVAS_SAVED',
          campaignId: pending.campaignId,
          clientId: pending.clientId,
          actionId: pending.campaignActionId,
          canvasDocId: pending.canvasDocId,
          status: 'ready-to-send',
          meta: { ts: Date.now() },
        },
      });
    }
  }, [campaignId, clientId]);

  const appendClient = useCallback((event: ClientContextEvent) => {
    dispatch({ type: 'APPEND_CLIENT', event });
  }, []);

  const submitOutcome = useCallback(
    (actionId: string) => {
      const outcome = buildMockOutcomeProposals(actionId);
      appendCampaign({
        type: 'OUTCOME_SUBMITTED',
        campaignId,
        clientId,
        outcome,
      });
    },
    [appendCampaign, campaignId, clientId]
  );

  const resolveSuggestion = useCallback(
    (suggestionId: string, resolution: SuggestionStatus, patch?: Partial<Suggestion>) => {
      appendCampaign({
        type: 'SUGGESTION_RESOLVED',
        campaignId,
        clientId,
        suggestionId,
        resolution,
        patch,
      });
    },
    [appendCampaign, campaignId, clientId]
  );

  const approveSuggestion = useCallback(
    (suggestion: Suggestion) => {
      resolveSuggestion(suggestion.id, 'approved');
    },
    [resolveSuggestion]
  );

  const dismissSuggestion = useCallback(
    (suggestionId: string) => {
      resolveSuggestion(suggestionId, 'dismissed');
    },
    [resolveSuggestion]
  );

  const approveProposal = useCallback(
    (outcomeActionId: string, proposalId: string) => {
      appendCampaign({
        type: 'PROPOSAL_APPROVED',
        campaignId,
        clientId,
        outcomeActionId,
        proposalId,
      });
      const proposal = campaign.pendingOutcome?.proposals.find((p) => p.id === proposalId);
      if (proposal?.category === 'update-client-context' && proposal.payload.concern) {
        appendClient({
          type: 'CONCERN_ADDED',
          clientId,
          concern: proposal.payload.concern as import('./types').ClientConcern,
        });
      }
    },
    [appendCampaign, appendClient, campaign.pendingOutcome, campaignId, clientId]
  );

  const acceptAllProposals = useCallback(
    (outcome: OutcomeRecord) => {
      const ids = outcome.proposals.map((p) => p.id);
      appendCampaign({
        type: 'PROPOSALS_BULK_ACCEPTED',
        campaignId,
        clientId,
        outcomeActionId: outcome.actionId,
        proposalIds: ids,
      });
      outcome.proposals.forEach((p) => {
        if (p.category === 'update-client-context' && p.payload.concern) {
          appendClient({
            type: 'CONCERN_ADDED',
            clientId,
            concern: p.payload.concern as import('./types').ClientConcern,
          });
        }
      });
    },
    [appendCampaign, appendClient, campaignId, clientId]
  );

  const completeAction = useCallback(
    (actionId: string, outcomeTag: string) => {
      appendCampaign({
        type: 'ACTION_COMPLETED',
        campaignId,
        clientId,
        actionId,
        outcomeTag,
      });
    },
    [appendCampaign, campaignId, clientId]
  );

  const linkCanvas = useCallback(
    (actionId: string, canvasDocId: string) => {
      appendCampaign({
        type: 'CANVAS_LINKED',
        campaignId,
        clientId,
        actionId,
        canvasDocId,
      });
    },
    [appendCampaign, campaignId, clientId]
  );

  const saveCanvas = useCallback(
    (actionId: string, canvasDocId: string) => {
      appendCampaign({
        type: 'CANVAS_SAVED',
        campaignId,
        clientId,
        actionId,
        canvasDocId,
        status: 'ready-to-send',
      });
    },
    [appendCampaign, campaignId, clientId]
  );

  return {
    campaign,
    clientContext,
    campaignEvents: state.campaignEvents,
    appendCampaign,
    appendClient,
    submitOutcome,
    resolveSuggestion,
    approveSuggestion,
    dismissSuggestion,
    approveProposal,
    acceptAllProposals,
    completeAction,
    linkCanvas,
    saveCanvas,
  };
}

export { HARTWELL_CAMPAIGN_ID, HARTWELL_CLIENT_ID };
