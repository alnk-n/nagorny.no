// pages.tsx — page bodies for every route. One file because the site is small
// and a flat layout is easier to navigate than ten one-page files.

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { Locale, useLocale, useT } from "./locale";

import Badge from "./components/srcl/Badge";
import BreadCrumbs from "./components/srcl/BreadCrumbs";
import Card from "./components/srcl/Card";
import CardDouble from "./components/srcl/CardDouble";
import CodeBlock from "./components/srcl/CodeBlock";
import Divider from "./components/srcl/Divider";
import SimpleTable from "./components/srcl/SimpleTable";
import Text from "./components/srcl/Text";
import Window from "./components/srcl/Window";
import ActionListItem from "./components/srcl/ActionListItem";
import Accordion from "./components/srcl/Accordion";

// Pick the localized version of a value; fall back to `no` when `en` is absent.
function loc<T>(locale: Locale, no: T, en: T | undefined): T {
  return locale === "en" && en !== undefined ? en : no;
}

const ASCII_HERO = String.raw`
  _   ________   __ ______  __  _____  ________  __
 | | / / __/ /  / //_/ __ \/  |/  /  |/  / __/ |/ /
 | |/ / _// /__/ ,< / /_/ / /|_/ / /|_/ / _//    /
 |___/___/____/_/|_|\____/_/  /_/_/  /_/___/_/|_/

   Alan Krystian Nagorny ▹ VG2 IT ▹ Tiller VGS, NO
`;

// Replace with your English ASCII art
const ASCII_HERO_EN = String.raw`
  _      __    __                  
 | | /| / /__ / /______  __ _  ___ 
 | |/ |/ / -_) / __/ _ \/  ' \/ -_)
 |__/|__/\__/_/\__/\___/_/_/_/\__/ 
 
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

const SCRAMBLE_CHARS = "|\\/-_+#!*▒░█";

function scramble(target: string, revealFraction: number): string {
  let printable = 0;
  const total = [...target].filter((c) => c !== "\n" && c !== " ").length;
  const revealUpTo = Math.floor(total * revealFraction);
  return [...target]
    .map((c) => {
      if (c === "\n" || c === " ") return c;
      return ++printable <= revealUpTo
        ? c
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

function useScramble(target: string, duration = 900): string {
  const [text, setText] = useState(() => scramble(target, 0));
  const rafRef = useRef<number>(0);
  useEffect(() => {
    let start: number | null = null;
    function tick(now: number) {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setText(progress < 1 ? scramble(target, progress) : target);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return text;
}

// ── /readme.md ────────────────────────────────────────────────────────────
export function PageReadme() {
  const time = useClock();
  const { locale } = useLocale();
  const hero = useScramble(locale === "en" ? ASCII_HERO_EN : ASCII_HERO);
  const t = useT();
  const aboutLink =
    locale === "no"
      ? "hvis du vil vite hvem jeg er, eller"
      : "if you want to know who I am, or";
  const projectsLink =
    locale === "no"
      ? "hvis du heller vil se hva jeg holder på med i fritiden min."
      : "to see what I do in my free time.";
  return (
    <>
      <div className="page-head">
        <h1>readme.md</h1>
        <span className="meta">root · {time} · 2.7kb</span>
      </div>

      <pre className="hero-ascii">{hero}</pre>

      <Window>
        <Text>
          {t.readme_welcome}
          <br />
          {t.readme_portfolio}
          <br />
          <br />
          {t.readme_localization}
          <br />
          <br />
          {t.readme_nav}
          <br />
          {t.readme_mobile}
        </Text>
        <Text style={{ marginTop: "1rem" }}>
          {t.readme_built_with}{" "}
          <a
            href="https://www.sacred.computer/"
            target="_blank"
            rel="noreferrer"
          >
            SRCL:
          </a>{" "}
          {t.readme_built_lib}
        </Text>
      </Window>

      <Card title={t.readme_start_card} mode="left">
        <Text>
          {t.readme_start_text} <Link to="/about.md">about.md</Link> {aboutLink}{" "}
          <Link to="/projects/">projects/</Link> {projectsLink}
        </Text>
        <div className="btn-row">
          <Link className="btn-primary" to="/about.md">
            About →
          </Link>
          <Link className="btn-secondary" to="/projects/">
            Projects →
          </Link>
          <Link className="btn-secondary" to="/writing/">
            Writing →
          </Link>
        </div>
      </Card>
    </>
  );
}

// ── /about.md ─────────────────────────────────────────────────────────────
export function PageAbout() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <>
      <div className="page-head">
        <h1>about.md</h1>
        <span className="meta">last edit · 2026-05-24 · 1.84kb</span>
      </div>

      <Window>
        <Text>
          <b>{IDENTITY.name}</b>. {t.about_bio}
        </Text>
        <Text style={{ marginTop: "1rem" }}>{t.about_hobbies}</Text>
        <Text style={{ marginTop: "1rem", opacity: 0.75 }}>
          {loc(locale, IDENTITY.available, IDENTITY.available_en)} ·{" "}
          {t.about_availability}
        </Text>
      </Window>

      <Card title="STACK" mode="left">
        {SKILLS.map((g) => (
          <div key={g.group} style={{ marginBottom: "0.5rem" }}>
            <div style={{ opacity: 0.7, textTransform: "uppercase" }}>
              {loc(locale, g.group, g.group_en)}
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

      <Card title={t.about_goals_card} mode="left">
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {GOALS.map((g) => (
            <li
              key={g.text}
              style={{ display: "flex", gap: "1ch", alignItems: "baseline" }}
            >
              <span className="bullet">▪</span>
              <span>
                {loc(locale, g.text, g.text_en)}
                {locale === "en" && !g.text_en && (
                  <Badge style={{ fontSize: "0.75em", marginLeft: "0.5ch" }}>
                    (NO)
                  </Badge>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

// ── /now.log ──────────────────────────────────────────────────────────────
export function PageNow() {
  const t = useT();
  const { locale } = useLocale();
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
          »-{t.now_description}
        </Text>
        {NOW.map((n) => (
          <Text key={n.text} style={{ marginBottom: "0.5rem" }}>
            <span style={{ opacity: 0.6 }}>·</span>{" "}
            {loc(locale, n.text, n.text_en)}
            {locale === "en" && !n.text_en && (
              <Badge style={{ fontSize: "0.75em", marginLeft: "0.5ch" }}>
                (NO)
              </Badge>
            )}
          </Text>
        ))}
        <div style={{ marginTop: "1rem" }}>
          <Divider />
        </div>
        <Text style={{ marginTop: "0.75rem", opacity: 0.6 }}>
          {t.now_updated}
        </Text>
      </Window>
    </>
  );
}

// ── /resume.txt ───────────────────────────────────────────────────────────
export function PageResume() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <>
      <div className="page-head">
        <h1>resume.txt</h1>
        <span className="meta">view · 1.18kb</span>
      </div>

      <Card title={t.resume_experience} mode="left">
        <div className="resume-list">
          {RESUME.map((r, i) => (
            <div key={i} className="resume-entry">
              <span className="k">{loc(locale, r.period, r.period_en)}</span>
              <span>{loc(locale, r.what, r.what_en)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title={t.resume_education} mode="left">
        <div className="resume-list">
          <div className="resume-entry">
            <span className="k">{t.resume_edu1_period}</span>
            <span>{t.resume_edu1_text}</span>
          </div>
          <div className="resume-entry">
            <span className="k">{t.resume_edu2_period}</span>
            <span>{t.resume_edu2_text}</span>
          </div>
        </div>
      </Card>

      <Card title={t.resume_references} mode="left">
        <Text style={{ opacity: 0.7 }}>{t.resume_refs_text}</Text>
      </Card>
    </>
  );
}

// ── /contact.conf ─────────────────────────────────────────────────────────
export function PageContact() {
  const t = useT();
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
            {t.contact_send_email}
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
  const { locale } = useLocale();
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
            <Text style={{ marginTop: "0.5rem" }}>
              {loc(locale, p.note, p.note_en)}
            </Text>
            <div className="btn-row">
              <Link className="btn-secondary" to={`/projects/${p.id}.md`}>
                Les mer →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export function PageProjectDetail({ id }: { id: string }) {
  const navigate = useNavigate();
  const t = useT();
  const { locale } = useLocale();
  const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];
  const langMismatch = p.lang && p.lang !== locale;
  return (
    <>
      <BreadCrumbs
        items={[
          {
            name: "~",
            url: "/",
            onClick: (e) => {
              e.preventDefault();
              navigate("/");
            },
          },
          {
            name: "projects",
            url: "/projects/",
            onClick: (e) => {
              e.preventDefault();
              navigate("/projects/");
            },
          },
          { name: `${p.id}.md`, url: `/projects/${p.id}.md` },
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
          {langMismatch && (
            <Badge>{p.lang === "no" ? t.lang_no_only : t.lang_en_only}</Badge>
          )}
        </div>
        {(() => {
          const body = loc(locale, p.body, p.body_en);
          return body && body.length > 0
            ? body.map((block, i) => renderBlock(block, i))
            : null;
        })()}
      </Window>

      <Card title={t.project_arch} mode="left">
        <CodeBlock>{p.arch}</CodeBlock>
      </Card>

      <Card title={t.project_learnings} mode="left">
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {loc(locale, p.learnings, p.learnings_en).map((l, i) => (
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

      <Card title={t.project_links} mode="left">
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
          <Link className="btn-secondary" to="/projects/">
            ← Alle prosjekter
          </Link>
        </div>
      </Card>
    </>
  );
}

// ── /writing/ + /writing/<slug>.md ─────────────────────────────────────────
export function PageWritingIndex() {
  const navigate = useNavigate();
  const t = useT();
  const { locale } = useLocale();
  return (
    <>
      <div className="page-head">
        <h1>writing/</h1>
        <span className="meta">
          {WRITING.length} posts · {t.writing_meta_suffix}
        </span>
      </div>

      <Window>
        <Text style={{ opacity: 0.7, marginBottom: "1rem" }}>
          {t.writing_lede}
        </Text>
        <div>
          {WRITING.map((w) => (
            <div key={w.slug} style={{ marginBottom: "0.5rem" }}>
              <ActionListItem
                icon=">"
                onClick={() => navigate(`/writing/${w.slug}.md`)}
              >
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
                  <span style={{ flex: "1 1 auto" }}>
                    {loc(locale, w.title, w.title_en)}
                  </span>
                  {w.tags.map((t) => (
                    <Badge
                      key={t}
                      style={{ background: "var(--theme-background)" }}
                    >
                      {t}
                    </Badge>
                  ))}
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
                {loc(locale, w.lede, w.lede_en)}
              </Text>
            </div>
          ))}
        </div>
      </Window>
    </>
  );
}

function renderInline(content: string, html?: boolean) {
  if (html) return <span dangerouslySetInnerHTML={{ __html: content }} />;
  return <>{content}</>;
}

function AsciiArt({ content, caption }: { content: string; caption?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pre = preRef.current;
    if (!container || !pre) return;

    const fit = () => {
      pre.style.fontSize = "1rem";
      const naturalWidth = pre.scrollWidth;
      const available = container.clientWidth;
      if (naturalWidth > 0) {
        const basePx = parseFloat(getComputedStyle(pre).fontSize);
        pre.style.fontSize = `${basePx * ((available * 0.6) / naturalWidth)}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    return () => ro.disconnect();
  }, [content]);

  return (
    <div ref={containerRef} style={{ marginTop: "1rem" }}>
      <pre ref={preRef} className="ascii-art">
        {content}
      </pre>
      {caption && (
        <Text style={{ marginTop: "0.5rem", opacity: 0.6 }}>{caption}</Text>
      )}
    </div>
  );
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "text":
      if (block.html) {
        return (
          <Text
            key={i}
            style={{ marginTop: "0.75rem" }}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      }
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
            className="article-img"
          />
          {block.caption && (
            <Text
              style={{ opacity: 0.6, marginTop: "0.25rem", fontSize: "0.85em" }}
            >
              {block.caption}
            </Text>
          )}
        </div>
      );
    case "quote":
      return (
        <div key={i} className="quote" style={{ marginTop: "1rem" }}>
          «{renderInline(block.content)}»
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
    case "heading": {
      const Tag = `h${block.level}` as "h2" | "h3" | "h4";
      return (
        <Tag
          key={i}
          className={`article-heading article-heading-${block.level}`}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );
    }
    case "list":
      return block.ordered ? (
        <ol key={i} className="article-list">
          {block.items.map((item, j) =>
            block.html ? (
              <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
            ) : (
              <li key={j}>{item}</li>
            ),
          )}
        </ol>
      ) : (
        <ul key={i} className="article-list">
          {block.items.map((item, j) =>
            block.html ? (
              <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
            ) : (
              <li key={j}>{item}</li>
            ),
          )}
        </ul>
      );
    case "table":
      return (
        <div key={i} style={{ marginTop: "1rem" }}>
          <SimpleTable data={block.data} />
        </div>
      );
    case "callout":
      return (
        <div key={i} style={{ marginTop: "1rem" }}>
          <CardDouble title={block.title ?? "note"} mode="left">
            {block.html ? (
              <Text dangerouslySetInnerHTML={{ __html: block.content }} />
            ) : (
              <Text>{block.content}</Text>
            )}
          </CardDouble>
        </div>
      );
    case "details":
      return (
        <div key={i} style={{ marginTop: "1rem" }}>
          <Accordion title={block.summary}>
            {block.html ? (
              <Text
                style={{ marginTop: "0.5rem" }}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            ) : (
              <Text style={{ marginTop: "0.5rem" }}>{block.content}</Text>
            )}
          </Accordion>
        </div>
      );
    case "ascii":
      return (
        <AsciiArt key={i} content={block.content} caption={block.caption} />
      );
  }
}

export function PageWritingDetail({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const t = useT();
  const { locale } = useLocale();
  const w = WRITING.find((x) => x.slug === slug) || WRITING[0];
  const readTime = w.readTime ? `~${w.readTime} min` : "draft";
  const langMismatch = w.lang && w.lang !== locale;
  const body = loc(locale, w.body, w.body_en);
  return (
    <>
      <BreadCrumbs
        items={[
          {
            name: "~",
            url: "/",
            onClick: (e) => {
              e.preventDefault();
              navigate("/");
            },
          },
          {
            name: "writing",
            url: "/writing/",
            onClick: (e) => {
              e.preventDefault();
              navigate("/writing/");
            },
          },
          { name: `${w.slug}.md`, url: `/writing/${w.slug}.md` },
        ]}
      />

      <div className="page-head">
        <h1>{loc(locale, w.title, w.title_en)}</h1>
        <span className="meta">
          {w.date} · {readTime}
        </span>
      </div>

      <Window>
        <div className="tag-row" style={{ marginBottom: "0.75rem" }}>
          {w.tags.map((tag) => (
            <Badge key={tag} style={{ background: "var(--theme-background)" }}>
              {tag}
            </Badge>
          ))}
          {langMismatch && (
            <Badge>{w.lang === "no" ? t.lang_no_only : t.lang_en_only}</Badge>
          )}
        </div>
        <Text style={{ opacity: 0.8 }}>{loc(locale, w.lede, w.lede_en)}</Text>
        <div style={{ marginTop: "1rem" }}>
          <Divider />
        </div>
        {body && body.length > 0 ? (
          body.map((block, i) => renderBlock(block, i))
        ) : (
          <Text style={{ marginTop: "0.75rem", opacity: 0.5 }}>
            {t.writing_empty}
          </Text>
        )}
      </Window>

      <Card title={t.writing_nav_card} mode="left">
        <div className="btn-row" style={{ marginTop: 0 }}>
          <Link className="btn-secondary" to="/writing/">
            ← writing/
          </Link>
        </div>
      </Card>
    </>
  );
}

// ── 404 ───────────────────────────────────────────────────────────────────
export function Page404({ path }: { path: string }) {
  const t = useT();
  return (
    <Window>
      <Text>cat: {path}: No such file or directory.</Text>
      <div style={{ height: "0.75rem" }} />
      <Text style={{ opacity: 0.6 }}>
        {t.page404_hint.split("~/readme.md").map((part, i) =>
          i === 0 ? (
            part
          ) : (
            <>
              <Link to="/">~/readme.md</Link>
              {part}
            </>
          ),
        )}
      </Text>
    </Window>
  );
}
