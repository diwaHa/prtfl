# Nova Studio Portfolio

A premium, content-driven freelancer portfolio built with Next.js, React Three Fiber, and Motion. All site copy lives in JSON files under `src/content/` — edit content without touching UI code.

## Tech Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **Motion** — scroll and section animations
- **React Three Fiber** — cinematic 3D hero scene
- **Zod** — content and form validation
- **Lenis** — smooth scrolling (disabled when `prefers-reduced-motion` is set)

## Getting Started

```bash
npm install --include=dev
npm run dev
```

Use `--include=dev` so Tailwind, TypeScript, and ESLint are installed (required for `npm run build`).

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run validate:content` | Validate all JSON content against Zod schemas |

## Editing Content

All editable copy is in `src/content/`:

| File | Purpose |
|------|---------|
| `site.json` | Site name, SEO metadata, brand, header CTA, social links |
| `hero.json` | Headline, CTAs, trust signals, availability badge |
| `about.json` | About section |
| `services.json` | Service cards |
| `projects.json` | Portfolio case studies |
| `clients.json` | Client marquee |
| `testimonials.json` | Testimonials carousel |
| `process.json` | Workflow steps |
| `contact.json` | Contact details and form field config |
| `navigation.json` | Header navigation links |
| `footer.json` | Footer links and closing line |
| `ui.json` | Shared UI labels (form, footer, project modal, toasts) |

After editing JSON, run:

```bash
npm run validate:content
```

Schemas are defined in `src/lib/schemas.ts`. TypeScript types live in `src/types/content.ts`.

### Adding a Project

Add an object to the `projects` array in `projects.json`:

```json
{
  "id": "my-project",
  "title": "Project Title",
  "category": "Web App",
  "summary": "Brief summary",
  "challenge": "The problem",
  "solution": "What you built",
  "result": "Measurable outcome",
  "tools": ["Next.js", "TypeScript"],
  "image": "/images/projects/my-project.jpg",
  "color": "#6366f1",
  "featured": true
}
```

Placeholder SVGs ship in `public/images/projects/`. Replace with your own assets (keep paths in `projects.json` in sync).

## Project Structure

```
src/
├── app/              # Next.js routes, layout, SEO (robots, sitemap, OG image)
├── components/
│   ├── layout/       # Header, Footer, SmoothScroll
│   ├── sections/     # Page sections
│   ├── three/        # R3F hero scene
│   ├── seo/          # JSON-LD structured data
│   └── ui/           # shadcn/ui primitives (add via components.json)
├── content/          # JSON content files
├── hooks/            # useReducedMotion, useMediaQuery, useScrollProgress
├── lib/              # Content loader, schemas, utilities
└── types/            # TypeScript content interfaces
```

## Contact Form

Submissions POST to `/api/contact` and are validated server-side. Currently logged to the server console. To connect email, edit `src/app/api/contact/route.ts` and integrate Resend, SendGrid, or your preferred provider.

## Deployment

Optimized for [Vercel](https://vercel.com):

1. Push to GitHub
2. Import the repo in Vercel
3. Update `site.json` → `url` to your production domain

`robots.ts`, `sitemap.ts`, and `opengraph-image.tsx` are generated automatically at build time.

## Accessibility & Performance

- Semantic HTML with skip-to-content link
- `prefers-reduced-motion` disables Lenis, 3D hero (CSS fallback), and heavy animations
- 3D scene uses reduced geometry on mobile and pauses when off-screen
- Scroll progress indicator in the header

## shadcn/ui

Installed primitives: `button`, `input`, `textarea`, `card`, `badge`, `separator`, `sonner`. The contact form and project modal use these components. Toast notifications are provided via Sonner (`AppProviders` in the root layout).

Add more components as needed:

```bash
npx shadcn@latest add dialog dropdown-menu
```

## Performance & Lighthouse

- Fonts use `next/font` with `display: swap`.
- Project images use `next/image` with lazy loading and SVG support.
- 3D scenes disable or simplify when `prefers-reduced-motion` is set.
- Run Lighthouse in Chrome DevTools (Incognito) after `npm run build && npm run start`.
- Target: Performance ≥ 90, Accessibility ≥ 95.
