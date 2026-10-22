# Architecture: Elevate Performance Coaching

## Stack
React 19-compatible React + Vite, JavaScript JSX, Tailwind CSS current Vite plugin setup, react-router-dom, lucide-react. No TypeScript, Next.js, Redux, Framer Motion, database or backend for demo.

## Deployment model
Client-side Vite single-page application, static deployment on Vercel. Configure SPA fallback rewrite to `/index.html` for deep links, while preserving static assets. Avoid pretending this is a server-rendered app.

## Suggested structure
```text
src/
  assets/
  components/
    layout/
    ui/
    features/
  pages/
  data/
  hooks/
  utils/
  App.jsx
  main.jsx
  index.css
public/
index.html
package.json
README.md
vercel.json
```

## Routing and state
- React Router for navigation, detail routes and a catch-all 404 page.
- Prefer local state for transient UI, lifting state only where needed.
- A small context is allowed only for shared cart/session state when prop drilling becomes cumbersome.
- Use localStorage only for explicitly simulated persistent UI state; version and validate stored JSON, handle corrupt or unavailable storage safely.
- Keep content records in local data modules and business calculations in pure utility functions.

## Data contract
6 fictional programs in src/data/programs.js with target audience, duration, pricing in CAD, weekly structure; 6 sample general-fitness articles.

## Key feature modules
program filters; dynamic program details; enquiry CTA preselects program; validated enquiry form with consent; FAQ accordion; accessible illustrative success-story gallery; blog categories.

## Security and privacy
- Never include secrets, API keys, real personal customer records or real payment inputs.
- Never claim client-side login is secure authentication.
- Minimize local persistence of personal data. Prefer demo-only sample values and clearly warn before persisting any contact details.
- No real external submissions without explicit integration and approval.

## Quality checks
- `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
- Add Vitest + React Testing Library only if justified by interactive behavior, otherwise test pure utilities with Vitest.
- Check direct loading of deep routes on Vercel.
- Verify that external images have appropriate licenses, stable links, fallbacks and alt text.
