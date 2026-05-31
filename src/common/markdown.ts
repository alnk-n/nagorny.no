import type { ContentBlock, Post, Project } from '../data';

// ── Inline formatting ────────────────────────────────────────────────────────

function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    .replace(/_([^_\n]+?)_/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

// ── Frontmatter parser ───────────────────────────────────────────────────────

type FMValue = string | string[];
type FMRecord = Record<string, FMValue>;

export function parseFrontmatter(raw: string): { meta: FMRecord; body: string } {
  const lines = raw.split('\n');
  if (lines[0]?.trim() !== '---') return { meta: {}, body: raw };

  const endIdx = lines.indexOf('---', 1);
  if (endIdx === -1) return { meta: {}, body: raw };

  const fmLines = lines.slice(1, endIdx);
  const body = lines.slice(endIdx + 1).join('\n').trimStart();

  const meta: FMRecord = {};
  for (const line of fmLines) {
    const m = line.match(/^([\w.[\]_-]+)\s*:\s*(.+)$/);
    if (!m) continue;
    const key = m[1].trim();
    const val = m[2].trim().replace(/^['"]|['"]$/g, '');
    // Inline array: [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      meta[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      meta[key] = val;
    }
  }

  return { meta, body };
}

// ── Block-level Markdown → ContentBlock[] ───────────────────────────────────

export function markdownToBlocks(md: string): ContentBlock[] {
  const lines = md.split('\n');
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading: ## / ### / ####  (# h1 is skipped — title lives in frontmatter)
    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: Math.min(headingMatch[1].length, 4) as 2 | 3 | 4,
        content: applyInline(headingMatch[2]),
        html: true,
      });
      i++;
      continue;
    }

    // Code fence: ```lang
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || undefined;
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: 'code', content: codeLines.join('\n'), lang });
      continue;
    }

    // Custom fenced block: :::kind[Label]
    if (line.startsWith(':::') && line.length > 3) {
      const fenceMatch = line.match(/^:::(\w+)(?:\[([^\]]*)\])?/);
      if (fenceMatch) {
        const kind = fenceMatch[1];
        const label = fenceMatch[2] ?? undefined;
        const contentLines: string[] = [];
        i++;
        while (i < lines.length && lines[i].trim() !== ':::') {
          contentLines.push(lines[i]);
          i++;
        }
        i++; // skip closing :::
        const content = applyInline(contentLines.join('\n').trim());
        if (kind === 'details') {
          blocks.push({ type: 'details', summary: label ?? 'Details', content, html: true });
        } else {
          // callout (default)
          blocks.push({ type: 'callout', content, title: label, html: true });
        }
        continue;
      }
    }

    // Divider: --- alone on a line
    if (line.trim() === '---') {
      blocks.push({ type: 'divider' });
      i++;
      continue;
    }

    // Image: ![alt](src "optional caption")
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)"]+?)(?:\s+"([^"]+)")?\s*\)/);
    if (imgMatch) {
      blocks.push({
        type: 'image',
        src: imgMatch[2],
        alt: imgMatch[1] || undefined,
        caption: imgMatch[3],
      });
      i++;
      continue;
    }

    // Blockquote: > lines
    if (line.startsWith('> ') || line === '>') {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i].startsWith('> ') || lines[i] === '>')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      const last = quoteLines[quoteLines.length - 1] ?? '';
      let attribution: string | undefined;
      let content: string;
      if (last.match(/^[—–-]\s/)) {
        attribution = last.slice(2).trim();
        content = quoteLines.slice(0, -1).join(' ').trim();
      } else {
        content = quoteLines.join(' ').trim();
      }
      blocks.push({ type: 'quote', content: applyInline(content), attribution });
      continue;
    }

    // Unordered list: - item or * item
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(applyInline(lines[i].slice(2)));
        i++;
      }
      blocks.push({ type: 'list', items, html: true });
      continue;
    }

    // Ordered list: 1. item
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(applyInline(lines[i].replace(/^\d+\. /, '')));
        i++;
      }
      blocks.push({ type: 'list', ordered: true, items, html: true });
      continue;
    }

    // Table: | col | col |
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      // Drop separator rows (|---|---|)
      const rows = tableLines
        .filter((l) => !l.match(/^\|[-: |]+\|$/))
        .map((l) =>
          l
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((c) => c.trim()),
        );
      if (rows.length > 0) {
        blocks.push({ type: 'table', data: rows });
      }
      continue;
    }

    // Empty line — skip
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Text paragraph — accumulate until a block-level element or blank line
    const textLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (
        l.trim() === '' ||
        l.match(/^#{2,4} /) ||
        l.startsWith('```') ||
        (l.startsWith(':::') && l.length > 3) ||
        l.trim() === '---' ||
        l.match(/^!\[/) ||
        l.startsWith('> ') ||
        l === '>' ||
        l.match(/^[-*] /) ||
        l.match(/^\d+\. /) ||
        l.startsWith('|')
      )
        break;
      textLines.push(l);
      i++;
    }
    if (textLines.length > 0) {
      blocks.push({ type: 'text', content: applyInline(textLines.join(' ')), html: true });
    }
  }

  return blocks;
}

// ── Build a Post from parsed frontmatter + body ──────────────────────────────

export function mdToPost(raw: string): Post | null {
  const { meta, body } = parseFrontmatter(raw);
  const slug = meta['slug'];
  if (!slug || typeof slug !== 'string') return null;

  const tagsRaw = meta['tags'];
  const tags = Array.isArray(tagsRaw) ? tagsRaw : typeof tagsRaw === 'string' ? [tagsRaw] : [];

  return {
    slug,
    date: (meta['date'] as string) ?? '',
    title: (meta['title'] as string) ?? slug,
    title_en: meta['title_en'] as string | undefined,
    tags,
    lede: (meta['lede'] as string) ?? '',
    lede_en: meta['lede_en'] as string | undefined,
    readTime: meta['readTime'] ? parseInt(meta['readTime'] as string, 10) : undefined,
    lang: (meta['lang'] as 'no' | 'en' | undefined),
    body: markdownToBlocks(body),
  };
}

// ── Build a Project from parsed frontmatter + body ───────────────────────────

export function mdToProject(raw: string): Project | null {
  const { meta, body } = parseFrontmatter(raw);
  const id = meta['id'];
  if (!id || typeof id !== 'string') return null;

  const splitPipe = (v: FMValue | undefined): string[] => {
    if (!v) return [];
    if (Array.isArray(v)) return v;
    return v.split(' | ').map((s) => s.trim()).filter(Boolean);
  };

  return {
    id,
    name: (meta['name'] as string) ?? id,
    stack: (meta['stack'] as string) ?? '',
    year: (meta['year'] as string) ?? '',
    status: (meta['status'] as string) ?? '',
    note: (meta['note'] as string) ?? '',
    note_en: meta['note_en'] as string | undefined,
    body: markdownToBlocks(body),
    arch: (meta['arch'] as string) ?? '',
    learnings: splitPipe(meta['learnings']),
    learnings_en: splitPipe(meta['learnings_en']).length > 0
      ? splitPipe(meta['learnings_en'])
      : undefined,
    links: {
      live: meta['live'] as string | undefined,
      repo: meta['repo'] as string | undefined,
    },
    lang: meta['lang'] as 'no' | 'en' | undefined,
  };
}
