import { Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import type { Suggestion } from '../../campaign/types';

interface SuggestedActionCardProps {
  suggestion: Suggestion;
  onEdit: () => void;
  onDismiss: () => void;
  onApprove: () => void;
}

function ReasonColumn({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-2">{label}</p>
      <p className="text-sm text-[#D1D5DB] leading-relaxed">{text}</p>
    </div>
  );
}

export function SuggestedActionCard({ suggestion, onEdit, onDismiss, onApprove }: SuggestedActionCardProps) {
  const { reasoning, title } = suggestion;

  return (
    <div className="rounded-xl border-2 border-dashed border-[#A855F7]/60 bg-[#1C1A3A]/40 p-6 mb-8">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#A855F7] mb-2">
        Suggested action · awaiting your approval
      </p>
      <h3 className="text-lg font-medium text-white mb-6">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ReasonColumn label="Why now" text={reasoning.whyNow} />
        <ReasonColumn label="Why this client" text={reasoning.whyThisClient} />
        <ReasonColumn label="Proposed content" text={reasoning.whatContent} />
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <Button
          variant="outline"
          onClick={onEdit}
          className="border-[#374151] text-[#D1D5DB] hover:text-white hover:bg-[#1F2937] min-w-[120px]"
        >
          Edit
        </Button>
        <Button
          variant="outline"
          onClick={onDismiss}
          className="border-[#374151] text-[#D1D5DB] hover:text-white hover:bg-[#1F2937] min-w-[120px]"
        >
          Dismiss
        </Button>
        <Button
          variant="outline"
          onClick={onApprove}
          className="border-[#374151] text-[#D1D5DB] hover:text-white hover:bg-[#1F2937] min-w-[120px]"
        >
          <Sparkles className="w-4 h-4 mr-1.5 text-[#A855F7]" />
          Approve &amp; add
        </Button>
      </div>
    </div>
  );
}
