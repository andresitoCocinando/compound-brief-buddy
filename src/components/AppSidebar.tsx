import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Clock, Bookmark, Settings, Sparkles } from "lucide-react";
import { sampleBriefs } from "@/data/sampleBriefs";

const nav = [
  { to: "/", label: "Prospect Search", icon: Search },
  { to: "/recent", label: "Recent Briefs", icon: Clock },
  { to: "/saved", label: "Saved Companies", icon: Bookmark },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-r border-border bg-sidebar h-screen sticky top-0">
      <div className="px-5 pt-6 pb-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-sidebar-foreground">Compound</div>
            <div className="text-[11px] text-muted-foreground">Prospect Research</div>
          </div>
        </Link>
      </div>

      <nav className="px-3 flex flex-col gap-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 px-5">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
          Recent
        </div>
        <div className="flex flex-col gap-0.5">
          {sampleBriefs.slice(0, 4).map((b) => {
            const to = `/brief/${b.slug}`;
            const active = pathname === to;
            return (
              <Link
                key={b.slug}
                to="/brief/$slug"
                params={{ slug: b.slug }}
                className={`truncate rounded-md px-2 py-1.5 text-sm ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                }`}
              >
                {b.company}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-border">
        <div className="rounded-lg bg-muted/60 p-3">
          <div className="text-xs font-medium text-foreground">Compound Law GTM</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Internal MVP · v0.1</div>
        </div>
      </div>
    </aside>
  );
}
