import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Vite config for nagorny.no
//   • Aliases match the SRCL source layout (`@components`, `@common`) so the
//     vendored SRCL files keep their original import paths.
//   • `base: '/'` because we serve from a custom-domain GitHub Pages site.
//     If you ever deploy to `<user>.github.io/<repo>` instead, switch to
//     `base: '/nagorny.no/'`.
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/srcl'),
      '@common':     path.resolve(__dirname, 'src/common'),
    },
  },
  server: {
    port: 5173,
  },
});
