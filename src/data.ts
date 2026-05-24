// Site-wide content data (placeholder Norwegian filler — swap with real copy).

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

export interface Post {
  slug: string;
  date: string;
  title: string;
  tag: string;
  lede: string;
}

export const IDENTITY = {
  name: 'Jonas Eriksen',
  role: '2VG IT & medieproduksjon · Lillehammer VGS',
  location: 'Lillehammer, NO',
  email: 'jonas@eriksen.dev',
  github: '@jonaseriksen',
  matrix: '@jonas:vgs.no',
  gpg: '0xA8F3 91DD 4C20 E517',
  available: 'Tilgjengelig for sommer-praksis 2026',
};

export const PROJECTS: Project[] = [
  {
    id: 'skoleskjema-no',
    name: 'skoleskjema.no',
    stack: 'SvelteKit · Postgres · Caddy',
    year: '2026',
    status: 'DEPLOYED',
    note: 'Timeplan-aggregator for VGS — lærere limer inn IST-eksport, elever scanner QR for å abonnere på iCal.',
    body: `Aggregator for timeplaner. Lærerne mine eksporterer fra IST som CSV; elevene måtte enten skrive inn alt manuelt eller gi opp. Verktøyet tar imot CSV-en, parser den i Rust, og serverer en personlig iCal-feed per elev.

Brukerne bryr seg om én ting: at QR-koden funker første forsøk. Alt annet er sekundært.`,
    arch:
`         ┌──────────┐    ┌──────────┐
 IST  →  │ parse.rs │ →  │ postgres │ →  iCal feed (per elev)
         └──────────┘    └─────┬────┘
                               ↓
                          [ SvelteKit ]
                          /timeplan/:slug`,
    learnings: [
      'RFC-5545 er rar, men håndterbar når man bare bruker VEVENT.',
      'Postgres + en cron + et 30-linjers Rust-script slo SaaS-stack-en jeg vurderte.',
      'Brukerne bryr seg ikke om hva det er skrevet i. De bryr seg om at det funker.',
    ],
    links: { live: 'https://skoleskjema.no', repo: 'https://github.com/jonaseriksen/skoleskjema-no' },
  },
  {
    id: 'ntb-leser',
    name: 'ntb-leser',
    stack: 'Python · feedparser · curses',
    year: '2026',
    status: 'ACTIVE',
    note: 'RSS-leser i terminalen som leser NTB, NRK, BBC og Hacker News i ett vindu.',
    body: `Et lite curses-program. j/k for å bla, Enter for å åpne i $BROWSER, m for å markere lest. Lagrer state som JSON i ~/.config/ntb-leser.`,
    arch: `feedparser  →  state.json  →  curses TUI`,
    learnings: [
      'feedparser har overlevd 20+ år av en grunn — det taklar all den rare RSS-en.',
      'curses er fortsatt det enkleste verktøyet for å lage et TUI med statlig grensesnitt.',
    ],
    links: { repo: 'https://github.com/jonaseriksen/ntb-leser' },
  },
  {
    id: 'raspi-vaerstation',
    name: 'raspi-vaerstation',
    stack: 'Rust · Raspberry Pi · e-ink',
    year: '2025',
    status: 'ARCHIVED',
    note: 'DHT22-sensor på en Pi Zero med e-ink display — viser temp/fukt i kjelleren.',
    body: 'Bygget over en helg etter at jeg hadde mistanke om at kjelleren var fuktigere enn antatt. Spoiler: den var det.',
    arch: 'DHT22  →  rust-gpio  →  e-ink (2.13" Waveshare)',
    learnings: [
      'GPIO på Rust er overkill for prosjekter som dette, men det var læringsmål nr. 1.',
      'E-ink refresh på under 60s = må optimaliseres for ikke å brenne ut displayet.',
    ],
    links: { repo: 'https://github.com/jonaseriksen/raspi-vaerstation' },
  },
  {
    id: 'minecraft-portalkit',
    name: 'minecraft-portalkit',
    stack: 'Java · Spigot API · MySQL',
    year: '2025',
    status: 'MAINTAINED',
    note: 'Plugin for klassens MC-server — definerbare portaler mellom dimensjoner og worlds.',
    body: 'Klassen vår har en Minecraft-server jeg styrer. Dette plugin-et lar deg sette opp navngitte portaler som virker uavhengig av Nether-koordinater.',
    arch: 'Spigot events  →  Portal manager  →  MySQL (config)',
    learnings: [
      'Spigot API er overraskende stabil — kode fra 2018 funker fortsatt.',
      'Mest tid gikk på å forklare lærere hvordan man laster opp en .jar-fil.',
    ],
    links: { repo: 'https://github.com/jonaseriksen/minecraft-portalkit' },
  },
  {
    id: 'ascii-render',
    name: 'ascii-render',
    stack: 'TypeScript · ffmpeg',
    year: '2024',
    status: 'ARCHIVED',
    note: 'Pipeline som tar en MP4 og rendrer den ut som Braille-tegn i terminalen.',
    body: 'Inspirert av cmatrix og diverse ASCII-konvertere på YouTube. Tar inn en video, sender hver frame gjennom ffmpeg, og mapper pikselverdier til Unicode-Braille (8 pixler per glyph).',
    arch: 'mp4  →  ffmpeg frames  →  luminance map  →  braille glyph grid  →  ANSI stdout',
    learnings: [
      'Braille-rommet (U+2800–U+28FF) gir 8 pixler per tegn — dobbelt så høy oppløsning som vanlig ASCII.',
      'ffmpeg er nesten mer kraftfullt enn man rekker å sette pris på.',
    ],
    links: { repo: 'https://github.com/jonaseriksen/ascii-render' },
  },
];

export const WRITING: Post[] = [
  { slug: '2026-04-vps',   date: '2026-04-12', title: 'Hvordan jeg droppet Replit for en VPS',  tag: 'setup',       lede: 'Replit ble dyrt og treigt. En VPS hos Hetzner koster mindre, og jeg lærer linux skikkelig.' },
  { slug: '2026-03-kodenm',date: '2026-03-04', title: 'Notater fra KodeNM 2026 (3. plass!)',    tag: 'competition', lede: 'Hva vi gjorde riktig, og hva vi kom til å gjort om igjen.' },
  { slug: '2026-01-rust',  date: '2026-01-22', title: 'Lære Rust på en uke — en logg',          tag: 'rust',        lede: 'Borrow checker er ikke en fiende; den er en lærer med altfor mye selvtillit.' },
  { slug: '2025-11-keys',  date: '2025-11-09', title: 'Min hjemmelagde tastaturoppsett',         tag: 'hardware',    lede: 'QMK, Corne, og hvorfor jeg ikke kommer til å lære meg Dvorak igjen.' },
  { slug: '2025-09-nvim',  date: '2025-09-30', title: 'Hvorfor jeg byttet fra VS Code til Neovim', tag: 'tooling',   lede: 'Spoiler: lazy.nvim, telescope, og litt selvbedrag.' },
];

export const NOW: string[] = [
  'Bygger et musikkbibliotek-grensesnitt i Svelte for plata-samlingen min.',
  "Leser 'The Pragmatic Programmer' (kapittel 4 av 8).",
  'Lærer Rust gjennom Advent of Code — på dag 17.',
  'Hjelper et lærerteam med å digitalisere fraværsregistrering.',
];

export const RESUME = [
  { period: '2024–nå',     what: 'Lillehammer VGS — IT & medieproduksjon' },
  { period: "sommer '25",  what: 'Helpdesk-vikar · Innlandet fylkeskommune' },
  { period: '2024',        what: '3. plass · KodeNM Junior' },
  { period: '2023–nå',     what: 'Frivillig sysadmin · klassens Minecraft-server' },
  { period: '2022–nå',     what: 'Linux i kjelleren · selvlært' },
];

export const SKILLS = [
  { group: 'språk',      items: ['Rust', 'TypeScript', 'Python', 'Java', 'C', 'Bash'] },
  { group: 'stacks',     items: ['SvelteKit', 'Next.js', 'Postgres', 'Docker', 'nginx/Caddy'] },
  { group: 'verktøy',    items: ['Neovim', 'Arch (btw)', 'git', 'tmux', 'QMK'] },
  { group: 'andre felt', items: ['Lyd-mix', 'Foto', '3D-print', 'Lodding'] },
];
