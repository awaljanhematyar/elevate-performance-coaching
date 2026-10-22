# Product Requirements Document: Elevate Performance Coaching

## Product brief
- Product: Elevate Performance Coaching, a fictional premium fitness coaching portfolio demonstration.
- Market: Calgary, Alberta.
- Tagline: Stronger Every Day.
- Audience: Canadian fitness coaches and personal training studios.
- Goal: a commercially credible, responsive, interactive frontend that can be shown to prospective Canadian clients and adapted to a real business.
- Currency: CAD; language: English.

## Required routes
Home, Programs, Program Details (/programs/:slug), Transformations/Illustrative Stories, About, Blog, Blog Article, Contact, 404.

## Functional scope
program filters; dynamic program details; enquiry CTA preselects program; validated enquiry form with consent; FAQ accordion; accessible illustrative success-story gallery; blog categories.

## Sample data
6 fictional programs in src/data/programs.js with target audience, duration, pricing in CAD, weekly structure; 6 sample general-fitness articles.

## Scope exclusions and honesty
No fake credentials, medical claims, before-and-after evidence, guaranteed results or real client testimonials. Demo enquiries are not sent.
- Clearly identify the brand and data as portfolio demo material, using an unobtrusive but visible disclosure.
- No invented verified reviews, credentials, awards, client relationships or production transactions.
- Every interactive control must work or clearly explain its disabled/demo state.

## Acceptance criteria
1. Every listed route renders with consistent navigation, footer or app shell as appropriate.
2. Every described interaction functions using local data and appropriate React state.
3. No runtime errors, dead links, broken imports or knowingly broken images.
4. Forms validate and communicate clearly that no real submission occurs.
5. Mobile widths 375px, tablet 768px and desktop 1440px are usable without horizontal overflow.
6. Keyboard navigation, visible focus, accessible labels, semantic landmarks and reduced-motion preference are respected.
7. `npm run build` succeeds; meaningful tests pass.
8. README explains run, demo limitations, customization, deployment and integrations needed for production.
9. The implementation stays easy for a junior React developer to modify.

## Priority
Confident but responsible messaging and clear consultation conversion.

## Definition of done
A reviewer can open the live demo, navigate every page, exercise every primary flow, and understand which features are simulated.
