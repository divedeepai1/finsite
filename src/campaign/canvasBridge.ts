import type { PlannedAction } from './types';
import type { ClientContext } from './types';

export const CANVAS_LINK_KEY = 'canvasCampaignLink';
export const CANVAS_BLOCKS_KEY = 'canvasBlocks';

export interface CanvasCampaignLink {
  campaignActionId: string;
  clientId: string;
  campaignId: string;
  templateId?: string;
}

export function openCanvasForAction(
  action: PlannedAction,
  campaignId: string,
  clientId: string,
  clientContext: ClientContext | null
) {
  const blocks = buildEmailCanvasBlocks(action, clientContext);
  sessionStorage.setItem(CANVAS_BLOCKS_KEY, JSON.stringify(blocks));
  sessionStorage.setItem(
    CANVAS_LINK_KEY,
    JSON.stringify({
      campaignActionId: action.id,
      clientId,
      campaignId,
      templateId: action.template,
    } satisfies CanvasCampaignLink)
  );
}

function buildEmailCanvasBlocks(action: PlannedAction, context: ClientContext | null) {
  const clientName = context?.clientName ?? 'Client';
  const holdingsSummary =
    context?.holdings.map((h) => `${h.label} ${h.percent}%`).join(', ') ?? '';

  return [
    {
      blockId: `campaign-${action.id}`,
      blockTitle: action.title,
      sections: {
        description: `Personalised email for ${clientName}. Template: ${action.template ?? 'Campaign email'}.`,
        keyTopics: context?.concerns
          .filter((c) => c.status === 'open')
          .slice(0, 3)
          .map((c) => ({ topic: c.text, value: c.raisedBy, status: 'Open' })) ?? [
          { topic: 'Portfolio context', value: holdingsSummary || '—', status: 'Partial' },
        ],
        consensusViews: [
          `References campaign action: ${action.title} (Day ${action.dayOffset})`,
          action.notes ?? 'Draft content — edit in Canvas before sending.',
        ],
      },
      sectionVisibility: {
        description: true,
        summaryCards: false,
        keyTopics: true,
        keyDivergence: false,
        consensusViews: true,
      },
      layoutType: 'simple-text' as const,
      timestamp: Date.now(),
      blockType: 'Market Event' as const,
      campaignActionId: action.id,
    },
  ];
}

export function readCanvasCampaignLink(): CanvasCampaignLink | null {
  try {
    const raw = sessionStorage.getItem(CANVAS_LINK_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCanvasCampaignLink() {
  sessionStorage.removeItem(CANVAS_LINK_KEY);
}

const CANVAS_SAVE_PENDING_KEY = 'finsite_canvas_campaign_save';

/** Called from Canvas when user marks content ready — consumed by campaign journey on return */
export function markCanvasReadyToSend() {
  const link = readCanvasCampaignLink();
  if (!link) return false;
  localStorage.setItem(
    CANVAS_SAVE_PENDING_KEY,
    JSON.stringify({ ...link, canvasDocId: `doc-${link.campaignActionId}`, savedAt: Date.now() })
  );
  return true;
}

export function consumeCanvasCampaignSave(): (CanvasCampaignLink & { canvasDocId: string }) | null {
  try {
    const raw = localStorage.getItem(CANVAS_SAVE_PENDING_KEY);
    if (!raw) return null;
    localStorage.removeItem(CANVAS_SAVE_PENDING_KEY);
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
