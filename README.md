# nagorny.no

Personal 'about me' website hosted on GitHub Pages with a custom domain.

## Stack

- **Hosting**: GitHub Pages (`nagorny.no` custom domain via CNAME)
- **Bundler**: [Vite](https://vitejs.dev/) with React + TypeScript
- **UI Library**: [SRCL](https://github.com/internet-development/www-sacred) — React component library with a TUI (terminal/text UI) aesthetic
- **Design**: Built with Claude's online design tool

## Scaffold (first time only)

```bash
npm create vite@latest nagorny.no -- --template react-ts
cd nagorny.no
npm install
```

## Local development

```bash
npm run dev
```

## Deployment

The site builds to `dist/` via `npm run build`. GitHub Pages should be pointed at that directory (or use a GitHub Actions workflow to build and deploy). To configure the custom domain:

1. Add a `CNAME` file at the repo root containing `nagorny.no`
2. In the repo settings → Pages, set the custom domain to `nagorny.no` and enable HTTPS
3. Point your DNS registrar's records at GitHub's Pages IPs:
   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   CNAME www nagorny.no
   ```

## Project structure

```
nagorny.no/
├── public/
│   └── CNAME          # custom domain file for GitHub Pages
├── src/
│   ├── components/    # page sections and reusable UI pieces
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## License

Source available for reference. Please don't wholesale copy the design or content.
