import type { ClientContext } from '../../campaign/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Button } from '../components/ui/button';
import { Users } from 'lucide-react';

interface ClientContextSectionProps {
  context: ClientContext;
  variant?: 'inline' | 'drawer';
}

export function ClientContextSection({ context, variant = 'inline' }: ClientContextSectionProps) {
  const body = <ContextBody context={context} />;

  if (variant === 'drawer') {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="border-[#374151] text-[#D1D5DB]">
            <Users className="w-4 h-4 mr-2" />
            Client context
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#111827] border-[#1F2937] w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-white uppercase tracking-wider text-sm">
              Client context — {context.clientName}
            </SheetTitle>
          </SheetHeader>
          <Wrapper className="mt-6">{body}</Wrapper>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <section className="mb-8 rounded-xl border border-[#1F2937] bg-[#111827] p-6">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-6">
        Client context — what we know about {context.clientName.split(' ')[0]}
      </h3>
      {body}
    </section>
  );
}

function Wrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={className}>{children}</section>;
}

function ContextBody({ context }: { context: ClientContext }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">Active concerns</p>
        <section className="space-y-2">
          {context.concerns.map((c) => (
            <ConcernCard key={c.id} concern={c} />
          ))}
        </section>
      </section>

      <section>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
          Holdings &amp; competitors
        </p>
        <section className="space-y-2 mb-4">
          {context.holdings.map((h) => (
            <section key={h.label} className="flex justify-between text-sm">
              <span className="text-[#9CA3AF]">{h.label}</span>
              <span className="text-white font-medium">{h.percent}%</span>
            </section>
          ))}
        </section>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-2">Considering</p>
        {context.competitors.map((comp) => (
          <section key={comp.name} className="p-3 rounded-lg border border-[#374151] bg-[#0B1220] text-sm mb-2">
            <p className="text-white font-medium">{comp.name}</p>
            <p className="text-[#9CA3AF] text-xs mt-1">{comp.note}</p>
          </section>
        ))}
      </section>

      <section>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
          Personal &amp; relationship notes
        </p>
        <section className="space-y-2">
          {context.relationshipNotes.map((n) => (
            <section key={n.id} className="p-3 rounded-lg border border-[#1F2937] bg-[#0B1220]">
              <p className="text-white text-sm font-medium">{n.name}</p>
              <p className="text-[10px] text-[#A855F7] uppercase tracking-wide">{n.role}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">{n.note}</p>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}

function ConcernCard({
  concern: c,
}: {
  concern: ClientContext['concerns'][number];
}) {
  const cls =
    c.status === 'open'
      ? 'border-[#F59E0B]/30 bg-[#F59E0B]/5 text-[#FCD34D]'
      : 'border-[#374151] bg-[#0B1220] text-[#6B7280] line-through';
  return (
    <section className={`p-3 rounded-lg border text-sm ${cls}`}>
      <p className="font-medium">{c.text}</p>
      <p className="text-[10px] mt-1 text-[#6B7280]">
        {c.raisedBy} · {c.raisedAt} · {c.status}
      </p>
    </section>
  );
}
