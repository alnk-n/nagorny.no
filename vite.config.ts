import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import postcssNesting from "postcss-nesting";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Wraps any hardcoded min-width (ch, px, em, rem, vw…) with min(value, 100%)
// so SRCL components can never overflow their container on narrow screens.
// Percentage values, zero, auto, none, and already-clamped min() calls are left alone.
const mobileMinWidth = {
  postcssPlugin: "mobile-min-width",
  Declaration(decl: any) {
    if (decl.prop === "min-width") {
      const val = decl.value.trim();
      if (
        !val.startsWith("min(") &&
        !val.endsWith("%") &&
        val !== "0" &&
        val !== "auto" &&
        val !== "none"
      ) {
        decl.value = `min(${val}, 100%)`;
      }
    }
  },
};

// Vite config for nagorny.no
//   • Aliases match the SRCL source layout (`@components`, `@common`) so the
//     vendored SRCL files keep their original import paths.
//   • `base: '/'` because we serve from a custom-domain GitHub Pages site.
//     If you ever deploy to `<user>.github.io/<repo>` instead, switch to
//     `base: '/nagorny.no/'`.
//   • postcss-nesting transpiles CSS nesting (& selectors) for Safari 15 compat.
export default defineConfig({
  plugins: [react()],
  base: "/",
  css: {
    postcss: {
      plugins: [postcssNesting(), mobileMinWidth],
    },
  },
  build: {
    // Tell the Lightning CSS minifier to target Safari 15 so it keeps the
    // traditional max-width/min-width media query syntax instead of converting
    // to the Level 4 range syntax (width<=800px), which only landed in Safari
    // 16.4 and is not supported on iOS 15.8.x.
    cssTarget: ['safari15'],
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/srcl"),
      "@common": path.resolve(__dirname, "src/common"),
    },
  },
  server: {
    port: 3000,
  },
});
