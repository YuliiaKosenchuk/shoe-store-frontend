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

**Backend**: A separate backend API is expected at `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8080` via `.env.local`). Server Components fetch from this URL directly; expose it to the client only when needed via `NEXT_PUBLIC_` prefix.

**TypeScript**: strict mode enabled. Use the `@/*` alias for imports instead of relative paths that cross directory boundaries.
