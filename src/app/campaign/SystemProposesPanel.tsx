import { Sparkles, Check, Pencil } from 'lucide-react';
import { Button } from '../components/ui/button';
import type { OutcomeRecord, SystemProposal } from '../../campaign/types';

interface SystemProposesPanelProps {
  outcome: OutcomeRecord;
  approvedIds: Set<string>;
  onApprove: (proposalId: string) => void;
  onAcceptAll: () => void;
}

const CATEGORY_LABELS: Record<SystemProposal['category'], string> = {
  'add-action': 'Add action',
  'modify-upcoming': 'Modify upcoming action',
  'update-client-context': 'Update client context',
};

export function SystemProposesPanel({
  outcome,
  approvedIds,
  onApprove,
  onAcceptAll,
}: SystemProposesPanelProps) {
  return (
    <aside className="rounded-xl border border-[#A855F7]/30 bg-[#1C1A3A]/30 p-5 flex flex-col h-full">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#A855F7] mb-4 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        System proposes
      </p>

      <ul className="space-y-4 flex-1 overflow-y-auto">
        {outcome.proposals.map((proposal) => (
          <ProposalItem
            key={proposal.id}
            proposal={proposal}
            approved={approvedIds.has(proposal.id)}
            onApprove={() => onApprove(proposal.id)}
          />
        ))}
      </ul>

      <div className="flex gap-2 mt-4 pt-4 border-t border-[#1F2937]">
        <Button
          variant="outline"
          className="flex-1 border-[#374151] text-[#D1D5DB] text-xs"
          onClick={() => {}}
        >
          <Pencil className="w-3.5 h-3.5 mr-1" />
          Review &amp; edit
        </Button>
        <Button
          className="flex-1 bg-[#A855F7]/20 hover:bg-[#A855F7]/30 text-[#D8B4FE] border border-[#A855F7]/40 text-xs"
          onClick={onAcceptAll}
        >
          Accept all &amp; commit
        </Button>
      </div>
    </aside>
  );
}

function ProposalItem({
  proposal,
  approved,
  onApprove,
}: {
  proposal: SystemProposal;
  approved: boolean;
  onApprove: () => void;
}) {
  return (
    <li
      className={`p-3 rounded-lg border text-sm ${
        approved ? 'border-[#22C55E]/40 bg-[#22C55E]/5' : 'border-[#374151] bg-[#0B1220]'
      }`}
    >
      <p className="text-[9px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">
        {CATEGORY_LABELS[proposal.category]}
      </p>
      <p className="text-[#D1D5DB] font-medium">{proposal.summary}</p>
      {proposal.detail && <p className="text-xs text-[#6B7280] mt-1">{proposal.detail}</p>}
      {!approved && (
        <Button
          variant="outline"
          onClick={onApprove}
          className="mt-2 h-7 text-xs border-[#374151] text-[#9CA3AF] px-2 py-1"
        >
          <Check className="w-3 h-3 mr-1" />
          Approve
        </Button>
      )}
      {approved && (
        <span className="inline-flex items-center gap-1 mt-2 text-[10px] text-[#22C55E] font-bold uppercase">
          <Check className="w-3 h-3" /> Approved
        </span>
      )}
    </li>
  );
}
