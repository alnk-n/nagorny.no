// router.ts — hash-based routes for the site.
// Pure types + helpers, no React imports (the hook lives in useHashRoute.ts).

import { PROJECTS, WRITING } from './data';

export type Route =
  | { kind: 'readme' }
  | { kind: 'about' }
  | { kind: 'now' }
  | { kind: 'resume' }
  | { kind: 'contact' }
  | { kind: 'projects-index' }
  | { kind: 'project'; id: string }
  | { kind: 'writing-index' }
  | { kind: 'post'; slug: string }
  | { kind: 'not-found'; path: string };

export function parseRoute(path: string): Route {
  if (path === '' || path === '/') return { kind: 'readme' };
  if (path === '/about.md')     return { kind: 'about' };
  if (path === '/now.log')      return { kind: 'now' };
  if (path === '/resume.txt')   return { kind: 'resume' };
  if (path === '/contact.conf') return { kind: 'contact' };
  if (path === '/projects/' || path === '/projects') return { kind: 'projects-index' };
  if (path === '/writing/' || path === '/writing')   return { kind: 'writing-index' };
  let m = path.match(/^\/projects\/([^/]+)\.md$/);
  if (m) return { kind: 'project', id: m[1] };
  m = path.match(/^\/writing\/([^/]+)\.md$/);
  if (m) return { kind: 'post', slug: m[1] };
  return { kind: 'not-found', path };
}

export interface FileEntry { path: string; label: string }

// Flat list of files (folders excluded) — used by the ↑/↓ keyboard navigator
// to walk between routes in render order. Folders sit in the route table
// because the user can open them, but they aren't part of the linear walk.
export function fileList(): FileEntry[] {
  const list: FileEntry[] = [
    { path: '/',             label: 'readme.md' },
    { path: '/about.md',     label: 'about.md' },
    { path: '/now.log',      label: 'now.log' },
    { path: '/resume.txt',   label: 'resume.txt' },
    { path: '/contact.conf', label: 'contact.conf' },
  ];
  for (const p of PROJECTS) list.push({ path: `/projects/${p.id}.md`, label: `${p.id}.md` });
  for (const w of WRITING)  list.push({ path: `/writing/${w.slug}.md`, label: `${w.slug}.md` });
  return list;
}
