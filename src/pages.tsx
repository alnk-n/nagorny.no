// pages.tsx — page bodies for every route. One file because the site is small
// and a flat layout is easier to navigate than ten one-page files.

import { useState, useEffect } from "react";

import {
  CERTS,
  ContentBlock,
  GOALS,
  IDENTITY,
  NOW,
  PROJECTS,
  RESUME,
  SKILLS,
  WRITING,
} from "./data";

import Accordion from "./components/srcl/Accordion";
import ActionBar from "./components/srcl/ActionBar";
import Badge from "./components/srcl/Badge";
import BreadCrumbs from "./components/srcl/BreadCrumbs";
import Card from "./components/srcl/Card";
import CodeBlock from "./components/srcl/CodeBlock";
import Divider from "./components/srcl/Divider";
import Text from "./components/srcl/Text";
import Window from "./components/srcl/Window";
import ActionListItem from "./components/srcl/ActionListItem";

const ASCII_HERO = String.raw`
  _   ________   __ ______  __  _____  ________  __
 | | / / __/ /  / //_/ __ \/  |/  /  |/  / __/ |/ /
 | |/ / _// /__/ ,< / /_/ / /|_/ / /|_/ / _//    / 
 |___/___/____/_/|_|\____/_/  /_/_/  /_/___/_/|_/  
                                                   
   Alan Krystian Nagorny ▹ VG2 IT ▹ Tiller VGS, NO
`;

function useClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── /readme.md ────────────────────────────────────────────────────────────
export function PageReadme() {
  const time = useClock();
  return (
    <>
      <div className="page-head">
        <h1>readme.md</h1>
        <span className="meta">root · {time} · 2.7kb</span>
      </div>

      <pre className="hero-ascii">{ASCII_HERO}</pre>

      <Window>
        <Text>
          Hei! Velkommen til hjemmesiden min.
          <br />
          Denne siden brukes som en portfolio og blogg.
          <br />
          <br />
          For å navigere, klikk på en fil i sidemenyen, eller bruk piltastene.
          <br />
          På mobil: trykk «MENU» øverst.
        </Text>
        <Text style={{ marginTop: "1rem" }}>
          Bygget med{" "}
          <a
            href="https://www.sacred.computer/"
            target="_blank"
            rel="noreferrer"
          >
            SRCL:
          </a>{" "}
          et open-source React-bibliotek.
        </Text>
      </Window>

      <Card title="ANBEFALT STARTPUNKT" mode="left">
        <Text>
          Begynn med <a href="#/about.md">about.md</a> hvis du vil vite hvem jeg
          er, eller <a href="#/projects/">projects/</a> hvis du heller vil se
          hva jeg holder på med i fritiden min.
        </Text>
        <div className="btn-row">
          <a className="btn-primary" href="#/about.md">
            About →
          </a>
          <a className="btn-secondary" href="#/projects/">
            Projects →
          </a>
          <a className="btn-secondary" href="#/writing/">
            Writing →
          </a>
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
        <span className="meta">last edit · 2026-05-24 · 1.84kb</span>
      </div>

      <Window>
        <Text>
          Jeg heter <b>{IDENTITY.name}</b>. 17 år, avgangselev på VG2 IT ved
          Tiller VGS.
        </Text>
        <Text style={{ marginTop: "1rem" }}>
          På fritiden skrur jeg på datautstyr, lodder, og eksperimenterer med
          programvare. Operativsystemer (hovedsakelig Linux) og nettverk er
          særlig interesserende.
        </Text>
        <Text style={{ marginTop: "1rem", opacity: 0.75 }}>
          {IDENTITY.available} · Snakker norsk, engelsk og polsk.
        </Text>
      </Window>

      <Card title="STACK" mode="left">
        {SKILLS.map((g) => (
          <div key={g.group} style={{ marginBottom: "0.5rem" }}>
            <div style={{ opacity: 0.7, textTransform: "uppercase" }}>
              {g.group}
            </div>
            <div className="tag-row">
              {g.items.map((it) => (
                <Badge key={it}>{it}</Badge>
              ))}
            </div>
          </div>
        ))}
      </Card>

      <Card title="CERTS" mode="left">
        <div className="tag-row">
          {CERTS.flatMap((g) => g.items).map((it) => (
            <Badge key={it}>{it}</Badge>
          ))}
        </div>
      </Card>

      <Card title="MÅL FOR 2026" mode="left">
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {GOALS.map((g) => (
            <li key={g.text} style={{ display: "flex", gap: "1ch" }}>
              <span className="bullet">▪</span>
              <span>{g.text}</span>
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
        <span className="meta">tail · live · 2026-05-24</span>
      </div>
      <Window>
        <Text style={{ opacity: 0.7, marginBottom: "1rem" }}>
          # «
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noreferrer"
          >
            /now
          </a>
          »-side. Hva jeg jobber med akkurat nå.
        </Text>
        {NOW.map((n) => (
          <Text key={n.text} style={{ marginBottom: "0.5rem" }}>
            <span style={{ opacity: 0.6 }}>·</span> {n.text}
          </Text>
        ))}
        <div style={{ marginTop: "1rem" }}>
          <Divider />
        </div>
        <Text style={{ marginTop: "0.75rem", opacity: 0.6 }}>
          sist oppdatert 2026-05-24
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
        <span className="meta">view · 1.18kb</span>
      </div>

      <Card title="ERFARING" mode="left">
        <div className="resume-list">
          {RESUME.map((r, i) => (
            <div key={i} className="resume-entry">
              <span className="k">{r.period}</span>
              <span>{r.what}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="UTDANNING" mode="left">
        <div className="resume-list">
          <div className="resume-entry">
            <span className="k">2024-nå</span>
            <span>Tiller VGS · IT VG2 · IT &amp; medieproduksjon VG1.</span>
          </div>
          <div className="resume-entry">
            <span className="k">2021-2024</span>
            <span>Sverresborg ungdomsskole.</span>
          </div>
        </div>
      </Card>

      <Card title="REFERANSER" mode="left">
        <Text style={{ opacity: 0.7 }}>
          Tilgjengelig på forespørsel - kontakt via e-post.
        </Text>
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
        <span className="meta">cleartext · 917b</span>
      </div>
      <Window>
        <CodeBlock>
          {`[identity]
name     = ${IDENTITY.name}
location = ${IDENTITY.location}
timezone = Europe/Oslo (UTC+1)

[network]
mail     = ${IDENTITY.email}
github   = ${IDENTITY.github}`}
        </CodeBlock>
        <div className="btn-row">
          <a className="btn-primary" href={`mailto:${IDENTITY.email}`}>
            Send e-post →
          </a>
          <a
            className="btn-secondary"
            href={`https://github.com/${IDENTITY.github.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
          >
            GitHub →
          </a>
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
            <div className="tag-row" style={{ marginBottom: "0.5rem" }}>
              <Badge>{p.year}</Badge>
              <Badge>{p.status}</Badge>
            </div>
            <Text style={{ opacity: 0.75 }}>{p.stack}</Text>
            <Text style={{ marginTop: "0.5rem" }}>{p.note}</Text>
            <div className="btn-row">
              <a className="btn-secondary" href={`#/projects/${p.id}.md`}>
                Les mer →
              </a>
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
      <BreadCrumbs
        items={[
          { name: "~", url: "#/" },
          { name: "projects", url: "#/projects/" },
          { name: `${p.id}.md`, url: `#/projects/${p.id}.md` },
        ]}
      />

      <div className="page-head">
        <h1>{p.name}</h1>
        <span className="meta">
          {p.year} · {p.stack}
        </span>
      </div>

      <Window>
        <div className="tag-row" style={{ marginBottom: "0.75rem" }}>
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
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {p.learnings.map((l, i) => (
            <li
              key={i}
              style={{ display: "flex", gap: "1ch", marginBottom: "0.25rem" }}
            >
              <span className="bullet">▪</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="LENKER" mode="left">
        <div className="btn-row" style={{ marginTop: 0 }}>
          {p.links.live && (
            <a
              className="btn-primary"
              href={p.links.live}
              target="_blank"
              rel="noreferrer"
            >
              Live →
            </a>
          )}
          {p.links.repo && (
            <a
              className="btn-secondary"
              href={p.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Source →
            </a>
          )}
          <a className="btn-secondary" href="#/projects/">
            ← Alle prosjekter
          </a>
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
        <span className="meta">
          {WRITING.length} posts · sortert sist først
        </span>
      </div>

      <Window>
        <Text style={{ opacity: 0.7, marginBottom: "1rem" }}>
          Ofte uferdige notater og småtekster.
        </Text>
        <div>
          {WRITING.map((w) => (
            <div key={w.slug} style={{ marginBottom: "0.5rem" }}>
              <ActionListItem icon=">" href={`#/writing/${w.slug}.md`}>
                <span
                  style={{
                    display: "flex",
                    gap: "1ch",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                    width: "100%",
                  }}
                >
                  <span
                    style={{ opacity: 0.6, width: "11ch", flex: "0 0 auto" }}
                  >
                    {w.date}
                  </span>
                  <span style={{ flex: "1 1 auto" }}>{w.title}</span>
                  <Badge>{w.tag}</Badge>
                </span>
              </ActionListItem>
              <Text
                style={{
                  paddingLeft: "4ch",
                  opacity: 0.7,
                  marginTop: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              >
                {w.lede}
              </Text>
            </div>
          ))}
        </div>
      </Window>
    </>
  );
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "text":
      return (
        <Text key={i} style={{ marginTop: "0.75rem" }}>
          {block.content}
        </Text>
      );
    case "code":
      return (
        <div key={i} style={{ marginTop: "1rem" }}>
          <CodeBlock>{block.content}</CodeBlock>
        </div>
      );
    case "image":
      return (
        <div key={i} style={{ marginTop: "1rem" }}>
          <img
            src={block.src}
            alt={block.alt ?? ""}
            style={{ maxWidth: "100%", display: "block" }}
          />
          {block.caption && (
            <Text style={{ opacity: 0.6, marginTop: "0.25rem", fontSize: "0.85em" }}>
              {block.caption}
            </Text>
          )}
        </div>
      );
    case "quote":
      return (
        <div key={i} className="quote" style={{ marginTop: "1rem" }}>
          «{block.content}»
          {block.attribution && (
            <>
              <br />
              <span style={{ opacity: 0.6 }}>— {block.attribution}</span>
            </>
          )}
        </div>
      );
    case "divider":
      return (
        <div key={i} style={{ marginTop: "1rem" }}>
          <Divider />
        </div>
      );
  }
}

export function PageWritingDetail({ slug }: { slug: string }) {
  const w = WRITING.find((x) => x.slug === slug) || WRITING[0];
  const readTime = w.readTime ? `~${w.readTime} min` : "draft";
  return (
    <>
      <BreadCrumbs
        items={[
          { name: "~", url: "#/" },
          { name: "writing", url: "#/writing/" },
          { name: `${w.slug}.md`, url: `#/writing/${w.slug}.md` },
        ]}
      />

      <div className="page-head">
        <h1>{w.title}</h1>
        <span className="meta">{w.date} · {readTime}</span>
      </div>

      <Window>
        <div className="tag-row" style={{ marginBottom: "0.75rem" }}>
          <Badge>{w.tag}</Badge>
          <Badge>NO</Badge>
        </div>
        <Text style={{ opacity: 0.8 }}>{w.lede}</Text>
        <div style={{ marginTop: "1rem" }}>
          <Divider />
        </div>
        {w.body && w.body.length > 0 ? (
          w.body.map((block, i) => renderBlock(block, i))
        ) : (
          <Text style={{ marginTop: "0.75rem", opacity: 0.5 }}>
            Ikke ferdig skrevet ennå.
          </Text>
        )}
      </Window>

      <Card title="NESTE / FORRIGE" mode="left">
        <div className="btn-row" style={{ marginTop: 0 }}>
          <a className="btn-secondary" href="#/writing/">
            ← writing/
          </a>
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
      <div style={{ height: "0.75rem" }} />
      <Text style={{ opacity: 0.6 }}>
        Prøv <a href="#/">~/readme.md</a>, eller bruk sidepanelet.
      </Text>
    </Window>
  );
}
