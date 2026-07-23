import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleBriefs, slugify } from "@/data/sampleBriefs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Compound Prospect Research Agent" },
      { name: "description", content: "Instant AI-powered prospect briefs for Compound Law's GTM team." },
      { property: "og:title", content: "Compound Prospect Research Agent" },
      { property: "og:description", content: "Instant AI-powered prospect briefs for Compound Law's GTM team." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const go = (q: string) => {
    const slug = slugify(q);
    if (!slug) return;
    navigate({ to: "/brief/$slug", params: { slug }, search: { q } as never });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground mb-6">
          <Sparkles className="h-3 w-3" /> Compound Law · Internal GTM tool
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
          Research any prospect.
          <br />
          <span className="text-muted-foreground">Get a one-page sales brief in seconds.</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-xl">
          Enter a company name or website. Our agent pulls signals, decision makers, legal pain points and a
          Compound-specific outreach angle — ready before your next call.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            go(query);
          }}
          className="mt-8 group"
        >
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-foreground/30 focus-within:ring-4 focus-within:ring-foreground/5 transition-all">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter company name or website — e.g. peec.ai"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <Button type="submit" size="sm" disabled={!query.trim()} className="gap-1.5">
              Generate Brief <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </form>

        <div className="mt-10">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Try a demo prospect
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sampleBriefs.map((b) => (
              <button
                key={b.slug}
                onClick={() => go(b.company)}
                className="text-left group rounded-lg border border-border bg-card p-4 hover:border-foreground/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{b.company}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                    score {b.buyingSignals.score}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {b.snapshot.industry} · {b.snapshot.hq}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
