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

// ---------------------------------------------------------------------------
// UI string catalog — all translatable non-button, non-identity, non-tree-view
// strings on the site. Both locales must have identical keys (enforced by type).
// ---------------------------------------------------------------------------

type UIStrings = {
  // Sidebar
  sidebar_hint: string;

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

  // PageAbout
  about_bio: string;
  about_hobbies: string;
  about_availability: string;
  about_goals_card: string;

  // PageNow
  now_description: string;
  now_updated: string;

  // PageResume
  resume_experience: string;
  resume_education: string;
  resume_references: string;
  resume_edu1_period: string;
  resume_edu1_text: string;
  resume_edu2_period: string;
  resume_edu2_text: string;
  resume_refs_text: string;

  // PageProjectDetail
  project_arch: string;
  project_learnings: string;
  project_links: string;

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
    sidebar_hint: "Tastatur: ↑/↓ for å bla mellom filer",

    readme_welcome: "Hei! Velkommen til hjemmesiden min.",
    readme_portfolio: "Denne siden brukes som en portfolio og blogg.",
    readme_localization:
      "For å endre språk, trykk på 'EN'/'NO'-knappen øverst.",
    readme_nav:
      "For å navigere, klikk på en fil i sidemenyen, eller bruk piltastene.",
    readme_mobile: "På mobil: trykk «MENU» øverst.",
    readme_built_with: "Bygget med",
    readme_built_lib: "et open-source React-bibliotek.",
    readme_start_card: "ANBEFALT STARTPUNKT",
    readme_start_text: "Begynn med",

    about_bio: "17 år, avgangselev på VG2 IT ved Tiller VGS.",
    about_hobbies:
      "På fritiden skrur jeg på datautstyr, lodder, og eksperimenterer med programvare. Operativsystemer (hovedsakelig Linux) og nettverk er særlig interesserende.",
    about_availability: "Snakker norsk, engelsk og polsk.",
    about_goals_card: "MÅL FOR 2026",

    now_description: "side. Hva jeg jobber med akkurat nå.",
    now_updated: "sist oppdatert 2026-05-24",

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
    sidebar_hint: "Keyboard: ↑/↓ to navigate files",

    readme_welcome: "Hi! Welcome to my website.",
    readme_portfolio: "This site serves as a portfolio and blog.",
    readme_localization:
      "To switch languages, click the 'EN'/'NO' button at the top.",
    readme_nav:
      "To navigate, click a file in the sidebar or use the arrow keys.",
    readme_mobile: "On mobile: tap «MENU» at the top.",
    readme_built_with: "Built with",
    readme_built_lib: "an open-source React library.",
    readme_start_card: "GET STARTED",
    readme_start_text: "Start with",

    about_bio: "17 years old, graduating IT student at Tiller VGS.",
    about_hobbies:
      "In my spare time I tinker with hardware, solder, and experiment with software. Operating systems (mainly Linux) and networking are particularly interesting to me.",
    about_availability: "Speaks Norwegian, English, and Polish.",
    about_goals_card: "GOALS FOR 2026",

    now_description: "page. What I'm currently working on.",
    now_updated: "last updated 2026-05-24",

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
