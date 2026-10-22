# Delivery Phases: Elevate Performance Coaching

## Phase 0: Repository and specification
- Review six documents; resolve conflicts and missing requirements.
- Initialize React/Vite and dependencies; add scripts, linting, README and Git ignore.
- Deliverable: app starts, builds and shows a shell.
- Gate: `npm run build` passes.

## Phase 1: Visual system and shell
- Add fonts, tokens, typography, responsive navigation, footer, common buttons and page layouts.
- Implement route skeletons and 404.
- Gate: all links navigate; no mobile overflow.

## Phase 2: Content and core pages
- Populate data: 6 fictional programs in src/data/programs.js with target audience, duration, pricing in CAD, weekly structure; 6 sample general-fitness articles.
- Implement all static pages and realistic demo content.
- Gate: each route displays meaningful content and licensed/fallback imagery.

## Phase 3: Main interactions
- Implement program filters; dynamic program details; enquiry CTA preselects program; validated enquiry form with consent; FAQ accordion; accessible illustrative success-story gallery; blog categories.
- Gate: interactions function, state changes are consistent and demo labels are visible.

## Phase 4: Edge cases and accessibility
- Add validation, empty states, error messages, accessible dialogs, keyboard handling and reduced motion.
- Gate: program routes and related programs; inquiry preselection; required consent; FAQ keyboard navigation; mobile sticky CTA and no fake transformations.

## Phase 5: QA and optimization
- Run build and tests, inspect browser console, check 375/768/1440px layouts, broken images and links.
- Optimize lazy loading and metadata; ensure all demo claims are accurate.
- Gate: zero known critical errors and documented limitations.

## Phase 6: Deploy and handoff
- Add SPA rewrite if required, deploy to Vercel, test direct route URLs and complete README.
- Capture portfolio screenshots and a 30–60 second walkthrough.
- Gate: working public URL, source repository and customization guide.

## Estimated effort
AI-assisted first implementation can take hours; verified production-quality polish may require additional days. Do not mark a phase done without evidence.
