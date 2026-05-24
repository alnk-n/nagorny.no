// App.tsx — root layout, hash router, sidebar drawer, global keyboard nav.

import * as React from 'react';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

import {
  PageReadme, PageAbout, PageNow, PageResume, PageContact,
  PageProjectsIndex, PageProjectDetail, PageWritingIndex, PageWritingDetail, Page404,
} from './pages';

import { fileList, parseRoute } from './router';
import { useHashRoute } from './useHashRoute';

type Theme = 'theme-light' | 'theme-dark';
type Tint = '' | 'tint-green' | 'tint-blue' | 'tint-yellow' | 'tint-pink';

function App(): React.ReactElement {
  const [path, navigate] = useHashRoute();
  const [theme, setTheme] = React.useState<Theme>(
    () => ((localStorage.getItem('theme') as Theme) || 'theme-dark')
  );
  const [tint, setTint] = React.useState<Tint>(
    () => ((localStorage.getItem('tint') as Tint) || '')
  );
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Reflect theme + tint on <body> (SRCL's tokens read from body classes).
  React.useEffect(() => {
    document.body.className = `${theme} ${tint}`.trim();
    localStorage.setItem('theme', theme);
    localStorage.setItem('tint', tint);
  }, [theme, tint]);

  // Close drawer + jump to top whenever the route changes.
  React.useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [path]);

  const files = React.useMemo(fileList, []);
  const curIdx = files.findIndex((f) => f.path === path);

  // Global keyboard:
  //   ↑/↓ or j/k → walk the flat file list
  //   Esc       → close the mobile drawer
  React.useEffect(() => {
    const isFormField = (el: EventTarget | null) =>
      !!el && (el as HTMLElement).tagName && /^(INPUT|TEXTAREA|SELECT)$/.test((el as HTMLElement).tagName);

    const onKey = (e: KeyboardEvent) => {
      if (isFormField(e.target)) return;
      if (e.key === 'Escape') { setDrawerOpen(false); return; }
      if (e.key === 'ArrowDown' || e.key === 'j') {
        if (curIdx >= 0 && curIdx < files.length - 1) {
          e.preventDefault();
          navigate(files[curIdx + 1].path);
        }
      }
      if (e.key === 'ArrowUp' || e.key === 'k') {
        if (curIdx > 0) { e.preventDefault(); navigate(files[curIdx - 1].path); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [curIdx, files, navigate]);

  const route = parseRoute(path);

  let page: React.ReactNode;
  switch (route.kind) {
    case 'readme':          page = <PageReadme />; break;
    case 'about':           page = <PageAbout />; break;
    case 'now':             page = <PageNow />; break;
    case 'resume':          page = <PageResume />; break;
    case 'contact':         page = <PageContact />; break;
    case 'projects-index':  page = <PageProjectsIndex />; break;
    case 'project':         page = <PageProjectDetail id={route.id} />; break;
    case 'writing-index':   page = <PageWritingIndex />; break;
    case 'post':            page = <PageWritingDetail slug={route.slug} />; break;
    case 'not-found':       page = <Page404 path={route.path} />; break;
  }

  return (
    <div className="site">
      <header className="site-nav">
        <TopBar
          theme={theme}
          setTheme={setTheme}
          tint={tint}
          setTint={setTint}
          onMenu={() => setDrawerOpen(true)}
        />
      </header>

      <div
        className={`site-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      <aside
        className={`site-aside ${drawerOpen ? 'open' : ''}`}
        aria-label="filesystem navigation"
      >
        <Sidebar
          path={path}
          navigate={navigate}
          onPickAny={() => setDrawerOpen(false)}
          onClose={() => setDrawerOpen(false)}
        />
      </aside>

      <main className="site-main">{page}</main>
    </div>
  );
}

export default App;
