# Shimeming's Portfolio

A personal site and portfolio built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4, statically exported to GitHub Pages.

## About

This is a Next.js 16 portfolio featuring a **Blueprint** design system — an engineering-drawing aesthetic with light and dark themes. Content is rendered at **build time** from markdown with frontmatter using `gray-matter`, enabling real per-item routes and fast static hosting.

## Architecture

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **Styling:** Tailwind CSS 4
- **Content:** Markdown + frontmatter (processed via `gray-matter` at build time)
- **Routes:** 
  - `/projects` — split-pane Steam-style index
  - `/projects/[slug]` — individual project pages (dynamic routes via `generateStaticParams`)
  - `/articles` — article list
  - `/articles/[slug]` — individual articles (dynamic routes via `generateStaticParams`)
- **Metadata:** Dynamic OG tags and page metadata via `generateMetadata`
- **Export:** Static site export to GitHub Pages

## Content Workflow

- **Projects:** `public/projects/<slug>/content.md` (frontmatter + optional notes)
- **Articles:** `public/articles/<slug>.md` (frontmatter + content)
- **Order:** Curated slug order preserved in `src/data/projects.ts` and `src/data/articles.ts`
- **Update:** `pnpm run update-content` regenerates ordered slug lists (appends new entries, drops removed ones, preserves manual curation)

## Getting Started

### Requirements
- [Node.js](https://nodejs.org/) 20.9+ (CI builds on Node 24)
- [pnpm](https://pnpm.io/) (pinned via the `packageManager` field; `corepack enable` will provision the correct version)

### Setup
```shell
git clone https://github.com/Shimeming/shimeming.github.io.git
cd shimeming.github.io
pnpm install
```

### Commands
- `pnpm dev` — Start dev server at [http://localhost:3000](http://localhost:3000)
- `pnpm build` — Build static export (output: `out/`)
- `pnpm run update-content` — Regenerate content slug lists (order-preserving)
- `pnpm test` — Run tests (vitest) for content libraries
- `pnpm lint` — Run ESLint

## Deployment

The site is statically exported and deployed to GitHub Pages via CI/CD (GitHub Actions, pnpm-based). The `next.config.ts` sets `output: 'export'` for static site generation.
