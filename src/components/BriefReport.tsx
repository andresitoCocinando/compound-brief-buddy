import type { Brief, Confidence } from "@/data/sampleBriefs";
import { Button } from "@/components/ui/button";
import { Copy, Download, Share2, TrendingUp, Building2, Target, Users, MessageSquare, Activity, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

function ConfidencePill({ level }: { level: Confidence }) {
  const map = {
    high: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${map[level]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  confidence,
  children,
  id,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  confidence?: Confidence;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-muted grid place-items-center">
            <Icon className="h-4 w-4 text-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {confidence && <ConfidencePill level={confidence} />}
      </div>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground text-right font-medium">{value}</span>
    </div>
  );
}

export function BriefReport({ brief }: { brief: Brief }) {
  const copy = () => {
    navigator.clipboard.writeText(`${brief.company} — Compound Prospect Brief\n\n${brief.snapshot.description}`);
    toast.success("Brief copied to clipboard");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 font-medium">Brief ready</span>
            <span>·</span>
            <span>Generated {brief.generatedAt}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{brief.company}</h1>
          <a href={`https://${brief.website}`} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
            {brief.website}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1.5" />Copy</Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("PDF export coming soon")}><Download className="h-3.5 w-3.5 mr-1.5" />PDF</Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Share link coming soon")}><Share2 className="h-3.5 w-3.5 mr-1.5" />Share</Button>
        </div>
      </div>

      {/* Score banner */}
      <div className="mb-6 rounded-xl border border-border bg-gradient-to-br from-muted/40 to-transparent p-5 flex items-center gap-6">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
            <circle
              cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3"
              strokeDasharray={`${(brief.buyingSignals.score / 100) * 100.5} 100.5`}
              strokeLinecap="round"
              className="text-foreground"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-sm font-semibold">{brief.buyingSignals.score}</div>
        </div>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Buying signal score</div>
          <div className="text-sm text-foreground mt-1">{brief.buyingSignals.whyNow}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* Company Snapshot */}
        <SectionCard icon={Building2} title="Company Snapshot" confidence={brief.confidence.snapshot} id="snapshot">
          <p className="text-sm text-foreground leading-relaxed mb-4">{brief.snapshot.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <Row label="Industry" value={brief.snapshot.industry} />
              <Row label="HQ" value={brief.snapshot.hq} />
              <Row label="Employees" value={brief.snapshot.employees} />
            </div>
            <div>
              <Row label="Funding" value={brief.snapshot.funding} />
              <Row label="Stage" value={brief.snapshot.stage} />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Recent news</div>
            <ul className="space-y-2">
              {brief.snapshot.news.map((n, i) => (
                <li key={i} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-foreground">{n.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{n.source} · {n.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        {/* Legal Pain Signals */}
        <SectionCard icon={Activity} title="Legal Pain Signals" confidence={brief.confidence.signals} id="signals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {brief.signals.map((s, i) => (
              <div key={i} className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                  <ConfidencePill level={s.confidence} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.why}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Decision Makers */}
        <SectionCard icon={Users} title="Decision Makers" confidence={brief.confidence.decisionMakers} id="dm">
          <div className="space-y-3">
            {brief.decisionMakers.map((d, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="h-9 w-9 shrink-0 rounded-full bg-muted grid place-items-center text-xs font-medium text-foreground">
                  {d.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-medium text-foreground">{d.name}</span>
                    <span className="text-xs text-muted-foreground">{d.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.why}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Compound Opportunity */}
        <SectionCard icon={Target} title="Compound Opportunity" confidence={brief.confidence.opportunity} id="opportunity">
          <p className="text-sm text-foreground leading-relaxed mb-4">{brief.opportunity.whyCompound}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Priority problems</div>
              <ul className="space-y-1.5">
                {brief.opportunity.priorities.map((p, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2"><span className="text-muted-foreground">·</span>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Expansion later</div>
              <ul className="space-y-1.5">
                {brief.opportunity.expansion.map((p, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2"><span className="text-muted-foreground">·</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-muted/50 border border-border p-3">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Best entry point</div>
            <p className="text-sm text-foreground">{brief.opportunity.entryPoint}</p>
          </div>
        </SectionCard>

        {/* Outreach */}
        <SectionCard icon={MessageSquare} title="Outreach Angle" confidence={brief.confidence.outreach} id="outreach">
          <div className="rounded-lg border border-border bg-muted/30 p-4 mb-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">Personalized opener</div>
            <p className="text-sm text-foreground leading-relaxed italic">"{brief.outreach.opener}"</p>
          </div>
          <div className="mb-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Angle</div>
            <p className="text-sm text-foreground">{brief.outreach.angle}</p>
          </div>
          <div className="mb-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Talking points</div>
            <ul className="space-y-1.5">
              {brief.outreach.talkingPoints.map((t, i) => (
                <li key={i} className="text-sm text-foreground flex gap-2">
                  <span className="text-muted-foreground w-4 shrink-0">{i + 1}.</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Likely objections</div>
            <div className="space-y-2">
              {brief.outreach.objections.map((o, i) => (
                <div key={i} className="rounded-md border border-border p-3">
                  <div className="text-sm text-foreground font-medium">"{o.objection}"</div>
                  <div className="text-xs text-muted-foreground mt-1">→ {o.response}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-foreground text-background p-3">
            <div className="text-[10px] font-medium uppercase tracking-wider opacity-70 mb-0.5">Suggested next step</div>
            <p className="text-sm">{brief.outreach.nextStep}</p>
          </div>
        </SectionCard>

        {/* Buying signals */}
        <SectionCard icon={TrendingUp} title="Buying Signals" subtitle="Score 0–100" confidence={brief.confidence.buyingSignals} id="signals-score">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">What increased the score</div>
              <ul className="space-y-1.5">
                {brief.buyingSignals.increased.map((p, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2"><span className="text-emerald-600">↑</span>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">What's missing</div>
              <ul className="space-y-1.5">
                {brief.buyingSignals.missing.map((p, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2"><span className="text-muted-foreground">·</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Confidence summary */}
        <SectionCard icon={ShieldCheck} title="AI Confidence" subtitle="Per-section reliability">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(brief.confidence).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                <ConfidencePill level={v as Confidence} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
