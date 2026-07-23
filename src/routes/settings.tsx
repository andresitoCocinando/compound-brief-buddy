import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { checkResearchStatus } from "@/lib/webResearch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Compound" },
      { name: "description", content: "Configure research sources and outreach preferences." },
    ],
  }),
  loader: () => checkResearchStatus(),
  component: Settings,
});

function Settings() {
  const { connected } = Route.useLoaderData();

  const rows = [
    {
      title: "AI research provider",
      desc: "Gemini 2.5 Flash — Google Search grounding + synthesis.",
      value: connected ? "Connected" : "Not connected (set GEMINI_API_KEY)",
      ok: connected,
    },
    {
      title: "Data sources",
      desc: "Live web search via Gemini Google Search grounding.",
      value: connected ? "Live" : "Not connected",
      ok: connected,
    },
    {
      title: "Outreach voice",
      desc: "Tone used in generated openers.",
      value: "Founder-to-founder, direct",
      ok: true,
    },
    {
      title: "Team workspace",
      desc: "Shared briefs across your GTM team.",
      value: "Compound Law · GTM",
      ok: true,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-1">
        <SettingsIcon className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Configure research sources and defaults.</p>

      <div className="space-y-4">
        {rows.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-medium text-foreground">{s.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
            </div>
            <div className={`text-xs ${s.ok ? "text-emerald-600" : "text-muted-foreground"}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
