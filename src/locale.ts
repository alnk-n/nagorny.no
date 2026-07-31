import * as React from "react";

export type Locale = "no" | "en";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

export const LocaleContext = React.createContext<LocaleCtx>({
  locale: "no",
  setLocale: () => {},
});

export const useLocale = () => React.useContext(LocaleContext);
export const useT = () => UI[React.useContext(LocaleContext).locale];

// Picks the localized value of a bilingual content field (see src/data.ts),
// falling back to `no` when `en` is absent (content may only be authored in
// Norwegian). Unlike the UI catalog below, `en` here is optional per-field.
export function loc<T>(locale: Locale, no: T, en: T | undefined): T {
  return locale === "en" && en !== undefined ? en : no;
}

// ---------------------------------------------------------------------------
// UI string catalog. All translatable non-button, non-identity, non-tree-view
// strings on the site. Both locales must have identical keys (enforced by type).
//
// This is one of two bilingual conventions in the codebase, and deliberately
// stricter than the other:
//   - UI chrome text (labels, headings, aria-labels, tooltips) lives here and
//     is REQUIRED in both locales.
//   - Bilingual content data (goals, now, projects, writing, resume, skills)
//     uses optional `_en`-suffixed sibling fields instead,
//     resolved with `loc()` above, because that content is loaded from JSON/
//     Markdown and sometimes only exists in Norwegian (a "(NO)" badge covers
//     the gap). Don't blend the two: chrome text must never fall back silently.
//
// Proper nouns and brand terms (e.g. "SRCL", "GitHub") are exempt from
// translation by design and are left as plain string literals at their call
// sites rather than catalog entries.
// ---------------------------------------------------------------------------

type UIStrings = {
  // Sidebar
  sidebar_hint: string;
  sidebar_file_tree_heading: string;
  sidebar_shortcuts_heading: string;
  sidebar_close_menu_aria: string;
  sidebar_shortcut_mail: string;
  sidebar_shortcut_resume: string;
  sidebar_shortcut_now: string;

  // TopBar
  topbar_open_menu_aria: string;
  topbar_cycle_tint_title: string;
  topbar_switch_to_en_aria: string;
  topbar_switch_to_no_aria: string;
  topbar_toggle_theme_title: string;

  // PageReadme
  readme_welcome: string;
  readme_portfolio: string;
  readme_localization: React.ReactNode;
  readme_nav: string;
  readme_mobile: string;
  readme_built_with: string;
  readme_built_lib: string;
  readme_start_card: string;
  readme_start_text: string;
  readme_link_about: string;
  readme_link_projects: string;
  readme_btn_about: string;
  readme_btn_projects: string;
  readme_btn_writing: string;

  // PageAbout
  about_bio: string;
  about_hobbies: string;
  about_availability: string;
  about_goals_card: string;
  about_stack_card: string;
  about_certs_card: string;
  about_last_edit_prefix: string;

  // PageNow
  now_description: string;
  now_updated_prefix: string;

  // PageResume
  resume_experience: string;
  resume_education: string;
  resume_references: string;
  resume_edu1_period: string;
  resume_edu1_text: string;
  resume_edu2_period: string;
  resume_edu2_text: string;
  resume_refs_text: string;

  // PageProjectsIndex + PageProjectDetail
  project_arch: string;
  project_learnings: string;
  project_links: string;
  project_read_more: string;
  project_back_to_list: string;

  // PageWritingIndex
  writing_meta_suffix: string;
  writing_lede: string;

  // PageWritingDetail
  writing_empty: string;
  writing_nav_card: string;

  // Language-only warnings (shown when post/project only exists in one language)
  lang_no_only: string;
  lang_en_only: string;

  // PageContact
  contact_send_email: string;

  // Page 404
  page404_hint: string;
};

const UI: Record<Locale, UIStrings> = {
  no: {
    sidebar_hint: "Tastatur: ↑/↓ eller J/K for å bla mellom filer",
    sidebar_file_tree_heading: "· filer",
    sidebar_shortcuts_heading: "· snarveier",
    sidebar_close_menu_aria: "lukk meny",
    sidebar_shortcut_mail: "epost",
    sidebar_shortcut_resume: "cv",
    sidebar_shortcut_now: "now",

    topbar_open_menu_aria: "åpne meny",
    topbar_cycle_tint_title: "bytt fargetone",
    topbar_switch_to_en_aria: "bytt til engelsk",
    topbar_switch_to_no_aria: "bytt til norsk",
    topbar_toggle_theme_title: "bytt lyst/mørkt tema",

    readme_welcome: "Hei! Velkommen til hjemmesiden min.",
    readme_portfolio: "Denne siden brukes som en portfolio og blogg.",
    readme_localization:
      "For å endre språk, trykk på 'EN'/'NO'-knappen øverst.",
    readme_nav: "For å navigere, bruk sidemenyen, eller bruk ↑/↓ J/K.",
    readme_mobile: "På mobil: trykk «MENU» øverst.",
    readme_built_with: "Bygget med",
    readme_built_lib: "et open-source React-bibliotek.",
    readme_start_card: "ANBEFALT STARTPUNKT",
    readme_start_text: "Begynn med",
    readme_link_about: "hvis du vil vite hvem jeg er, eller",
    readme_link_projects:
      "hvis du heller vil se hva jeg holder på med i fritiden min.",
    readme_btn_about: "Om meg →",
    readme_btn_projects: "Prosjekter →",
    readme_btn_writing: "Blogg →",

    about_bio: "17 år, avgangselev på VG2 IT ved Tiller VGS.",
    about_hobbies:
      "På fritiden skrur jeg på datautstyr, lodder, og eksperimenterer med programvare. Operativsystemer (hovedsakelig Linux) og nettverk er særlig interesserende.",
    about_availability: "Snakker norsk, engelsk og polsk.",
    about_goals_card: "MÅL FOR 2026",
    about_stack_card: "FERDIGHETER",
    about_certs_card: "SERTIFISERINGER",
    about_last_edit_prefix: "sist endret",

    now_description: "side. Hva jeg jobber med akkurat nå.",
    now_updated_prefix: "sist oppdatert",

    resume_experience: "ERFARING",
    resume_education: "UTDANNING",
    resume_references: "REFERANSER",
    resume_edu1_period: "2024-nå",
    resume_edu1_text: "Tiller VGS · IT VG2 · IT & medieproduksjon VG1.",
    resume_edu2_period: "2021-2024",
    resume_edu2_text: "Sverresborg ungdomsskole.",
    resume_refs_text: "Tilgjengelig på forespørsel - kontakt via e-post.",

    project_arch: "ARKITEKTUR",
    project_learnings: "LÆRINGER",
    project_links: "LENKER",
    project_read_more: "Les mer →",
    project_back_to_list: "← Alle prosjekter",

    writing_meta_suffix: "sortert sist først",
    writing_lede: "Ofte uferdige notater og småtekster.",

    writing_empty: "Ikke ferdig skrevet ennå.",
    writing_nav_card: "NESTE / FORRIGE",

    lang_no_only: "Kun tilgjengelig på norsk",
    lang_en_only: "Kun tilgjengelig på engelsk",

    contact_send_email: "Send e-post →",

    page404_hint: "Prøv ~/readme.md, eller bruk sidepanelet.",
  },

  en: {
    sidebar_hint: "Keyboard: ↑/↓ or J/K to navigate files",
    sidebar_file_tree_heading: "· file tree",
    sidebar_shortcuts_heading: "· shortcuts",
    sidebar_close_menu_aria: "close menu",
    sidebar_shortcut_mail: "mail",
    sidebar_shortcut_resume: "resume",
    sidebar_shortcut_now: "now",

    topbar_open_menu_aria: "open menu",
    topbar_cycle_tint_title: "cycle tint",
    topbar_switch_to_en_aria: "switch to English",
    topbar_switch_to_no_aria: "switch to Norwegian",
    topbar_toggle_theme_title: "toggle light/dark theme",

    readme_welcome: "Hi! Welcome to my website.",
    readme_portfolio: "This site serves as a portfolio and blog.",
    readme_localization:
      "To switch languages, click the 'EN'/'NO' button at the top.",
    readme_nav: "To navigate, use the sidebar, or press ↑/↓ J/K.",
    readme_mobile: "On mobile: tap «MENU» at the top.",
    readme_built_with: "Built with",
    readme_built_lib: "an open-source React library.",
    readme_start_card: "GET STARTED",
    readme_start_text: "Start with",
    readme_link_about: "if you want to know who I am, or",
    readme_link_projects: "to see what I do in my free time.",
    readme_btn_about: "About →",
    readme_btn_projects: "Projects →",
    readme_btn_writing: "Blog →",

    about_bio: "17 years old, graduating IT student at Tiller VGS.",
    about_hobbies:
      "In my spare time I tinker with hardware, solder, and experiment with software. Operating systems (mainly Linux) and networking are particularly interesting to me.",
    about_availability: "Speaks Norwegian, English, and Polish.",
    about_goals_card: "GOALS FOR 2026",
    about_stack_card: "SKILLS",
    about_certs_card: "CERTIFICATIONS",
    about_last_edit_prefix: "last edit",

    now_description: "page. What I'm currently working on.",
    now_updated_prefix: "last updated",

    resume_experience: "EXPERIENCE",
    resume_education: "EDUCATION",
    resume_references: "REFERENCES",
    resume_edu1_period: "2024-present",
    resume_edu1_text:
      "Tiller VGS · IT grade 11 · IT & media production grade 10.",
    resume_edu2_period: "2021-2024",
    resume_edu2_text: "Sverresborg Lower Secondary School.",
    resume_refs_text: "Available on request — contact via email.",

    project_arch: "ARCHITECTURE",
    project_learnings: "KEY TAKEAWAYS",
    project_links: "LINKS",
    project_read_more: "Read more →",
    project_back_to_list: "← All projects",

    writing_meta_suffix: "newest first",
    writing_lede: "Often unfinished notes and short texts.",

    writing_empty: "Not written yet.",
    writing_nav_card: "NEXT / PREVIOUS",

    lang_no_only: "Only available in Norwegian",
    lang_en_only: "Only available in English",

    contact_send_email: "Send email →",

    page404_hint: "Try ~/readme.md, or use the sidebar.",
  },
};
