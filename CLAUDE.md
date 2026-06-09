# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint check
```

Node.js version: **24.13.1** (see `.node-version`).

## Architecture

Next.js 16 App Router project (`src/app/`). All routes, layouts, and pages live under `src/app/`. The `@/*` path alias maps to `./src/*`.

**React Compiler** is enabled (`reactCompiler: true` in `next.config.ts`) — avoid manual `useMemo`/`useCallback` unless there's a specific reason the compiler can't handle the case.

**Styling**: Tailwind CSS v4 via PostCSS. No CSS Modules or styled-components.

**Backend**: A separate backend API is expected at `NEXT_PUBLIC_API_URL` (set in `.env.local`, defaults to `http://localhost:8080`). Server Components can fetch from this URL directly at request time; expose it to the client only when needed via the `NEXT_PUBLIC_` prefix. The registration endpoint is `POST /api/auth/register`.

**Available libraries** (installed, not yet wired up): `axios` for HTTP, `react-hook-form` + `zod` for forms and validation, `zustand` for global state. Prefer these over ad-hoc patterns as the app grows.

**Fonts**: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded via `next/font/google` in the root layout. Use these CSS variables when specifying fonts.

**Design tokens**: Background color is `#F2EDE6` (warm beige). UI follows a minimal luxury aesthetic — serif headings, uppercase tracking-widest labels, black/gray palette.

**TypeScript**: strict mode enabled. Use the `@/*` alias for imports instead of relative paths that cross directory boundaries.
