# nagorny.no

Personal website hosted on GitHub Pages with a custom domain.

## Stack

- **Hosting**: GitHub Pages (`nagorny.no` custom domain via CNAME)
- **Bundler**: [Vite](https://vitejs.dev/) with React + TypeScript
- **UI Library**: [SRCL](https://github.com/internet-development/www-sacred) - React component library with a TUI aesthetic

## Local development

```bash
npm run dev
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which builds to `dist/` and deploys to GitHub Pages.
