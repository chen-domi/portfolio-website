export type BuiltEntry = {
  date: string;
  title: string;
  result: string;
  tools: string;
  body: string;
  footnote?: string;
  links?: { href: string; label: string }[];
};

export const builtEntries: BuiltEntry[] = [
  {
    date: "2025–26",
    title: "The Commons",
    result:
      "3rd place, Eagles Sustainability Case Competition",
    tools: "react · typescript · supabase · postgresql · tailwindcss",
    body: "A smart inventory management and sharing system designed for Boston College's Office of Student Involvement — letting student organizations track, request, and share resources across campus. Multi-tenant by design — each organization's eboard and the central admin office see different slices of the same data — with Google OAuth restricted to the university domain and a schema built to support cross-org item requests and QR check-in.",
    footnote:
      "The hard part was never the CRUD; it was getting the access model right before any of the features mattered.",
    links: [
      { href: "https://github.com/chen-domi/osi-resource-hub", label: "github →" },
      { href: "https://youtu.be/T2Q91d204RY?si=KRCcfMPGoQdmhmhZ", label: "live presentation →" },
    ],
  },
  {
    date: "Oct 2025",
    title: "PlaybackPilot",
    result: "Chrome extension — YouTube-style controls across 20+ sites that don't have them",
    tools: "typescript · vite · chrome apis · tailwindcss",
    body: "Built after losing focus mid-lecture, hunting through a clunky player just to slow playback down. PlaybackPilot watches for video players that load asynchronously — Panopto among them — and injects consistent controls regardless of how the underlying page is built, with settings persisted through the Chrome Storage API.",
    footnote: "A small problem, solved properly, is still proof of engineering judgment.",
    links: [{ href: "https://github.com/chen-domi/PlaybackPilot", label: "github →" }],
  },
];

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
