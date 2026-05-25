// TopBar.tsx — site navigation bar (theme + tint toggles, locale toggle, mobile menu trigger).

import * as React from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "./srcl/Navigation";
import { Locale } from "../locale";

type Tint = "" | "tint-green" | "tint-blue" | "tint-yellow" | "tint-pink";
const TINTS: Tint[] = [
  "",
  "tint-green",
  "tint-blue",
  "tint-yellow",
  "tint-pink",
];

interface Props {
  theme: "theme-light" | "theme-dark";
  setTheme: React.Dispatch<React.SetStateAction<"theme-light" | "theme-dark">>;
  tint: Tint;
  setTint: React.Dispatch<React.SetStateAction<Tint>>;
  locale: Locale;
  setLocale: (l: Locale) => void;
  onMenu: () => void;
}

const TopBar: React.FC<Props> = ({
  theme,
  setTheme,
  tint,
  setTint,
  locale,
  setLocale,
  onMenu,
}) => {
  const navigate = useNavigate();
  return (
    <Navigation
      logo={<>~ / akn</>}
      onClickLogo={() => navigate("/")}
      left={
        <button
          className="srcl-logo-like site-menu-btn"
          onClick={onMenu}
          aria-label="open menu"
        >
          ≡ menu
        </button>
      }
      right={
        <div style={{ display: "flex", gap: 0 }}>
          <button
            className="srcl-logo-like site-tint-btn"
            title="cycle tint"
            onClick={() =>
              setTint((t) => TINTS[(TINTS.indexOf(t) + 1) % TINTS.length])
            }
          >
            {tint ? tint.replace("tint-", "◆ ") : "◇ tint"}
          </button>
          <button
            className="srcl-logo-like"
            onClick={() => setLocale(locale === "no" ? "en" : "no")}
            aria-label={locale === "no" ? "switch to English" : "switch to Norwegian"}
          >
            {locale === "no" ? "NO" : "EN"}
          </button>
          <button
            className="srcl-logo-like"
            onClick={() =>
              setTheme((t) =>
                t === "theme-light" ? "theme-dark" : "theme-light",
              )
            }
          >
            {theme === "theme-light" ? "◐ dark" : "◑ light"}
          </button>
        </div>
      }
    />
  );
};

export default TopBar;
