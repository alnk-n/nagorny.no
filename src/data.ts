// Site-wide content data (placeholder Norwegian filler — swap with real copy).

import goalsRaw from "./data/goals.json";
import nowRaw from "./data/now.json";

export interface GoalItem {
  text: string;
  text_en?: string;
  createdAt: string;
  archivedAt?: string;
}

export interface NowItem {
  text: string;
  text_en?: string;
  createdAt: string;
  archivedAt?: string;
}

export const GOALS: GoalItem[] = (goalsRaw as GoalItem[]).filter(
  (g) => !g.archivedAt,
);

export const NOW: NowItem[] = (nowRaw as NowItem[]).filter(
  (n) => !n.archivedAt,
);

export interface Project {
  id: string;
  name: string;
  stack: string;
  year: string;
  status: string;
  note: string;
  note_en?: string;
  body: string;
  body_en?: string;
  arch: string;
  learnings: string[];
  learnings_en?: string[];
  links: { live?: string; repo?: string };
  lang?: "no" | "en";
}

export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "code"; content: string; lang?: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "quote"; content: string; attribution?: string }
  | { type: "divider" };

export interface Post {
  slug: string;
  date: string;
  title: string;
  title_en?: string;
  tags: string[];
  lede: string;
  lede_en?: string;
  body?: ContentBlock[];
  body_en?: ContentBlock[];
  readTime?: number;
  lang?: "no" | "en";
}

export const IDENTITY = {
  name: "Alan Krystian Nagorny",
  role: "2VG IT · Tiller VGS",
  location: "Trondheim, NO",
  email: "alan@nagorny.no",
  github: "@alnk-n",
  available: "Starter som IT-lærling høsten 2026",
  available_en: "Starting as an IT apprentice in autumn 2026",
};

const projectFiles = import.meta.glob<Project>("./data/projects/*.json", {
  eager: true,
  import: "default",
});
export const PROJECTS: Project[] = (
  Object.values(projectFiles) as Project[]
).sort((a, b) => b.year.localeCompare(a.year) || a.id.localeCompare(b.id));

const writingFiles = import.meta.glob<Post>("./data/writing/*.json", {
  eager: true,
  import: "default",
});
export const WRITING: Post[] = (Object.values(writingFiles) as Post[]).sort(
  (a, b) => b.date.localeCompare(a.date),
);

export const RESUME = [
  {
    period: "okt.2025-nå",
    period_en: "oct.2025-present",
    what: "Diverse utplasseringer ved Garnes Data",
    what_en: "Various placements at Garnes Data",
  },
  {
    period: "nov.2025",
    period_en: "nov.2025",
    what: "1 uke ved F24 - Webutvikling",
    what_en: "1 week at F24 - Web development",
  },
  {
    period: "mar.2025",
    period_en: "mar.2025",
    what: "1 uke ved Charlottenlund VGS.",
    what_en: "1 week at Charlottenlund VGS.",
  },
  {
    period: "feb.2025",
    period_en: "feb.2025",
    what: "1 uke ved Charlottenlund VGS.",
    what_en: "1 week at Charlottenlund VGS.",
  },
  {
    period: "jul.2023-sep.2022",
    period_en: "jul.2023-sep.2022",
    what: "Trøndelag Lakkering og Snekkering",
    what_en: "Trøndelag Lacquering and Carpentry",
  },
];

export const SKILLS = [
  {
    group: "infrastruktur",
    group_en: "infrastructure",
    items: ["Linux", "Docker", "Proxmox", "nginx/Caddy"],
  },
  {
    group: "nettverk",
    group_en: "networking",
    items: ["VLAN", "pfSense", "Wireshark", "DNS/DHCP", "Wireguard"],
  },
  {
    group: "maskinvare",
    group_en: "hardware",
    items: ["Kabelterminering", "Racking", "Soldering", "3D-print"],
  },
  {
    group: "andre felt",
    group_en: "other fields",
    items: [
      "Microsoft Office",
      "Adobe Suite",
      "Active Directory",
      "Bash-scripting",
    ],
  },
];

export const CERTS = [
  {
    items: ["Networking Basics (Cisco)"],
  },
];
