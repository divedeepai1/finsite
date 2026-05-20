import { useState, type ReactNode } from 'react';
import {
  Play,
  Info,
  Snowflake,
  RefreshCw,
  TrendingUp,
  Target,
  ClipboardCheck,
  MoreHorizontal,
  Presentation,
  FileText,
  X,
  Upload,
  Plus,
  Mic,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Pencil,
  Flag,
} from 'lucide-react';
import { Button } from './components/ui/button';

type MeetingMode = 'setup' | 'live';
type MeetingTypeId = 'cold' | 'discovery' | 'market' | 'pitch' | 'review' | 'other';
type ToneId = 'reassuring' | 'technical' | 'persuasive' | 'neutral';

const CLIENTS = [
  'Hartwell Pension Trustees',
  'Northvale Family Office',
  'Sienna Capital LLP',
];

const MEETING_TYPES: { id: MeetingTypeId; label: string; icon: ReactNode }[] = [
  { id: 'cold', label: 'Cold first', icon: <Snowflake className="w-3.5 h-3.5 mr-1 inline" /> },
  { id: 'discovery', label: 'Discovery', icon: <RefreshCw className="w-3.5 h-3.5 mr-1 inline" /> },
  { id: 'market', label: 'Market update', icon: <TrendingUp className="w-3.5 h-3.5 mr-1 inline" /> },
  { id: 'pitch', label: 'Pitch', icon: <Target className="w-3.5 h-3.5 mr-1 inline" /> },
  { id: 'review', label: 'Review', icon: <ClipboardCheck className="w-3.5 h-3.5 mr-1 inline" /> },
  { id: 'other', label: 'Other', icon: <MoreHorizontal className="w-3.5 h-3.5 mr-1 inline" /> },
];

const TONES: { id: ToneId; label: string }[] = [
  { id: 'reassuring', label: 'Reassuring' },
  { id: 'technical', label: 'Technical' },
  { id: 'persuasive', label: 'Persuasive' },
  { id: 'neutral', label: 'Neutral' },
];

const UPLOADS = [
  { id: 'u1', name: 'Q1_review_deck.pptx', meta: '18 slides · uploaded 4m ago', icon: Presentation, color: 'text-[#F2A623]' },
  { id: 'u2', name: 'Hartwell_notes.docx', meta: '3 pages · prior meeting notes', icon: FileText, color: 'text-[#4FA8F5]' },
];

const READY_REFERENCES = [
  { id: 'r1', tag: 'News', tagBg: 'bg-[#122948]', tagColor: 'text-[#4FA8F5]', text: 'UK CPI surprises lower at 2.3% — sales lens applied' },
  { id: 'r2', tag: 'Fund', tagBg: 'bg-[#133527]', tagColor: 'text-[#2DD881]', text: 'Capture ratios — 104 / 78 vs MSCI' },
  { id: 'r3', tag: 'Historical', tagBg: 'bg-[#2B1B3D]', tagColor: 'text-[#C893FF]', text: 'Regret simulator — COVID sell-and-wait outcome' },
  { id: 'r4', tag: 'Fund', tagBg: 'bg-[#133527]', tagColor: 'text-[#2DD881]', text: 'Withdrawal stress — 4% through COVID' },
];

const SLIDE_PREVIEWS = [
  {
    num: 1,
    onSlide: 'Title slide — Q1 2026 portfolio review for Hartwell Pension Trustees.',
    talking: 'Open by referencing their March concern about gilt exposure — signals you listened.',
    questions: '"How did the Real Return sleeve perform?" — bridge to slide 7.',
  },
  {
    num: 7,
    onSlide: 'Real Return sleeve YTD attribution — bar chart showing commodities +110bp.',
    talking: 'Lead with the supply-chain thesis from your April commentary — proves the call was deliberate.',
    questions: '"Is the commodities call tactical or structural?" — pre-empt with durability framing.',
  },
];

const LIVE_REFERENCES = [
  { id: 'l1', tag: 'Fund', tagBg: 'bg-[#133527]', tagColor: 'text-[#2DD881]', title: 'Capture 104 / 78', sub: 'Tap to expand', active: false },
  { id: 'l2', tag: 'Fund', tagBg: 'bg-[#133527]', tagColor: 'text-[#2DD881]', title: 'Withdrawal stress · COVID', sub: 'Open', active: true },
  { id: 'l3', tag: 'Hist.', tagBg: 'bg-[#2B1B3D]', tagColor: 'text-[#C893FF]', title: 'Regret simulator', sub: 'Tap to expand', active: false },
  { id: 'l4', tag: 'News', tagBg: 'bg-[#122948]', tagColor: 'text-[#4FA8F5]', title: 'UK CPI 2.3%', sub: 'Tap to expand', active: false },
];

const SLIDE_PROGRESS = Array.from({ length: 18 }, (_, i) => {
  if (i < 6) return 'done';
  if (i === 6) return 'current';
  return 'pending';
});

function PillButton({
  active,
  onClick,
  children,
  className = '',
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1.5 text-xs text-[#C9D6E8] font-normal transition-colors text-left ${className} ${
        active
          ? 'bg-[#122948] border-[#4FA8F5] text-white'
          : 'bg-[#0F1E36] border-[#1F3257] hover:bg-[#14253F]'
      }`}
    >
      {children}
    </button>
  );
}

function SnipButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={`rounded border border-[#1F3257] bg-transparent px-1.5 py-0.5 text-[10px] text-[#C9D6E8] hover:bg-[#14253F] ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[10px] border border-[#1F3257]/50 bg-[#0F1E36] p-3.5 px-4 ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#4FA8F5] m-0">{title}</p>
      {right}
    </div>
  );
}

function FieldLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[10px] font-medium uppercase tracking-[0.06em] text-[#6A88B0] m-0 mb-1.5 ${className}`}>
      {children}
    </p>
  );
}

function SetupMode({
  client,
  setClient,
  meetingType,
  setMeetingType,
  tone,
  setTone,
  objective,
  setObjective,
  onStart,
}: {
  client: string;
  setClient: (v: string) => void;
  meetingType: MeetingTypeId;
  setMeetingType: (v: MeetingTypeId) => void;
  tone: ToneId;
  setTone: (v: ToneId) => void;
  objective: string;
  setObjective: (v: string) => void;
  onStart: () => void;
}) {
  return (
  <div>
      <div className="flex justify-between items-end mb-3.5">
        <div>
          <p className="m-0 mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#6A88B0]">
            Meeting preparation
          </p>
          <h3 className="m-0 text-lg font-medium text-white">Set up a new meeting</h3>
        </div>
        <Button
          onClick={onStart}
          className="bg-[#4FA8F5] hover:bg-[#3d96e8] text-[#0A1628] font-medium text-[13px] h-9 px-4 rounded-md border-0"
        >
          <Play className="w-4 h-4 mr-1" />
          Start meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 mb-3">
        <Card>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#4FA8F5] mb-2.5 m-0">Client</p>
          <FieldLabel>Select client</FieldLabel>
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full mb-2.5 rounded-md border border-[#1F3257] bg-[#0A1628] px-2.5 py-2 text-[13px] text-white"
          >
            {CLIENTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="__new">+ Add new client</option>
          </select>
          <div className="rounded-md border border-[#1F3257] bg-[#0A1628] px-2.5 py-2">
            <p className="m-0 mb-1 text-[11px] font-medium text-white">{client}</p>
            <p className="m-0 text-[11px] text-[#8FA4C2] leading-snug">
              £140m AUM · DB scheme · 6 prior meetings · Last met 11 Mar 2026
            </p>
            <p className="mt-1.5 mb-0 text-[11px] text-[#C9D6E8] leading-snug flex items-start gap-1">
              <Info className="w-3 h-3 text-[#F2A623] shrink-0 mt-0.5" />
              Trustees noted concern about UK gilt exposure in last meeting.
            </p>
          </div>
        </Card>

        <Card>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#4FA8F5] mb-2.5 m-0">
            Meeting type
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {MEETING_TYPES.map((t) => (
              <PillButton key={t.id} active={meetingType === t.id} onClick={() => setMeetingType(t.id)}>
                {t.icon}
                {t.label}
              </PillButton>
            ))}
          </div>
          <FieldLabel className="mt-3">Meeting time</FieldLabel>
          <div className="flex gap-1.5 items-center">
            <input
              defaultValue="Wed 13 May, 10:30"
              className="flex-1 rounded-md border border-[#1F3257] bg-[#0A1628] px-2.5 py-2 text-[13px] text-white"
            />
            <span className="text-[11px] text-[#6A88B0] whitespace-nowrap">In 2 days</span>
          </div>
        </Card>

        <Card>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#4FA8F5] mb-2.5 m-0">
            Primary objective
          </p>
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-md border border-[#1F3257] bg-[#0A1628] px-2.5 py-2 text-[13px] text-white font-sans"
          />
          <FieldLabel className="mt-3">Tone</FieldLabel>
          <div className="flex flex-wrap gap-1">
            {TONES.map((t) => (
              <PillButton key={t.id} active={tone === t.id} onClick={() => setTone(t.id)}>
                {t.label}
              </PillButton>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 mb-3">
        <Card>
          <CardHeader title="Uploads" right={<span className="text-[10px] text-[#6A88B0]">Drag files anywhere on this panel</span>} />
          <div className="flex gap-2 mb-2.5">
            {UPLOADS.map((file) => (
              <div
                key={file.id}
                className="flex flex-1 min-w-0 items-center gap-2 rounded-md border border-[#1F3257] bg-[#0A1628] px-2.5 py-2"
              >
                <file.icon className={`w-[22px] h-[22px] shrink-0 ${file.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="m-0 text-xs font-medium text-white truncate">{file.name}</p>
                  <p className="mt-0.5 mb-0 text-[10px] text-[#8FA4C2]">{file.meta}</p>
                </div>
                <SnipButton>
                  <X className="w-3 h-3" />
                </SnipButton>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-dashed border-[#1F3257] bg-[#0A1628] p-3.5 text-center cursor-pointer hover:border-[#4FA8F5] hover:bg-[#0D1A2F] transition-colors">
            <Upload className="w-[18px] h-[18px] text-[#6A88B0] mx-auto mb-1" />
            <p className="m-0 text-xs text-[#C9D6E8]">Add deck, notes, or client documents</p>
            <p className="mt-0.5 mb-0 text-[10px] text-[#6A88B0]">PPTX, DOCX, PDF · drag from desktop</p>
          </div>
        </Card>

        <Card>
          <CardHeader title="Ready references" right={<span className="text-[10px] text-[#6A88B0]">Pinned from other pages</span>} />
          <div className="flex flex-col gap-1.5">
            {READY_REFERENCES.map((ref) => (
              <div
                key={ref.id}
                className="flex items-center gap-2 rounded-md border border-[#1F3257] bg-[#0A1628] px-2.5 py-2"
              >
                <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-sm ${ref.tagBg} ${ref.tagColor}`}>
                  {ref.tag}
                </span>
                <p className="m-0 flex-1 text-xs text-[#C9D6E8]">{ref.text}</p>
                <SnipButton>
                  <X className="w-3 h-3" />
                </SnipButton>
              </div>
            ))}
            <div className="rounded-lg border border-dashed border-[#1F3257] bg-[#0A1628] p-2.5 mt-1 text-center cursor-pointer hover:border-[#4FA8F5]">
              <p className="m-0 text-[11px] text-[#8FA4C2] flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" />
                Drop snipped panels here
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-3">
        <CardHeader
          title="Generated talking points by slide"
          right={
            <SnipButton className="px-2 py-1">
              <RefreshCw className="w-3 h-3 inline mr-1" />
              Regenerate all
            </SnipButton>
          }
        />
        <div className="flex gap-2 items-center mb-3 -mt-1">
          <span className="text-[11px] text-[#6A88B0]">·</span>
          <span className="text-[11px] text-[#8FA4C2]">
            18 slides processed · tuned for Market update + Reassuring tone
          </span>
        </div>

        {SLIDE_PREVIEWS.map((slide) => (
          <div
            key={slide.num}
            className="grid grid-cols-1 md:grid-cols-[50px_1fr_1fr_1fr] gap-2.5 p-2.5 mb-1.5 rounded-md border border-[#1F3257] bg-[#0A1628]"
          >
            <div className="bg-[#14253F] rounded aspect-video max-md:max-h-12 flex items-center justify-center text-sm font-medium text-[#6A88B0]">
              {slide.num}
            </div>
            <div>
              <p className="m-0 mb-1 text-[10px] font-medium uppercase tracking-[0.06em] text-[#6A88B0]">
                What&apos;s on the slide
              </p>
              <p className="m-0 text-xs text-[#C9D6E8] leading-snug">{slide.onSlide}</p>
            </div>
            <div>
              <p className="m-0 mb-1 text-[10px] font-medium uppercase tracking-[0.06em] text-[#4FA8F5]">
                Suggested talking points
              </p>
              <p className="m-0 text-xs text-[#C9D6E8] leading-snug">{slide.talking}</p>
            </div>
            <div>
              <p className="m-0 mb-1 text-[10px] font-medium uppercase tracking-[0.06em] text-[#F2A623]">
                Likely questions
              </p>
              <p className="m-0 text-xs text-[#C9D6E8] leading-snug">{slide.questions}</p>
            </div>
          </div>
        ))}

        <p className="mt-2 mb-0 text-[11px] text-[#6A88B0] text-center">
          + 16 more slides · expand each in meeting mode
        </p>
      </Card>
    </div>
  );
}

function LiveMode({
  client,
  meetingTypeLabel,
  onExit,
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
}: {
  client: string;
  meetingTypeLabel: string;
  onExit: () => void;
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const slideTitle = 'Real Return sleeve YTD attribution';

  return (
    <div className="p-5">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-3.5 border-b border-[#1F3257]">
        <div>
          <p className="m-0 mb-1 text-xs text-[#6A88B0]">
            {client} · {meetingTypeLabel} · 10:32
          </p>
          <p className="m-0 text-[22px] font-medium text-white">
            Slide {currentSlide} of {totalSlides} — {slideTitle}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentSlide <= 1}
            className="rounded-md border border-[#1F3257] px-3.5 py-2 text-sm text-[#C9D6E8] hover:bg-[#14253F] disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={currentSlide >= totalSlides}
            className="rounded-md bg-[#4FA8F5] px-3.5 py-2 text-sm font-medium text-[#0A1628] hover:bg-[#3d96e8] disabled:opacity-40"
          >
            Next slide
            <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-md border border-[#1F3257] px-3 py-2 text-[#C9D6E8] hover:bg-[#14253F]"
            aria-label="Exit meeting"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        <div>
          <div className="rounded-[10px] border border-[#1F3257] bg-[#0F1E36] px-5 py-4 mb-3">
            <p className="m-0 mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[#4FA8F5] flex items-center gap-1">
              <Mic className="w-3 h-3" />
              Lead with this
            </p>
            <p className="m-0 text-[19px] leading-normal text-white font-normal">
              &ldquo;Commodities contributed 110bp this quarter — and it wasn&apos;t a tactical bet. We laid out the
              supply-chain thesis in our April commentary, well before the rally.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
            <div className="rounded-[10px] border border-[#1F3257] bg-[#0F1E36] px-4 py-3.5">
              <p className="m-0 mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#4FA8F5]">
                Backup point
              </p>
              <p className="m-0 text-[15px] leading-snug text-[#C9D6E8]">
                The Real Return sleeve was added specifically to address the duration concern they raised in March.
              </p>
            </div>
            <div className="rounded-[10px] border border-[#1F3257] bg-[#0F1E36] px-4 py-3.5">
              <p className="m-0 mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#4FA8F5]">
                Backup point
              </p>
              <p className="m-0 text-[15px] leading-snug text-[#C9D6E8]">
                Sleeve is currently 8.5% — there is room to scale up if the trustees want more of this exposure.
              </p>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#5A3F0F] bg-[#1A1305] px-4 py-3.5 mb-3">
            <p className="m-0 mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#F2A623] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              If they ask: tactical or structural?
            </p>
            <p className="m-0 text-[15px] leading-snug text-[#FFE8C2]">
              Supply-side pressure in industrial metals is structural — copper inventories at decade lows, capex in
              mining underinvested for years. Position holds through cycles.
            </p>
          </div>

          <div className="rounded-[10px] border border-dashed border-[#1F3257] bg-[#0A1628] px-4 py-3">
            <p className="m-0 mb-1 text-[11px] font-medium uppercase tracking-[0.06em] text-[#6A88B0]">
              Personal note from prior meeting
            </p>
            <p className="m-0 text-[13px] text-[#C9D6E8] leading-snug italic">
              Margaret (chair) lost a brother last year — be sensitive to risk language; she pushes back on anything
              that sounds aggressive.
            </p>
          </div>
        </div>

        <div className="rounded-[10px] border border-[#1F3257] bg-[#0D1A2F] p-3">
          <p className="m-0 mb-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#6A88B0]">
            Ready references
          </p>
          <div className="flex flex-col gap-2">
            {LIVE_REFERENCES.map((ref) => (
              <div
                key={ref.id}
                className={`rounded-md px-2.5 py-2 cursor-pointer ${
                  ref.active
                    ? 'bg-[#122948] border-[1.5px] border-[#4FA8F5]'
                    : 'bg-[#0A1628] border border-[#1F3257]'
                }`}
              >
                <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-sm ${ref.tagBg} ${ref.tagColor}`}>
                  {ref.tag}
                </span>
                <p className="mt-1.5 mb-0 text-xs font-medium text-white leading-snug">{ref.title}</p>
                <p className={`mt-0.5 mb-0 text-[10px] ${ref.active ? 'text-[#4FA8F5]' : 'text-[#8FA4C2]'}`}>
                  {ref.sub}
                </p>
              </div>
            ))}
            <SnipButton className="mt-1 py-1.5 px-2.5 text-center text-[11px] w-full">
              <Plus className="w-3 h-3 inline mr-1" />
              Search
            </SnipButton>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center mt-3.5 pt-3.5 border-t border-[#1F3257]">
        <div className="flex gap-0.5 flex-1 min-w-[200px]">
          {SLIDE_PROGRESS.map((state, i) => (
            <span
              key={i}
              className={`w-3.5 h-1 rounded-sm ${
                state === 'done' ? 'bg-[#2DD881]' : state === 'current' ? 'bg-[#4FA8F5]' : 'bg-[#1F3257]'
              }`}
            />
          ))}
        </div>
        <SnipButton className="px-3 py-1.5 text-xs">
          <Pencil className="w-3.5 h-3.5 inline mr-1" />
          Quick note
        </SnipButton>
        <SnipButton className="px-3 py-1.5 text-xs">
          <Flag className="w-3.5 h-3.5 inline mr-1" />
          Flag follow-up
        </SnipButton>
        <span className="text-xs text-[#6A88B0]">{totalSlides - currentSlide} slides remaining</span>
      </div>
    </div>
  );
}

export default function MeetingPage() {
  const [mode, setMode] = useState<MeetingMode>('setup');
  const [client, setClient] = useState(CLIENTS[0]);
  const [meetingType, setMeetingType] = useState<MeetingTypeId>('market');
  const [tone, setTone] = useState<ToneId>('reassuring');
  const [objective, setObjective] = useState(
    'Walk trustees through Q1 performance and position the Real Return sleeve as a partial replacement for their long-duration gilts.'
  );
  const [currentSlide, setCurrentSlide] = useState(7);
  const totalSlides = 18;

  const meetingTypeLabel = MEETING_TYPES.find((t) => t.id === meetingType)?.label ?? 'Meeting';

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#0B1220] p-6 md:p-8">
      <h2 className="sr-only">
        Meeting preparation page in two states: setup mode for configuring the meeting and uploading materials, and
        live meeting mode with large type, slide talking points, and a pinboard of ready references.
      </h2>

      <div className="max-w-[1400px] mx-auto rounded-xl bg-[#0A1628] p-3.5 text-[#E5EDF7] text-[13px] font-sans">
        {mode === 'setup' ? (
          <SetupMode
            client={client}
            setClient={setClient}
            meetingType={meetingType}
            setMeetingType={setMeetingType}
            tone={tone}
            setTone={setTone}
            objective={objective}
            setObjective={setObjective}
            onStart={() => setMode('live')}
          />
        ) : (
          <LiveMode
            client={client}
            meetingTypeLabel={meetingTypeLabel}
            onExit={() => setMode('setup')}
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            onPrev={() => setCurrentSlide((s) => Math.max(1, s - 1))}
            onNext={() => setCurrentSlide((s) => Math.min(totalSlides, s + 1))}
          />
        )}
      </div>
    </div>
  );
}

