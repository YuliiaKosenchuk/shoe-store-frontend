# Shoe Store — ATELIER

A modern e-commerce storefront for a shoe brand, built with Next.js 16 (App Router) and Tailwind CSS v4. Minimal luxury aesthetic with serif headings, product catalog browsing, cart, wishlist, and a customer account area.

## Live Preview

🔗 [shoe-store-frontend-five-sable.vercel.app](https://shoe-store-frontend-five-sable.vercel.app/)

## Design Reference

🎨 [Figma design file](https://www.figma.com/design/G83pUW6PnAFlkCfv6SFUQd/Shoe-store--My-?node-id=211-1471)

## Technologies Used

- **[Next.js 16](https://nextjs.org/)** (App Router) — React framework, routing, SSR
- **React 19** with **React Compiler** enabled
- **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **[react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** — forms and schema validation
- **[Zustand](https://zustand-demo.pmnd.rs/)** — global client state (wishlist, breadcrumbs)
- **[TanStack Query](https://tanstack.com/query)** — server state management
- **[Axios](https://axios-http.com/)** — HTTP client
- **[Motion](https://motion.dev/)** — animations
- **[Embla Carousel](https://www.embla-carousel.com/)** — carousels/sliders
- **[Lucide](https://lucide.dev/)** — icon set
- **react-international-phone** — international phone number input

## Getting Started

**Requirements:** Node.js `24.13.1` (see `.node-version`)

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Other available scripts:

```bash
npm run build    # production build
npm run start    # run the production build
npm run lint     # run ESLint
```

## Features

- 🛍️ Product catalog with detailed product pages (color/size variants, gallery images)
- 🛒 Shopping cart with guest and authenticated user support
- ❤️ Persisted wishlist
- 🔐 Authentication — register, login, forgot/reset password, Google OAuth
- 👤 Customer cabinet with profile management
- 🛠️ Admin panel — catalog, orders, and customer management
- 💳 Stripe Checkout integration for card payments
- 📦 Sendcloud integration for DHL/Hermes pickup point selection
- 🔍 Full-width search mega-menu with search history
- 📰 Editorial/content pages with bespoke layouts
- 📱 Responsive, minimal luxury UI with custom typography (Cormorant Garamond + Jost)
