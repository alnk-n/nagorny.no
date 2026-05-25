// Site-wide content data (placeholder Norwegian filler — swap with real copy).

import goalsRaw from "./data/goals.json";
import nowRaw from "./data/now.json";

export interface GoalItem {
  text: string;
  createdAt: string;
  archivedAt?: string;
}

export interface NowItem {
  text: string;
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
  body: string;
  arch: string;
  learnings: string[];
  links: { live?: string; repo?: string };
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
  tags: string[];
  lede: string;
  body?: ContentBlock[];
  readTime?: number;
}

export const IDENTITY = {
  name: "Alan Krystian Nagorny",
  role: "2VG IT · Tiller VGS",
  location: "Trondheim, NO",
  email: "alan@nagorny.no",
  github: "@alnk-n",
  available: "Starter som IT-lærling høsten 2026",
};

const projectFiles = import.meta.glob<Project>("./data/projects/*.json", {
  eager: true,
  import: "default",
});
export const PROJECTS: Project[] = (Object.values(projectFiles) as Project[]).sort(
  (a, b) => b.year.localeCompare(a.year) || a.id.localeCompare(b.id),
);

const writingFiles = import.meta.glob<Post>("./data/writing/*.json", {
  eager: true,
  import: "default",
});
export const WRITING: Post[] = (Object.values(writingFiles) as Post[]).sort(
  (a, b) => b.date.localeCompare(a.date),
);

export const RESUME = [
  { period: "okt.2025-nå", what: "Diverse utplasseringer ved Garnes Data" },
  { period: "nov.2025", what: "1 uke ved F24 - Webutvikling" },
  { period: "mar.2025", what: "1 uke ved Charlottenlund VGS." },
  { period: "feb.2025", what: "1 uke ved Charlottenlund VGS." },
  { period: "jul.2023-sep.2022", what: "Trøndelag Lakkering og Snekkering" },
];

export const SKILLS = [
  {
    group: "infrastruktur",
    items: ["Linux", "Docker", "Proxmox", "nginx/Caddy"],
  },
  {
    group: "nettverk",
    items: ["VLAN", "pfSense", "Wireshark", "DNS/DHCP", "Wireguard"],
  },
  {
    group: "maskinvare",
    items: ["Kabelterminering", "Racking", "Lodding", "3D-print"],
  },
  {
    group: "andre felt",
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
