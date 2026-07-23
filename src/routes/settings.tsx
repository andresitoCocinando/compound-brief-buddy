import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Compound" },
      { name: "description", content: "Configure research sources and outreach preferences." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-1">
        <SettingsIcon className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Configure research sources and defaults.</p>

      <div className="space-y-4">
        {[
          { title: "AI research provider", desc: "Choose the model powering brief generation.", value: "Mock (demo mode)" },
          { title: "Data sources", desc: "Firecrawl, Perplexity, LinkedIn, Crunchbase.", value: "Not connected" },
          { title: "Outreach voice", desc: "Tone used in generated openers.", value: "Founder-to-founder, direct" },
          { title: "Team workspace", desc: "Shared briefs across your GTM team.", value: "Compound Law · GTM" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">{s.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
            </div>
            <div className="text-xs text-muted-foreground">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
