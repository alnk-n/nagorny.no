// Site-wide content data (placeholder Norwegian filler — swap with real copy).

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

export type ContentBlock =
  | { type: "text"; content: string; html?: boolean }
  | { type: "code"; content: string; lang?: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "quote"; content: string; attribution?: string }
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
  role: "2VG IT · Tiller VGS",
  location: "Trondheim, NO",
  email: "alan@nagorny.no",
  github: "@alnk-n",
  available: "Starter som IT-lærling høsten 2026",
  available_en: "Starting as an IT apprentice in autumn 2026",
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
    period: "okt.2025-nå",
    period_en: "oct.2025-present",
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
      { name: "Linux", desc: "Primær OS for utvikling og hjemmelabbruk", desc_en: "Primary OS for development and homelab use" },
      { name: "Docker", desc: "Containerisering av tjenester og applikasjoner", desc_en: "Container runtime for isolated services" },
      { name: "Proxmox", desc: "Hypervisor for virtuelle maskiner og LXC", desc_en: "Bare-metal hypervisor for VMs and LXC containers" },
      { name: "nginx/Caddy", desc: "Omvendte proxyer for ruting og TLS", desc_en: "Reverse proxies for routing and TLS termination" },
    ],
  },
  {
    group: "nettverk",
    group_en: "networking",
    items: [
      { name: "VLAN", desc: "Virtuelt LAN for nettverkssegmentering", desc_en: "Virtual LANs for network segmentation" },
      { name: "pfSense", desc: "Open-source brannmur og ruter-OS", desc_en: "Open-source firewall and router OS" },
      { name: "Wireshark", desc: "Pakkeanalyse og nettverksfeilsøking", desc_en: "Packet capture and network traffic analysis" },
      { name: "DNS/DHCP", desc: "Navneoppløsning og IP-adressetildeling", desc_en: "Name resolution and IP address management" },
      { name: "Wireguard", desc: "Moderne VPN-protokoll — rask og enkel", desc_en: "Modern VPN protocol — fast and minimal" },
    ],
  },
  {
    group: "maskinvare",
    group_en: "hardware",
    items: [
      { name: "Kabelterminering", desc: "RJ45-crimping og strukturert kabling", desc_en: "RJ45 crimping and structured cabling" },
      { name: "Racking", desc: "Montering av utstyr i serverstativer", desc_en: "Installing equipment in server racks" },
      { name: "Soldering", desc: "PCB-reparasjon og tilpassede kabler", desc_en: "PCB rework and custom cable assembly" },
      { name: "3D-print", desc: "FDM-printing av kabinetter og deler", desc_en: "FDM printing for enclosures and custom parts" },
    ],
  },
  {
    group: "andre felt",
    group_en: "other fields",
    items: [
      { name: "Microsoft Office", desc: "Word, Excel, PowerPoint og OneNote", desc_en: "Word, Excel, PowerPoint and OneNote" },
      { name: "Adobe Suite", desc: "Photoshop og Illustrator — bilde og design", desc_en: "Photoshop and Illustrator — image and design" },
      { name: "Active Directory", desc: "Windows-domenestyring og gruppepolicyer", desc_en: "Windows domain management and group policies" },
      { name: "Bash-scripting", desc: "Shell-automatisering og systemscripting", desc_en: "Shell automation and system scripting" },
    ],
  },
];

export const CERTS = [
  {
    items: ["Networking Basics (Cisco)"],
  },
];
