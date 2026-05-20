import { useState } from 'react';
import { Paperclip, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Textarea } from '../components/ui/textarea';
import type { PlannedAction, OutcomeFlag, OutcomeRecord } from '../../campaign/types';
import { SystemProposesPanel } from './SystemProposesPanel';

interface OutcomeUploadSurfaceProps {
  action: PlannedAction;
  campaignLabel: string;
  pendingOutcome?: OutcomeRecord;
  approvedProposalIds: Set<string>;
  onSubmit: (draft: {
    talkingPointsUsed: string[];
    concerns: string;
    outcomeFlag: OutcomeFlag;
    attachments: string[];
    callSummary?: string;
    emailOpens?: number;
    emailReplies?: number;
  }) => void;
  onApproveProposal: (proposalId: string) => void;
  onAcceptAllProposals: () => void;
}

const OUTCOME_FLAGS: { value: OutcomeFlag; label: string; activeClass: string }[] = [
  { value: 'positive', label: 'Positive', activeClass: 'bg-[#22C55E] text-[#0B1220] border-[#22C55E]' },
  { value: 'neutral', label: 'Neutral', activeClass: 'bg-[#6B7280] text-white border-[#6B7280]' },
  { value: 'concerns-raised', label: 'Concerns raised', activeClass: 'bg-[#F59E0B] text-[#0B1220] border-[#F59E0B]' },
  { value: 'negative', label: 'Negative', activeClass: 'bg-[#EF4444] text-white border-[#EF4444]' },
];

export function OutcomeUploadSurface({
  action,
  campaignLabel,
  pendingOutcome,
  approvedProposalIds,
  onSubmit,
  onApproveProposal,
  onAcceptAllProposals,
}: OutcomeUploadSurfaceProps) {
  const talkingPoints = action.talkingPoints ?? [];
  const [checkedPoints, setCheckedPoints] = useState<Set<string>>(new Set(talkingPoints.slice(0, 3)));
  const [concerns, setConcerns] = useState(
    'James asked whether the commodities allocation is tactical or structural — needs a written answer. Margaret raised fee adequacy vs peer group again.'
  );
  const [outcomeFlag, setOutcomeFlag] = useState<OutcomeFlag>('positive');
  const [callSummary, setCallSummary] = useState('');
  const [emailOpens, setEmailOpens] = useState(56);
  const [emailReplies, setEmailReplies] = useState(4);

  const togglePoint = (point: string) => {
    setCheckedPoints((prev) => {
      const next = new Set(prev);
      if (next.has(point)) next.delete(point);
      else next.add(point);
      return next;
    });
  };

  const handleSubmit = () => {
    onSubmit({
      talkingPointsUsed: Array.from(checkedPoints),
      concerns,
      outcomeFlag,
      attachments: ['Q1_review_deck.pptx', 'transcript_13_May.txt'],
      callSummary: action.type === 'Call' ? callSummary : undefined,
      emailOpens: action.type === 'Email' ? emailOpens : undefined,
      emailReplies: action.type === 'Email' ? emailReplies : undefined,
    });
  };

  return (
    <section className="rounded-xl border border-[#1F2937] bg-[#111827] overflow-hidden">
      <header className="px-6 py-4 border-b border-[#1F2937] bg-[#0B1220]">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
          Log outcome — {action.title.toLowerCase()}
          {action.scheduledDate ? ` on ${action.scheduledDate}` : ''}, {campaignLabel}
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <section className="p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-[#1F2937]">
          {action.type === 'Meeting' && talkingPoints.length > 0 && (
            <section>
              <p className="text-xs font-medium text-[#9CA3AF] mb-3">
                Talking points prepared — tick the ones you actually used
              </p>
              <ul className="space-y-2">
                {talkingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Checkbox
                      checked={checkedPoints.has(point)}
                      onCheckedChange={() => togglePoint(point)}
                      className="mt-0.5 border-[#374151]"
                    />
                    <span className="text-sm text-[#D1D5DB]">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {action.type === 'Email' && (
            <section className="grid grid-cols-2 gap-4">
              <label className="text-xs text-[#9CA3AF]">
                Opens
                <input
                  type="number"
                  value={emailOpens}
                  onChange={(e) => setEmailOpens(Number(e.target.value))}
                  className="mt-1 w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-3 py-2 text-white"
                />
              </label>
              <label className="text-xs text-[#9CA3AF]">
                Replies
                <input
                  type="number"
                  value={emailReplies}
                  onChange={(e) => setEmailReplies(Number(e.target.value))}
                  className="mt-1 w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-3 py-2 text-white"
                />
              </label>
            </section>
          )}

          {action.type === 'Call' && (
            <label className="block text-xs font-medium text-[#9CA3AF]">
              Call summary
              <Textarea
                value={callSummary}
                onChange={(e) => setCallSummary(e.target.value)}
                rows={4}
                className="mt-1 bg-[#0B1220] border-[#1F2937] text-white"
                placeholder="Summarise the call..."
              />
            </label>
          )}

          {(action.type === 'Meeting' || action.type === 'Call') && (
            <label className="block text-xs font-medium text-[#9CA3AF]">
              Client questions / concerns
              <Textarea
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                rows={5}
                className="mt-1 bg-[#0B1220] border-[#1F2937] text-white"
              />
            </label>
          )}

          {action.type === 'Meeting' && (
            <section>
              <p className="text-xs font-medium text-[#9CA3AF] mb-2">Attachments</p>
              <section className="flex flex-wrap gap-2">
                {['Q1_review_deck.pptx', 'transcript_13_May.txt'].map((file) => (
                  <span
                    key={file}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B1220] border border-[#374151] text-xs text-[#D1D5DB]"
                  >
                    <Paperclip className="w-3 h-3" />
                    {file}
                  </span>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-dashed border-[#374151] text-xs text-[#6B7280] hover:text-white"
                >
                  <Upload className="w-3 h-3" />
                  Upload
                </button>
              </section>
            </section>
          )}

          <section>
            <p className="text-xs font-medium text-[#9CA3AF] mb-2">Overall outcome</p>
            <section className="flex flex-wrap gap-2">
              {OUTCOME_FLAGS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setOutcomeFlag(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    outcomeFlag === f.value
                      ? f.activeClass
                      : 'border-[#374151] text-[#9CA3AF] hover:border-[#6B7280]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </section>
          </section>

          {!pendingOutcome && (
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            >
              Submit &amp; analyse
            </Button>
          )}
        </section>

        <section className="p-6 min-h-[320px]">
          {pendingOutcome ? (
            <SystemProposesPanel
              outcome={pendingOutcome}
              approvedIds={approvedProposalIds}
              onApprove={onApproveProposal}
              onAcceptAll={onAcceptAllProposals}
            />
          ) : (
            <section className="h-full flex items-center justify-center text-center text-sm text-[#6B7280] px-4">
              Submit an outcome to see system-proposed changes to the campaign and client context.
            </section>
          )}
        </section>
      </section>
    </section>
  );
}
