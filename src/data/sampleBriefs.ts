export type Confidence = "high" | "medium" | "low";

export interface Signal {
  label: string;
  confidence: Confidence;
  why: string;
}

export interface DecisionMaker {
  name: string;
  role: string;
  why: string;
}

export interface Brief {
  slug: string;
  company: string;
  website: string;
  generatedAt: string;
  snapshot: {
    description: string;
    industry: string;
    hq: string;
    employees: string;
    funding: string;
    stage: string;
    news: { title: string; source: string; date: string }[];
  };
  signals: Signal[];
  decisionMakers: DecisionMaker[];
  opportunity: {
    whyCompound: string;
    priorities: string[];
    entryPoint: string;
    expansion: string[];
  };
  outreach: {
    opener: string;
    angle: string;
    talkingPoints: string[];
    objections: { objection: string; response: string }[];
    nextStep: string;
  };
  buyingSignals: {
    score: number;
    whyNow: string;
    increased: string[];
    missing: string[];
  };
  confidence: {
    snapshot: Confidence;
    signals: Confidence;
    decisionMakers: Confidence;
    opportunity: Confidence;
    outreach: Confidence;
    buyingSignals: Confidence;
  };
}

export const sampleBriefs: Brief[] = [
  {
    slug: "peec-ai",
    company: "Peec AI",
    website: "peec.ai",
    generatedAt: "2 minutes ago",
    snapshot: {
      description:
        "Peec AI is a Berlin-based analytics platform helping brands measure and optimize their visibility inside AI answer engines like ChatGPT, Perplexity and Google AI Overviews.",
      industry: "AI SaaS · Marketing Analytics",
      hq: "Berlin, Germany",
      employees: "20–40",
      funding: "€7M Seed (2025, led by Creandum)",
      stage: "Seed → Series A",
      news: [
        { title: "Peec AI raises €7M Seed to become the 'GA of AI search'", source: "Sifted", date: "Mar 2025" },
        { title: "Peec adds ChatGPT + Perplexity brand tracking", source: "TechCrunch", date: "Jan 2026" },
        { title: "First 50 enterprise logos including L'Oréal and About You", source: "LinkedIn", date: "May 2026" },
      ],
    },
    signals: [
      { label: "Hiring aggressively (GTM + Eng)", confidence: "high", why: "15+ open roles across Berlin and remote-EU — team is doubling within 6 months." },
      { label: "Enterprise customer motion", confidence: "high", why: "Moving from SMB self-serve to enterprise contracts — MSAs, DPAs and procurement become bottlenecks." },
      { label: "AI Act exposure", confidence: "high", why: "Core product processes third-party LLM outputs and brand data — falls into scope of the EU AI Act's transparency obligations." },
      { label: "GDPR exposure", confidence: "high", why: "Scrapes public web + AI outputs referencing individuals — Art. 6 legitimate interest assessments required." },
      { label: "International expansion (US)", confidence: "medium", why: "Recent US customer wins signal a NYC/SF entity discussion within 6–12 months." },
      { label: "Fundraising (Series A)", confidence: "medium", why: "Typical 12–18 month gap after Creandum-led Seed. Legal DD readiness matters." },
    ],
    decisionMakers: [
      { name: "Marius Meiners", role: "Co-Founder & CEO", why: "Owns fundraising, hiring, and enterprise deals — feels the pain of every contract review personally." },
      { name: "David Zimmer", role: "Co-Founder & CTO", why: "Owns AI Act / GDPR technical posture. Needs a legal partner who understands LLM data flows." },
      { name: "Head of Sales (hiring)", role: "GTM", why: "Once hired, will own the enterprise contract pipeline and MSA negotiations." },
    ],
    opportunity: {
      whyCompound: "Peec sits exactly at the intersection of AI, brand data and enterprise procurement — the four things Compound is built to handle for post-Seed startups.",
      priorities: [
        "AI Act readiness assessment (transparency, risk classification)",
        "Enterprise MSA / DPA template covering LLM output processing",
        "Employment contracts for rapid EU + US hiring",
      ],
      entryPoint: "Offer a free 30-min 'AI Act + enterprise contract' readiness review with the CEO — practical, not a pitch.",
      expansion: [
        "US entity setup ahead of Series A",
        "Cap table + ESOP cleanup pre-Series A",
        "IP assignment audit across contractors",
      ],
    },
    outreach: {
      opener:
        "Marius — congrats on the Creandum round and the L'Oréal win. Two things every Peec-style company hits between Seed and Series A: enterprise procurement redlines that eat 3 weeks per deal, and AI Act scoping questions from EU buyers. We fix both.",
      angle: "Practical AI-Act + enterprise-contract partner for a fast-scaling German AI SaaS.",
      talkingPoints: [
        "We've closed MSAs with Deutsche Telekom, Zalando and L'Oréal in <10 days for peer AI startups.",
        "Fixed-fee AI Act readiness package — no billable hour surprises.",
        "One legal team across DE + US so you don't stitch three firms together at Series A.",
        "Founder-friendly: async Slack channel, not email chains.",
        "We speak both LLM and legalese — your CTO won't need to translate.",
      ],
      objections: [
        { objection: "We already use a Kanzlei for contracts.", response: "Most Kanzleien bill hourly and don't do AI Act — we complement, not replace." },
        { objection: "Too early, we'll sort this at Series A.", response: "Series A DD is where messy contracts get discovered — 6 months of cleanup is 6 months of missed pipeline." },
      ],
      nextStep: "20-min intro with Marco (CEO of Compound) next week — bring one active enterprise redline, leave with a marked-up version.",
    },
    buyingSignals: {
      score: 86,
      whyNow: "Fresh capital, aggressive hiring, first enterprise logos and EU AI Act enforcement window all converging in the next 2 quarters.",
      increased: [
        "€7M Seed closed 90 days ago",
        "15+ open GTM/Eng roles",
        "Public enterprise logos (L'Oréal, About You)",
        "AI Act general-purpose obligations live Aug 2026",
      ],
      missing: ["No public General Counsel or Head of Legal hire yet", "No confirmed US entity"],
    },
    confidence: {
      snapshot: "high",
      signals: "high",
      decisionMakers: "high",
      opportunity: "high",
      outreach: "medium",
      buyingSignals: "high",
    },
  },
  {
    slug: "dash0",
    company: "Dash0",
    website: "dash0.com",
    generatedAt: "just now",
    snapshot: {
      description:
        "Dash0 is a next-gen observability platform built on OpenTelemetry, founded by ex-Instana leadership. Focused on predictable pricing and developer-first telemetry.",
      industry: "DevTools · Observability",
      hq: "Munich, Germany",
      employees: "30–60",
      funding: "$11M Seed (Accel, 2024)",
      stage: "Seed → Series A",
      news: [
        { title: "Dash0 emerges from stealth with $11M from Accel", source: "TechCrunch", date: "Oct 2024" },
        { title: "Dash0 launches OpenTelemetry-native APM", source: "The New Stack", date: "Feb 2026" },
      ],
    },
    signals: [
      { label: "Enterprise customers", confidence: "high", why: "Observability sales cycles are enterprise-first — procurement, SOC 2, DPAs from day one." },
      { label: "US expansion", confidence: "high", why: "Accel-backed devtools always open a US entity within 12 months of Seed." },
      { label: "Hiring aggressively", confidence: "high", why: "20+ open roles including senior US-based sales." },
      { label: "Vendor contract complexity", confidence: "high", why: "Deep AWS/GCP integrations + customer data processing = layered DPA obligations." },
      { label: "IP issues", confidence: "medium", why: "Ex-Instana founders — non-compete and IP assignment cleanliness matters for Series A DD." },
    ],
    decisionMakers: [
      { name: "Mirko Novakovic", role: "Co-Founder & CEO", why: "Serial founder (Instana → IBM). Values legal partners who move at devtool speed." },
      { name: "Bastian Krol", role: "Co-Founder & CTO", why: "Owns OSS strategy and OTel contributions — needs OSS licensing counsel." },
      { name: "Head of Revenue", role: "GTM", why: "Owns enterprise MSA negotiation." },
    ],
    opportunity: {
      whyCompound: "Post-Instana team knows exactly what enterprise DD looks like — they'll value a legal partner who is proactive, not reactive.",
      priorities: ["US Inc. setup and cross-border IP assignment", "Enterprise MSA + DPA templates", "OSS contribution / license policy"],
      entryPoint: "'How Instana-era mistakes shape your legal setup at Dash0' — a peer-level conversation, not a pitch.",
      expansion: ["Series A DD readiness", "Employment law for US hires", "Trademark protection globally"],
    },
    outreach: {
      opener:
        "Mirko — Dash0's positioning is sharp and the Accel round sets up a fast Series A. We've supported 4 ex-unicorn founder teams through the exact US-entity + IP-assignment pattern you'll hit in the next 6 months.",
      angle: "Repeat-founder legal partner for the US expansion window.",
      talkingPoints: [
        "Delaware C-Corp + IP assignment cleanup in <3 weeks",
        "OSS license review for OTel contributions",
        "Fixed-fee enterprise MSA package",
        "One team across DE + US",
        "Series A DD dry-run before you take the term sheet",
      ],
      objections: [
        { objection: "We have investors' preferred counsel.", response: "Investor counsel represents investors. We represent you." },
      ],
      nextStep: "30-min call with Marco (CEO Compound) — Instana-alum discount on the readiness package.",
    },
    buyingSignals: {
      score: 79,
      whyNow: "GA launch + US sales hires + Series A window = legal debt becomes visible fast.",
      increased: ["Public GA launch", "US sales hires listed", "Accel timeline pressure"],
      missing: ["No public GC hire", "US entity not yet visible in filings"],
    },
    confidence: { snapshot: "high", signals: "high", decisionMakers: "medium", opportunity: "high", outreach: "medium", buyingSignals: "high" },
  },
  {
    slug: "flink",
    company: "Flink",
    website: "goflink.com",
    generatedAt: "1 minute ago",
    snapshot: {
      description:
        "Flink is a Berlin-headquartered quick-commerce grocery delivery company operating across Germany, Netherlands, France and Austria.",
      industry: "Q-Commerce · Consumer",
      hq: "Berlin, Germany",
      employees: "2,000+",
      funding: "$1B+ raised (Prosus, Mubadala, DoorDash)",
      stage: "Late-stage growth",
      news: [
        { title: "Flink narrows losses, targets profitability in DACH", source: "Handelsblatt", date: "Apr 2026" },
        { title: "Flink signs new distribution deal with REWE", source: "Lebensmittel Zeitung", date: "Jun 2026" },
      ],
    },
    signals: [
      { label: "Employment law", confidence: "high", why: "Rider workforce, works council pressure, ongoing labor classification debate across EU." },
      { label: "Vendor contract complexity", confidence: "high", why: "Hundreds of supplier + logistics contracts across 4 countries." },
      { label: "Compliance scaling", confidence: "high", why: "Food safety, packaging, EU Digital Services Act, multi-jurisdiction VAT." },
      { label: "GDPR exposure", confidence: "medium", why: "Large B2C dataset, delivery telematics, rider tracking." },
      { label: "Fundraising / restructuring", confidence: "medium", why: "Path-to-profitability narrative typically precedes bridge or strategic round." },
    ],
    decisionMakers: [
      { name: "Oliver Merkel", role: "Co-Founder & CEO", why: "Owns strategic legal decisions — vendor consolidation, workforce model." },
      { name: "General Counsel", role: "Legal", why: "Existing in-house GC — Compound would augment on high-volume commercial + labor work." },
      { name: "VP People", role: "HR", why: "Owns rider policy, works council relationships." },
    ],
    opportunity: {
      whyCompound: "Flink already has a GC — the opportunity is high-volume overflow: commercial contracts, employment templates, DSA compliance.",
      priorities: ["Supplier MSA templating and playbook", "Rider employment framework across DACH", "DSA + consumer law audit"],
      entryPoint: "Offer a 2-week 'contract velocity audit' for the commercial team — measurable time saved per contract.",
      expansion: ["Litigation support (labor)", "M&A support if strategic exit"],
    },
    outreach: {
      opener:
        "Oliver — with the profitability push and the REWE deal live, the commercial contract volume through your team is about to spike. We plug in as overflow to your GC's team, priced per contract, not per hour.",
      angle: "Overflow commercial + labor legal capacity for a scaling late-stage operator.",
      talkingPoints: [
        "Per-contract fixed pricing",
        "24h turnaround SLA on NDAs and standard MSAs",
        "DE + NL + FR + AT coverage",
        "Direct Slack line to your GC's team",
        "No conflicts with existing outside counsel",
      ],
      objections: [
        { objection: "We have Kanzleien on retainer.", response: "We work alongside, not instead. Overflow at fixed price." },
      ],
      nextStep: "Intro your GC to Marco — 15 min, no slides.",
    },
    buyingSignals: {
      score: 62,
      whyNow: "Contract volume spike + profitability focus makes fixed-fee legal attractive.",
      increased: ["New distribution partnerships", "Public profitability narrative"],
      missing: ["No obvious legal budget expansion signal", "Existing GC may be territorial"],
    },
    confidence: { snapshot: "high", signals: "high", decisionMakers: "medium", opportunity: "medium", outreach: "medium", buyingSignals: "medium" },
  },
  {
    slug: "openai",
    company: "OpenAI",
    website: "openai.com",
    generatedAt: "3 minutes ago",
    snapshot: {
      description:
        "OpenAI is the leading foundation-model lab and developer of ChatGPT, GPT-5 and the OpenAI API platform.",
      industry: "AI · Foundation Models",
      hq: "San Francisco, USA (EU entity in Dublin)",
      employees: "3,000+",
      funding: "$60B+ raised",
      stage: "Late-stage / pre-IPO",
      news: [
        { title: "OpenAI expands Dublin office to serve EU enterprise", source: "Reuters", date: "May 2026" },
        { title: "New EU AI Act GPAI obligations take effect Aug 2026", source: "Politico", date: "Jul 2026" },
      ],
    },
    signals: [
      { label: "AI Act exposure", confidence: "high", why: "Primary GPAI provider under the EU AI Act — highest-scrutiny category." },
      { label: "GDPR exposure", confidence: "high", why: "Ongoing DPA activity across Italy, France, Germany." },
      { label: "Enterprise customers (DACH)", confidence: "high", why: "Growing enterprise footprint in DE — local counsel value is real." },
      { label: "IP issues", confidence: "high", why: "Training-data litigation continues; European IP posture matters." },
    ],
    decisionMakers: [
      { name: "EU General Counsel", role: "Legal", why: "Owns EU regulatory strategy — Compound acts as local DACH counsel." },
      { name: "Head of Enterprise EMEA", role: "GTM", why: "Owns DACH enterprise contracts." },
    ],
    opportunity: {
      whyCompound: "Realistically, Compound is a local DACH partner, not primary counsel — the play is enterprise contract support in Germany.",
      priorities: ["DACH enterprise MSA localization", "German-language DPA reviews", "Works council on German hiring"],
      entryPoint: "Offer German-market MSA localization pilot for their top 5 DE customers.",
      expansion: ["German-language regulator correspondence support"],
    },
    outreach: {
      opener:
        "Given OpenAI's DACH enterprise push and the Aug '26 GPAI obligations, a local DE contract + regulator partner is table stakes. We run that layer for European AI-native peers already.",
      angle: "Local DACH contract + regulator partner.",
      talkingPoints: [
        "Native German-language contracting",
        "Direct BfDI + LDA relationships",
        "AI Act GPAI documentation experience",
        "Works council navigation",
        "Complements, does not replace, primary counsel",
      ],
      objections: [
        { objection: "We use a top-10 global firm.", response: "For DACH speed and language, a specialist runs circles around a global generalist." },
      ],
      nextStep: "Short intro to the EU GC's team.",
    },
    buyingSignals: {
      score: 41,
      whyNow: "Regulatory pressure is real but the buying committee is large and slow.",
      increased: ["AI Act GPAI deadline", "Dublin office expansion"],
      missing: ["No specific inbound signal", "Existing counsel entrenched"],
    },
    confidence: { snapshot: "high", signals: "high", decisionMakers: "low", opportunity: "medium", outreach: "low", buyingSignals: "medium" },
  },
];

export function getBriefBySlug(slug: string): Brief | undefined {
  return sampleBriefs.find((b) => b.slug === slug);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\.(com|ai|io|de|co|org|net).*$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
