# nagorny.no

Personal website hosted on Cloudflare Pages with a custom domain.

## Stack

- **Hosting**: Cloudflare Pages (`nagorny.no` custom domain via CNAME)
- **Bundler**: [Vite](https://vitejs.dev/) with React + TypeScript
- **UI Library**: [SRCL](https://github.com/internet-development/www-sacred) - React component library with a TUI aesthetic

## Local development

```bash
npm i
npm run dev
```

## Deployment

Push to `main` — Cloudflare Pages builds and deploys automatically.

---

## Writing a blog post

Create `src/data/writing/<slug>.md`:

```markdown
---
slug: my-post-slug
date: 2026-06-01
title: Post title (Norwegian)
title_en: Post title (English)
tags: [webdev, personal]
lede: One-sentence summary (Norwegian).
lede_en: One-sentence summary (English).
readTime: 5
lang: no
---

## Section heading

Paragraph with **bold**, _italic_, and `inline code`.

- Bullet item one
- Bullet item two

1. Ordered item one
2. Ordered item two

\`\`\`js
const x = 1;
\`\`\`

> A blockquote
> — attribution

| Column A | Column B |
|----------|----------|
| value    | value    |

:::callout[Note]
A highlighted callout box using a double-border SRCL card.
:::

:::details[Show more]
Expandable accordion section.
:::

---
```

**Frontmatter fields:**

| Field | Required | Notes |
|-------|----------|-------|
| `slug` | yes | Must be unique; used in the URL (`/writing/<slug>.md`) |
| `date` | yes | `YYYY-MM-DD` |
| `title` | yes | Norwegian (or primary language) title |
| `title_en` | no | English title |
| `tags` | yes | Array: `[tag1, tag2]` |
| `lede` | yes | Short summary shown on index |
| `lede_en` | no | English summary |
| `readTime` | no | Minutes as integer |
| `lang` | no | `no` or `en` — shows a language badge when locale differs |

If both a `.json` and `.md` file exist with the same slug, the `.json` wins.

**Bilingual body**: create a companion file `<slug>.en.md` in the same directory. It contains only the English Markdown body — no frontmatter needed. The Norwegian body comes from `<slug>.md`, the English body from `<slug>.en.md`. Metadata (`title_en`, `lede_en`) still lives in the primary file's frontmatter. A companion file also works alongside a `.json` primary.

```
src/data/writing/
  my-post.md          ← Norwegian body + all frontmatter (title_en, lede_en, etc.)
  my-post.en.md       ← English body only (plain Markdown, no frontmatter)
```

---

## Adding a project

Create `src/data/projects/<id>.md`:

```markdown
---
id: my-project
name: My Project
stack: TypeScript · React
year: 2026
status: DEPLOYED
note: Short description shown on the index (Norwegian).
note_en: Short description (English).
live: https://example.com
repo: https://github.com/user/repo
learnings: First thing I learned | Second thing | Third thing
learnings_en: First thing | Second thing | Third thing
lang: no
---

## About the project

Body content as full Markdown — all block types work here too.
```

**Frontmatter fields:**

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | Must be unique; used in the URL (`/projects/<id>.md`) |
| `name` | yes | Display name |
| `stack` | yes | Tech stack string |
| `year` | yes | e.g. `2026` |
| `status` | yes | e.g. `DEPLOYED`, `WIP`, `ARCHIVED` |
| `note` | yes | Short index description |
| `note_en` | no | English short description |
| `live` | no | Live URL |
| `repo` | no | Source URL |
| `learnings` | no | Pipe-separated list: `item one \| item two` |
| `learnings_en` | no | Pipe-separated English learnings |
| `arch` | — | Not supported in `.md` format; use JSON for ASCII arch diagrams |
| `lang` | no | `no` or `en` |

For projects that need a multi-line `arch` ASCII diagram, use a `.json` file instead. The `body` field in JSON now accepts `ContentBlock[]` — you can mix in any block type including `heading`, `list`, `table`, `callout`, and `details`.

**Bilingual body**: same companion convention as writing posts — create `<id>.en.md` alongside the primary file.

```
src/data/projects/
  my-project.md          ← Norwegian body + all frontmatter
  my-project.en.md       ← English body only
```

---

## Supported Markdown block types

| Syntax | Renders as |
|--------|-----------|
| `## heading` | Section heading (h2–h4) |
| ` ```lang ` | Code block with optional language |
| `> quote` | Block quote; `— attribution` on last line sets the attribution |
| `---` | Divider |
| `![alt](src "caption")` | Image with optional caption |
| `- item` / `* item` | Unordered list |
| `1. item` | Ordered list |
| `\| col \|` table | Data table (SimpleTable component) |
| `:::callout[Title]` | Highlighted callout (CardDouble component) |
| `:::details[Summary]` | Expandable accordion (Accordion component) |

**Inline formatting** (works inside paragraphs, headings, list items, callouts):
`**bold**`, `_italic_`, `` `code` ``, `[link](url)`
