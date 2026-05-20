import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useCampaignEngine, HARTWELL_CAMPAIGN_ID, HARTWELL_CLIENT_ID } from '../../campaign/useCampaignEngine';
import { openCanvasForAction } from '../../campaign/canvasBridge';
import { TimelineTile } from './TimelineTile';
import { SuggestedActionCard } from './SuggestedActionCard';
import { ClientContextSection } from './ClientContextSection';
import { OutcomeUploadSurface } from './OutcomeUploadSurface';
import type { PlannedAction } from '../../campaign/types';

interface CampaignJourneyViewProps {
  onBack: () => void;
  campaignId?: string;
  clientId?: string;
}

export function CampaignJourneyView({
  onBack,
  campaignId = HARTWELL_CAMPAIGN_ID,
  clientId = HARTWELL_CLIENT_ID,
}: CampaignJourneyViewProps) {
  const navigate = useNavigate();
  const engine = useCampaignEngine(campaignId, clientId);
  const { campaign, clientContext } = engine;

  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [showOutcome, setShowOutcome] = useState(true);

  useEffect(() => {
    if (campaign.focusedActionId && !selectedActionId) {
      setSelectedActionId(campaign.focusedActionId);
    }
  }, [campaign.focusedActionId, selectedActionId]);

  const selectedAction: PlannedAction | null = useMemo(() => {
    const tile = campaign.tiles.find((t) => t.actionId === selectedActionId);
    return tile?.action ?? null;
  }, [campaign.tiles, selectedActionId]);

  const pendingSuggestion =
    campaign.suggestions.find((s) => s.status === 'pending') ?? null;

  const handleOpenCanvas = (actionId: string) => {
    const tile = campaign.tiles.find((t) => t.actionId === actionId);
    if (!tile || !clientContext) return;
    openCanvasForAction(tile.action, campaignId, clientId, clientContext);
    engine.linkCanvas(actionId, `canvas-${actionId}-${Date.now()}`);
    navigate('/insights?tab=canvas');
  };

  const handleSelectAction = (actionId: string) => {
    setSelectedActionId(actionId);
    setShowOutcome(true);
  };

  if (!clientContext) {
    return (
      <section className="p-8 text-[#9CA3AF]">
        Loading client context…
      </section>
    );
  }

  return (
    <section className="p-6 max-w-7xl mx-auto min-h-[calc(100vh-73px)] overflow-y-auto">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors mb-6 text-sm"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to campaigns
      </button>

      <header className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
            Campaign journey
          </p>
          <h1
            className="text-2xl text-white uppercase tracking-wide"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Hartwell — Q1 review
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">{clientContext.clientName}</p>
        </section>
        <section className="flex items-center gap-3">
          <ClientContextSection context={clientContext} variant="drawer" />
          <span className="flex items-center gap-2 text-[10px] font-bold text-[#22C55E] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            Active
          </span>
        </section>
      </header>

      <section className="mb-8 rounded-xl border border-[#1F2937] bg-[#111827] p-6 overflow-x-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-6">
          Timeline
        </p>
        <section className="relative min-w-max pb-4">
          <span className="absolute top-[36px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#1F2937] via-[#3B82F6]/20 to-[#1F2937] z-0" />
          <section className="flex items-start gap-6 relative z-10">
            {campaign.tiles.map((tile) => (
              <TimelineTile
                key={tile.actionId}
                tile={tile}
                isSelected={selectedActionId === tile.actionId}
                onSelect={handleSelectAction}
                onOpenCanvas={handleOpenCanvas}
              />
            ))}
          </section>
        </section>
        <TimelineLegend />
      </section>

      {pendingSuggestion && (
        <SuggestedActionCard
          suggestion={pendingSuggestion}
          onEdit={() => {}}
          onDismiss={() => engine.dismissSuggestion(pendingSuggestion.id)}
          onApprove={() => engine.approveSuggestion(pendingSuggestion)}
        />
      )}

      <ClientContextSection context={clientContext} variant="inline" />

      {showOutcome && selectedAction && (
        <OutcomeUploadSurface
          action={selectedAction}
          campaignLabel="action #3 of campaign"
          pendingOutcome={
            campaign.pendingOutcome?.actionId === selectedAction.id
              ? campaign.pendingOutcome
              : undefined
          }
          approvedProposalIds={campaign.approvedProposalIds}
          onSubmit={() => engine.submitOutcome(selectedAction.id)}
          onApproveProposal={(id) =>
            engine.approveProposal(selectedAction.id, id)
          }
          onAcceptAllProposals={() => {
            if (campaign.pendingOutcome) {
              engine.acceptAllProposals(campaign.pendingOutcome);
              engine.completeAction(selectedAction.id, 'DONE');
            }
          }}
        />
      )}
    </section>
  );
}

function TimelineLegend() {
  const items = [
    { label: 'Completed', className: 'border-[#22C55E] bg-[#22C55E]/20' },
    { label: 'Awaiting outcome', className: 'border-[#F59E0B] bg-[#F59E0B]/20' },
    { label: 'AI suggested', className: 'border-dashed border-[#A855F7] bg-[#A855F7]/20' },
    { label: 'Planned', className: 'border-[#374151] bg-[#1F2937]' },
    { label: 'Interrupt', className: 'border-[#EF4444] bg-[#EF4444]/20' },
  ];
  return (
    <section className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[#1F2937]">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2 text-[10px] text-[#6B7280]">
          <span className={`w-3 h-3 rounded border ${item.className}`} />
          {item.label}
        </span>
      ))}
    </section>
  );
}
