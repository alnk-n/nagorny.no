// pages.tsx — page bodies for every route. One file because the site is small
// and a flat layout is easier to navigate than ten one-page files.

import * as React from 'react';

import { IDENTITY, NOW, PROJECTS, RESUME, SKILLS, WRITING } from './data';

import Accordion from './components/srcl/Accordion';
import ActionBar from './components/srcl/ActionBar';
import Badge from './components/srcl/Badge';
import BreadCrumbs from './components/srcl/BreadCrumbs';
import Card from './components/srcl/Card';
import CodeBlock from './components/srcl/CodeBlock';
import Divider from './components/srcl/Divider';
import Text from './components/srcl/Text';
import Window from './components/srcl/Window';
import ActionListItem from './components/srcl/ActionListItem';

const ASCII_HERO = String.raw`
    _                                 _ _                  _
 __| | ___  _ __  __ _ ___  ___  ___ | (_)_ __   __ _    /\
/ _\` |/ _ \| '_ \/ _\` / __|/ _ \/ _ \| | | '_ \ / _\` |  /  \
\__,_|\___/|_| |_\__,_|___/\___/\___||_|_|_| |_|\__, | /____\
                                                |___/  ====
   jonas eriksen — 2VG IT — Lillehammer VGS, NO
`;

// ── /readme.md ────────────────────────────────────────────────────────────
export function PageReadme() {
  return (
    <>
      <div className="page-head">
        <h1>readme.md</h1>
        <span className="meta">root · 0:32 · 1.4kb</span>
      </div>

      <pre className="hero-ascii">{ASCII_HERO}</pre>

      <Window>
        <Text>
          Hei. Du har åpnet hjemmesida til <b>{IDENTITY.name}</b> — bygd som et lite filsystem du kan navigere.
          Klikk på en fil i sidemenyen, eller bruk piltastene. På mobil: trykk «MENU» øverst.
        </Text>
        <Text style={{ marginTop: '1rem' }}>
          Bygd med <a href="https://www.sacred.computer/" target="_blank" rel="noreferrer">SRCL</a>{' '}
          — en open-source React-bibliotek med terminal-estetikk.
        </Text>
      </Window>

      <Card title="ANBEFALT ENTRY POINT" mode="left">
        <Text>
          Begynn med <a href="#/about.md">about.md</a> hvis du vil vite hvem jeg er,
          eller <a href="#/projects/">projects/</a> hvis du heller vil se hva jeg har bygd.
        </Text>
        <div className="btn-row">
          <a className="btn-primary" href="#/about.md">About →</a>
          <a className="btn-secondary" href="#/projects/">Projects →</a>
          <a className="btn-secondary" href="#/writing/">Writing →</a>
        </div>
      </Card>
    </>
  );
}

// ── /about.md ─────────────────────────────────────────────────────────────
export function PageAbout() {
  return (
    <>
      <div className="page-head">
        <h1>about.md</h1>
        <span className="meta">last edit · 2026-04-30 · 1.2kb</span>
      </div>

      <Window>
        <Text>
          Jeg heter <b>{IDENTITY.name}</b>. 17 år, andre-klassing på IT &amp; medieproduksjon på Lillehammer VGS.
        </Text>
        <Text style={{ marginTop: '1rem' }}>
          Bruker fritida på å skru på servere, spille brettspill, og skrive små verktøy for klassen —
          særlig sånt som hjelper med skolehverdagen. Liker når kode er enkel, når brukergrensesnitt
          er ærlige, og når en datamaskin gjør akkurat det man ber om — ikke noe mer.
        </Text>
        <Text style={{ marginTop: '1rem', opacity: 0.75 }}>
          {IDENTITY.available} · snakker norsk + engelsk.
        </Text>
      </Window>

      <Card title="STACK" mode="left">
        {SKILLS.map((g) => (
          <div key={g.group} style={{ marginBottom: '0.5rem' }}>
            <div style={{ opacity: 0.7, textTransform: 'uppercase' }}>{g.group}</div>
            <div className="tag-row">
              {g.items.map((it) => <Badge key={it}>{it}</Badge>)}
            </div>
          </div>
        ))}
      </Card>

      <Card title="MÅL FOR 2026" mode="left">
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {[
            'Komme på topp 10 i KodeNM.',
            'Få sommerjobb hos et lite konsulenthus.',
            'Skrive 12 blogposter (én per måned).',
            'Lære nok lavnivå-Rust til å skrive en liten kernel for moro skyld.',
          ].map((g) => (
            <li key={g} style={{ display: 'flex', gap: '1ch' }}>
              <span className="bullet">▪</span><span>{g}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

// ── /now.log ──────────────────────────────────────────────────────────────
export function PageNow() {
  return (
    <>
      <div className="page-head">
        <h1>now.log</h1>
        <span className="meta">tail · live · 2026-05-08</span>
      </div>
      <Window>
        <Text style={{ opacity: 0.7, marginBottom: '1rem' }}>
          # «<a href="https://nownownow.com/about" target="_blank" rel="noreferrer">/now</a>»-side. Hva jeg jobber med akkurat nå.
        </Text>
        {NOW.map((n, i) => (
          <Text key={i} style={{ marginBottom: '0.5rem' }}>
            <span style={{ opacity: 0.6 }}>·</span> {n}
          </Text>
        ))}
        <div style={{ marginTop: '1rem' }}><Divider /></div>
        <Text style={{ marginTop: '0.75rem', opacity: 0.6 }}>
          oppdateres ukentlig — sist 2026-05-08
        </Text>
      </Window>
    </>
  );
}

// ── /resume.txt ───────────────────────────────────────────────────────────
export function PageResume() {
  return (
    <>
      <div className="page-head">
        <h1>resume.txt</h1>
        <span className="meta">view · 4.1kb</span>
      </div>

      <Card title="ERFARING" mode="left">
        <div className="kv">
          {RESUME.map((r, i) => (
            <React.Fragment key={i}>
              <div className="k">{r.period}</div>
              <div>{r.what}</div>
            </React.Fragment>
          ))}
        </div>
      </Card>

      <Card title="UTDANNING" mode="left">
        <div className="kv">
          <div className="k">2024–nå</div>
          <div>Lillehammer VGS — IT &amp; medieproduksjon · linje 2VGIT.</div>
          <div className="k">2021–2024</div>
          <div>Hammartun ungdomsskole.</div>
        </div>
      </Card>

      <Card title="REFERANSER" mode="left">
        <Text style={{ opacity: 0.7 }}>Tilgjengelig på forespørsel — kontakt via e-post.</Text>
        <div style={{ height: '0.75rem' }} />
        <ActionBar items={[
          { body: 'Last ned PDF ↓', onClick: () => alert('placeholder — kobles til /resume.pdf før deploy.') },
          { body: 'Åpne i ny fane ↗', onClick: () => window.open('#/resume.txt', '_blank') },
        ]} />
      </Card>
    </>
  );
}

// ── /contact.conf ─────────────────────────────────────────────────────────
export function PageContact() {
  return (
    <>
      <div className="page-head">
        <h1>contact.conf</h1>
        <span className="meta">cleartext · 0.4kb</span>
      </div>
      <Window>
        <CodeBlock>{`[identity]
name     = ${IDENTITY.name}
location = ${IDENTITY.location}
timezone = Europe/Oslo (UTC+1)

[network]
mail     = ${IDENTITY.email}
github   = ${IDENTITY.github}
matrix   = ${IDENTITY.matrix}

[crypto]
gpg      = ${IDENTITY.gpg}`}</CodeBlock>
        <div className="btn-row">
          <a className="btn-primary" href={`mailto:${IDENTITY.email}`}>Send e-post →</a>
          <a className="btn-secondary" href={`https://github.com/${IDENTITY.github.replace('@', '')}`} target="_blank" rel="noreferrer">GitHub →</a>
        </div>
      </Window>
    </>
  );
}

// ── /projects/ + /projects/<id>.md ─────────────────────────────────────────
export function PageProjectsIndex() {
  return (
    <>
      <div className="page-head">
        <h1>projects/</h1>
        <span className="meta">{PROJECTS.length} entries</span>
      </div>
      <div className="proj-list">
        {PROJECTS.map((p) => (
          <Card key={p.id} title={p.name.toUpperCase()} mode="left">
            <div className="tag-row" style={{ marginBottom: '0.5rem' }}>
              <Badge>{p.year}</Badge>
              <Badge>{p.status}</Badge>
            </div>
            <Text style={{ opacity: 0.75 }}>{p.stack}</Text>
            <Text style={{ marginTop: '0.5rem' }}>{p.note}</Text>
            <div className="btn-row">
              <a className="btn-secondary" href={`#/projects/${p.id}.md`}>Les mer →</a>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export function PageProjectDetail({ id }: { id: string }) {
  const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];
  return (
    <>
      <BreadCrumbs items={[
        { name: '~', url: '#/' },
        { name: 'projects', url: '#/projects/' },
        { name: `${p.id}.md`, url: `#/projects/${p.id}.md` },
      ]} />

      <div className="page-head">
        <h1>{p.name}</h1>
        <span className="meta">{p.year} · {p.stack}</span>
      </div>

      <Window>
        <div className="tag-row" style={{ marginBottom: '0.75rem' }}>
          <Badge>{p.status}</Badge>
          {p.links.live && <Badge>LIVE</Badge>}
          <Badge>{p.year}</Badge>
        </div>
        <Text>{p.body}</Text>
      </Window>

      <Card title="ARKITEKTUR" mode="left">
        <CodeBlock>{p.arch}</CodeBlock>
      </Card>

      <Card title="LÆRINGER" mode="left">
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {p.learnings.map((l, i) => (
            <li key={i} style={{ display: 'flex', gap: '1ch', marginBottom: '0.25rem' }}>
              <span className="bullet">▪</span><span>{l}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="LENKER" mode="left">
        <div className="btn-row" style={{ marginTop: 0 }}>
          {p.links.live && <a className="btn-primary" href={p.links.live} target="_blank" rel="noreferrer">Live →</a>}
          {p.links.repo && <a className="btn-secondary" href={p.links.repo} target="_blank" rel="noreferrer">Source →</a>}
          <a className="btn-secondary" href="#/projects/">← Alle prosjekter</a>
        </div>
      </Card>
    </>
  );
}

// ── /writing/ + /writing/<slug>.md ─────────────────────────────────────────
export function PageWritingIndex() {
  return (
    <>
      <div className="page-head">
        <h1>writing/</h1>
        <span className="meta">{WRITING.length} posts · sortert sist først</span>
      </div>

      <Window>
        <Text style={{ opacity: 0.7, marginBottom: '1rem' }}>
          Notater og småtekster — ofte uferdige. RSS er på vei.
        </Text>
        <div>
          {WRITING.map((w) => (
            <div key={w.slug} style={{ marginBottom: '0.5rem' }}>
              <ActionListItem icon=">" href={`#/writing/${w.slug}.md`}>
                <span style={{ display: 'flex', gap: '1ch', flexWrap: 'wrap', alignItems: 'baseline', width: '100%' }}>
                  <span style={{ opacity: 0.6, width: '11ch', flex: '0 0 auto' }}>{w.date}</span>
                  <span style={{ flex: '1 1 auto' }}>{w.title}</span>
                  <Badge>{w.tag}</Badge>
                </span>
              </ActionListItem>
              <Text style={{ paddingLeft: '4ch', opacity: 0.7, marginTop: '0.25rem', marginBottom: '0.5rem' }}>{w.lede}</Text>
            </div>
          ))}
        </div>
      </Window>
    </>
  );
}

export function PageWritingDetail({ slug }: { slug: string }) {
  const w = WRITING.find((x) => x.slug === slug) || WRITING[0];
  return (
    <>
      <BreadCrumbs items={[
        { name: '~', url: '#/' },
        { name: 'writing', url: '#/writing/' },
        { name: `${w.slug}.md`, url: `#/writing/${w.slug}.md` },
      ]} />

      <div className="page-head">
        <h1>{w.title}</h1>
        <span className="meta">{w.date} · ~6 min</span>
      </div>

      <Window>
        <div className="tag-row" style={{ marginBottom: '0.75rem' }}>
          <Badge>{w.tag}</Badge>
          <Badge>NO</Badge>
        </div>
        <Text style={{ opacity: 0.8 }}>{w.lede}</Text>
        <div style={{ marginTop: '1rem' }}><Divider /></div>
        <Text style={{ marginTop: '0.75rem' }}>
          Lorem ipsum dolor sit norsk. Dette er en plassholder for blogposten — den ekte teksten
          erstattes når jeg får skrevet den ferdig. Forventet er kodeblokker, sitater,
          screenshot-er og en lenke til repoen på slutten.
        </Text>
        <div style={{ marginTop: '1rem' }}>
          <CodeBlock>{`# /etc/nginx/sites-enabled/eriksen.dev
server {
  listen 443 ssl http2;
  server_name eriksen.dev;
  root /var/www/eriksen;
}`}</CodeBlock>
        </div>
        <div className="quote" style={{ marginTop: '1rem' }}>
          «Det enkleste systemet som virker er ofte det riktige systemet.»<br />
          <span style={{ opacity: 0.6 }}>— notat til meg selv</span>
        </div>
      </Window>

      <Card title="NESTE / FORRIGE" mode="left">
        <div className="btn-row" style={{ marginTop: 0 }}>
          <a className="btn-secondary" href="#/writing/">← writing/</a>
        </div>
      </Card>
    </>
  );
}

// ── 404 ───────────────────────────────────────────────────────────────────
export function Page404({ path }: { path: string }) {
  return (
    <Window>
      <Text>cat: {path}: No such file or directory.</Text>
      <div style={{ height: '0.75rem' }} />
      <Text style={{ opacity: 0.6 }}>
        Prøv <a href="#/">~/readme.md</a>, eller bruk sidepanelet.
      </Text>
    </Window>
  );
}
