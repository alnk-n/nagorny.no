// Site-wide content data (placeholder Norwegian filler — swap with real copy).
//
// Bilingual fields here use an optional `_en`-suffixed sibling (e.g. `text`/
// `text_en`), resolved at render time with `loc()` from ../locale, which
// falls back to the Norwegian field when English is absent. This is content
// that's often only authored in one language, so it's intentionally looser
// than locale.ts's UI catalog, which requires both locales for every key.

import goalsRaw from "./data/goals.json";
import nowRaw from "./data/now.json";
import { mdToPost, mdToProject, markdownToBlocks } from "./common/markdown";

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

// Latest touch (create or archive) across every now.json entry — reflects
// when the file itself was last edited, not just when the visible list changed.
const nowTouchDates = (nowRaw as NowItem[])
  .flatMap((n) => [n.createdAt, n.archivedAt])
  .filter((d): d is string => !!d)
  .sort();
export const NOW_UPDATED: string = nowTouchDates[nowTouchDates.length - 1];

export type ContentBlock =
  | { type: "text"; content: string; html?: boolean }
  | { type: "code"; content: string; lang?: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "quote"; content: string; attribution?: string; html?: boolean }
  | { type: "divider" }
  | { type: "heading"; level: 2 | 3 | 4; content: string; html?: boolean }
  | { type: "list"; ordered?: boolean; items: string[]; html?: boolean }
  | { type: "table"; data: string[][] }
  | { type: "callout"; content: string; title?: string; html?: boolean }
  | { type: "details"; summary: string; content: string; html?: boolean }
  | { type: "ascii"; content: string; caption?: string };

export interface Project {
  id: string;
  name: string;
  stack: string;
  year: string;
  status: string;
  note: string;
  note_en?: string;
  body: ContentBlock[];
  body_en?: ContentBlock[];
  arch: string;
  learnings: string[];
  learnings_en?: string[];
  links: { live?: string; repo?: string };
  lang?: "no" | "en";
}

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
  location: "Trondheim, NO",
  email: "alan@nagorny.no",
  github: "@alnk-n",
  available: "IT-lærling ved Garnes Data Trondheim",
  available_en: "IT-apprentice at Garnes Data Trondheim",
};

const projectJsonFiles = import.meta.glob<Project>("./data/projects/*.json", {
  eager: true,
  import: "default",
});
const allProjectMdFiles = import.meta.glob("./data/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Separate primary .md files from .en.md English-body companions
const projectEnBodies = new Map<string, ContentBlock[]>();
const projectMdPrimary: string[] = [];
for (const [key, raw] of Object.entries(allProjectMdFiles)) {
  const filename = key.split("/").pop()!;
  if (filename.endsWith(".en.md")) {
    const id = filename.slice(0, -".en.md".length);
    projectEnBodies.set(id, markdownToBlocks(raw));
  } else {
    projectMdPrimary.push(raw);
  }
}

const projectMdParsed: Project[] = projectMdPrimary
  .map((raw) => mdToProject(raw))
  .filter((p): p is Project => p !== null);

const projectJsonMap = new Map(
  (Object.values(projectJsonFiles) as Project[]).map((p) => [p.id, p]),
);
// JSON wins over .md when both define the same id
for (const p of projectMdParsed) {
  if (!projectJsonMap.has(p.id)) projectJsonMap.set(p.id, p);
}

export const PROJECTS: Project[] = Array.from(projectJsonMap.values())
  .map((p) =>
    !p.body_en && projectEnBodies.has(p.id)
      ? { ...p, body_en: projectEnBodies.get(p.id)! }
      : p,
  )
  .sort((a, b) => b.year.localeCompare(a.year) || a.id.localeCompare(b.id));

const writingJsonFiles = import.meta.glob<Post>("./data/writing/*.json", {
  eager: true,
  import: "default",
});
const allWritingMdFiles = import.meta.glob("./data/writing/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Separate primary .md files from .en.md English-body companions
const writingEnBodies = new Map<string, ContentBlock[]>();
const writingMdPrimary: string[] = [];
for (const [key, raw] of Object.entries(allWritingMdFiles)) {
  const filename = key.split("/").pop()!;
  if (filename.endsWith(".en.md")) {
    const slug = filename.slice(0, -".en.md".length);
    writingEnBodies.set(slug, markdownToBlocks(raw));
  } else {
    writingMdPrimary.push(raw);
  }
}

const writingMdParsed: Post[] = writingMdPrimary
  .map((raw) => mdToPost(raw))
  .filter((p): p is Post => p !== null);

const writingJsonMap = new Map(
  (Object.values(writingJsonFiles) as Post[]).map((p) => [p.slug, p]),
);
// JSON wins over .md when both define the same slug
for (const p of writingMdParsed) {
  if (!writingJsonMap.has(p.slug)) writingJsonMap.set(p.slug, p);
}

export const WRITING: Post[] = Array.from(writingJsonMap.values())
  .map((p) =>
    !p.body_en && writingEnBodies.has(p.slug)
      ? { ...p, body_en: writingEnBodies.get(p.slug)! }
      : p,
  )
  .sort((a, b) => b.date.localeCompare(a.date));

export const RESUME = [
  {
    period: "aug.2026-aug.2028",
    period_en: "aug.2026-aug.2028",
    what: "IT-lærling ved Garnes Data Trondheim",
    what_en: "IT-apprentice at Garnes Data Trondheim",
  },
  {
    period: "jun.2025-jul.2026",
    period_en: "jun.2025-jul.2026",
    what: "Kjøkkenhjelp ved St. Olavs Hospital",
    what_en: "Kitchen helper at St. Olavs Hospital",
  },
  {
    period: "okt.2025-mar.2026",
    period_en: "oct.2025-mar.2026",
    what: "Diverse utplasseringer ved Garnes Data",
    what_en: "Various internships at Garnes Data",
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
    what_en: "Trøndelag Lakkering og Snekkering",
  },
];

export const SKILLS = [
  {
    group: "infrastruktur",
    group_en: "infrastructure",
    items: [
      {
        name: "Linux",
        desc: "Primær-OS for personlig bruk",
        desc_en: "Primary OS for personal use",
      },
      {
        name: "Docker",
        desc: "Containerisering av tjenester",
        desc_en: "Containerization of services",
      },
      {
        name: "Proxmox",
        desc: "Hypervisor for VM-er og LXC-containere",
        desc_en: "Hypervisor for VMs and LXC containers",
      },
      {
        name: "nginx/Caddy",
        desc: "Reverse-Proxies for ruting og TLS",
        desc_en: "Reverse proxies for routing and TLS",
      },
    ],
  },
  {
    group: "nettverk",
    group_en: "networking",
    items: [
      {
        name: "VLAN",
        desc: "Nettverkssegmentering",
        desc_en: "Network segmentation",
      },
      {
        name: "OPNsense",
        desc: "Open-source ruter-OS",
        desc_en: "Open-source router OS",
      },
      {
        name: "Wireshark",
        desc: "Pakkeanalyse og feilsøking",
        desc_en: "Packet capture and traffic analysis",
      },
      {
        name: "DNS/DHCP",
        desc: "Navneoppløsning og IP-adressetildeling",
        desc_en: "Name resolution and IP address management",
      },
      {
        name: "Wireguard/Tailscale",
        desc: "Moderne VPN-protokoller for sikker tilgang",
        desc_en: "Modern VPN protocols for secure access",
      },
    ],
  },
  {
    group: "maskinvare",
    group_en: "hardware",
    items: [
      {
        name: "Kabelterminering",
        desc: "RJ45-crimping og ryddig kabelføring",
        desc_en: "RJ45 crimping and cable management",
      },
      {
        name: "Elektronikkreparasjon",
        desc: "Reparasjon og vedlikehold av elektroniske enheter",
        desc_en: "Repair and maintenance of electronic devices",
      },
      {
        name: "Racking",
        desc: "Montering av utstyr i serverstativer",
        desc_en: "Installing equipment in server racks",
      },
      {
        name: "Soldering",
        desc: "Enkel PCB-reparasjon med SMC-komponenter",
        desc_en: "Basic PCB repair with SMC components",
      },
      {
        name: "3D-print",
        desc: "FDM-printing med PLA, ABS and TPU",
        desc_en: "FDM printing with PLA, ABS and TPU",
      },
    ],
  },
  {
    group: "andre felt",
    group_en: "other fields",
    items: [
      {
        name: "Microsoft Office",
        desc: "Word, Excel, PowerPoint og OneNote",
        desc_en: "Word, Excel, PowerPoint and OneNote",
      },
      {
        name: "Adobe Suite",
        desc: "Photoshop, Premiere, Illustrator, XD osv.",
        desc_en: "Photoshop, Premiere, Illustrator, XD etc.",
      },
      {
        name: "Active Directory",
        desc: "Windows-domenestyring og gruppepolicyer",
        desc_en: "Windows domain management and group policies",
      },
      {
        name: "Bash-scripting",
        desc: "Shell-automatisering og scripting",
        desc_en: "Shell automation and scripting",
      },
    ],
  },
];

export const CERTS = [
  {
    items: ["Networking Basics (Cisco)"],
  },
];
