export type BuiltEntry = {
  date: string;
  title: string;
  result: string;
  tools: string;
  body: string;
  footnote?: string;
  link?: { href: string; label: string };
};

export const builtEntries: BuiltEntry[] = [
  {
    date: "2025–26",
    title: "The Commons",
    result:
      "3rd place, Eagles Sustainability Case Competition — now used by 300+ student organizations",
    tools: "react · typescript · supabase · postgresql · tailwindcss",
    body: "A resource-sharing platform built for Boston College's Office of Student Involvement. Multi-tenant by design — each organization's eboard and the central admin office see different slices of the same data — with Google OAuth restricted to the university domain and a schema built to support cross-org item requests and QR check-in.",
    footnote:
      "The hard part was never the CRUD; it was getting the access model right before any of the features mattered.",
    link: { href: "https://github.com/chen-domi/osi-resource-hub", label: "github →" },
  },
  {
    date: "Oct 2025",
    title: "PlaybackPilot",
    result: "Chrome extension — YouTube-style controls across 20+ sites that don't have them",
    tools: "typescript · vite · chrome apis · tailwindcss",
    body: "Built after losing focus mid-lecture, hunting through a clunky player just to slow playback down. PlaybackPilot watches for video players that load asynchronously — Panopto among them — and injects consistent controls regardless of how the underlying page is built, with settings persisted through the Chrome Storage API.",
    footnote: "A small problem, solved properly, is still proof of engineering judgment.",
    link: { href: "https://github.com/chen-domi/PlaybackPilot", label: "github →" },
  },
];

export const currentEntry = {
  title: "Black-Scholes Pricing Engine",
  tools: "python · numpy · scipy · matplotlib",
  body: "A European option pricer rebuilt from the model up — closed-form pricing, the full Greek family, and an implied volatility solver, with a surface visualizer so errors show up visually before they show up numerically. The aim is to understand the pricing surface well enough that production libraries stop reading as black boxes.",
};

export const skills: { label: string; value: string }[] = [
  {
    label: "Languages",
    value: "C++ · Python · SQL · TypeScript · JavaScript · HTML/CSS",
  },
  {
    label: "Libraries",
    value:
      "NumPy · Pandas · Matplotlib · yfinance · Node.js · Next.js · React.js · PostgreSQL · MySQL",
  },
  { label: "Tools", value: "Git · GitHub · Docker" },
];

export type ReadingItem = {
  kind: "Paper" | "Book" | "Article";
  name: string;
  by: string;
};

export const reading: ReadingItem[] = [
  {
    kind: "Paper",
    name: "The Pricing of Options and Corporate Liabilities",
    by: "Black & Scholes, 1973 — the foundation for the work above.",
  },
  {
    kind: "Book",
    name: "Options, Futures, and Other Derivatives",
    by: "John Hull — the core derivatives pricing curriculum.",
  },
  {
    kind: "Book",
    name: "What I Learned Losing a Million Dollars",
    by: "Jim Paul & Brendan Moynihan — risk and psychology over strategy.",
  },
  {
    kind: "Article",
    name: "Market Microstructure and the Limits of Liquidity",
    by: "On how execution quality shapes realized strategy returns.",
  },
  {
    kind: "Paper",
    name: "A Theory of the Term Structure of Interest Rates",
    by: "Cox, Ingersoll & Ross, 1985 — background for rate-sensitive pricing.",
  },
];
