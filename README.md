# Shimeming's Portfolio

A personal site and portfolio built with Next.js 15 (App Router), TypeScript, and Tailwind CSS 3, statically exported to GitHub Pages.

## About

This is a Next.js 15 portfolio featuring a **Blueprint** design system — an engineering-drawing aesthetic with light and dark themes. Content is rendered at **build time** from markdown with frontmatter using `gray-matter`, enabling real per-item routes and fast static hosting.

## Architecture

- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS 3
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
- **Update:** `npm run update-content` regenerates ordered slug lists (appends new entries, drops removed ones, preserves manual curation)

## Getting Started

### Requirements
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Setup
```shell
git clone https://github.com/Shimeming/shimeming.github.io.git
cd shimeming.github.io
npm ci
```

### Commands
- `npm run dev` — Start dev server at [http://localhost:3000](http://localhost:3000)
- `npm run build` — Build static export (output: `out/`)
- `npm run update-content` — Regenerate content slug lists (order-preserving)
- `npm test` — Run tests (vitest) for content libraries
- `npm run lint` — Run ESLint

## Deployment

The site is statically exported and deployed to GitHub Pages via CI/CD. The `next.config.ts` sets `output: 'export'` for static site generation.
