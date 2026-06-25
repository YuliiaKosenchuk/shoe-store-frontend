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

**Design tokens**: Background color is `#F2EDE6` (warm beige). Accent color for links/focus is `#7A2633`. UI follows a minimal luxury aesthetic — serif headings, uppercase tracking-widest labels, black/gray palette.

**Fonts**: `Cormorant Garamond` (variable `--font-cormorant-garamond`, for serif headings) and `Jost` (variable `--font-jost`, for body/sans) loaded in the root layout.

## Key Libraries

| Library | Purpose |
|---|---|
| `axios` | HTTP via `src/lib/apiClient.ts` |
| `react-hook-form` + `zod` | All forms and validation |
| `zustand` | Global state — `src/store/wishlist.store.ts` (persist) and `src/store/breadcrumb.store.ts` |
| `@tanstack/react-query` | Server state — `QueryProvider` is wired into the root layout; storefront pages still use mock data with `useQuery` blocks commented in |
| `motion` | Animations (requires `"use client"`) |
| `react-international-phone` | Phone number input |
| `embla-carousel-react` | Carousels |
| `lucide-react` | Icons |

## Backend & API

Backend is a separate service at `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8080`). All requests go through `src/lib/apiClient.ts` (an axios instance).

**Auth API endpoints:**
- `POST /api/auth/register` — payload uses `repeatedPassword` (not `confirmPassword`)
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/users/me` — returns `UserProfile` (id, firstName, lastName, email, phoneNumber, createdAt, role)
- `PATCH /api/users/me`
- `/oauth2/authorization/google` — backend redirect for Google OAuth

**Product & Admin API endpoints:**
- `GET /api/products` — list all products
- `GET /api/products/:id` — single product (optional `?color=&size=`)
- `POST /api/products` — create product (`AdminService.createProduct`)
- `PATCH /api/products/:id` — update product
- `DELETE /api/products/:id` — delete product
- `GET /api/products/:id/variants` — list variants
- `POST /api/products/:id/variants` — create variant (size, color, stockQty, sku)
- `PATCH /api/products/variants/:id` — update variant
- `DELETE /api/products/variants/:id` — delete variant
- `POST /api/products/:id/images` — create image (color, mainUrl, urls[])
- `PATCH /api/products/images/:id` — update image
- `DELETE /api/products/images/:id` — delete image

**Auth pattern:** JWT token stored in `localStorage` under the key `token`. The `apiClient` interceptor auto-attaches it as `Authorization: Bearer <token>`. A 401 response clears the token and redirects to `/login`. After Google OAuth, the backend redirects to `/oauth2/callback?token=...` which the client saves to localStorage.

## Directory Conventions

> Note: two directories have intentional typos that must be preserved:
> - `src/shemas/` (not `schemas/`) — Zod schemas + inferred TypeScript types
> - `src/servises/` (not `services/`) — API service objects (`AuthService`, `UsersService`)

All service calls go through the service layer (`src/servises/`) rather than calling `apiClient` directly from components.

## Routes & Access Control

| Route | Notes |
|---|---|
| `/` | Home |
| `/register` | Public |
| `/login` | Public |
| `/forgot-password` | Public |
| `/reset-password` | Public; expects `?token=` query param |
| `/cabinet` | Protected — redirects to `/login` if no localStorage token |
| `/oauth2/callback` | Google OAuth landing — extracts token from `?token=` / `?accessToken=` / `?access_token=` |
| `/admin/catalog`, `/admin/orders`, `/admin/customers` | Visible in cabinet only when `user.role === "ADMIN"` |

Access control is client-side only (token check in `useEffect`). The Header fetches user initials from `/api/users/me` on every route change to keep auth state fresh.

## Layout

All pages (including the home page `/`) must be wrapped in `<Container>` (`src/components/ui/Container.tsx`) for consistent centering at `max-w-336` (1344px).


## Form Component Pattern

Shared primitives in `src/components/forms/`:
- `Field` — labeled text input with error display
- `PasswordField` — show/hide toggle + optional info tooltip
- `PhoneField` — wraps `react-international-phone` via `Controller`

All forms use `react-hook-form` with `zodResolver`. Validation mode is `onChange`. Server errors are displayed via a `serverError` state string above the submit button.

## Code Style

**Commented-out code**: Do not delete commented-out code blocks unless the user explicitly requests removal of comments/commented code. Treat them as intentional drafts or alternatives kept for reference.
