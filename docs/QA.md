# Delivery verification — 2026-10-22

## Verified application

- All required page types implemented: Home, Programs, six Program Details, Illustrative Stories, About, Journal, six Articles, Contact, FAQ, Privacy and custom 404.
- Six fictional programs and six original educational articles; CAD prices, weekly structures, related content and clear demo disclosures.
- Program category/search filters, result counts, empty reset, blog filters, program consultation preselection, safe invalid parameters, form validation/consent/demo completion, FAQ keyboard interaction and responsive navigation verified.
- No backend, payments, real enquiry transport, analytics or personal-data persistence.

## Automated gates

[GitHub Actions run 39740367470](https://github.com/awaljanhematyar/elevate-performance-coaching/actions/runs/39740367470), implementation commit 3fc19bcae251608d1b0b808550f68077b5adcdd2:

| Check | Observed result |
| --- | --- |
| npm ci | 229 packages installed successfully on Linux |
| npm run lint | Passed, zero warnings/errors |
| npm test | All 20 tests passed |
| npm run build | Passed; twenty generated route heads |
| npm audit --audit-level=high | Zero known vulnerabilities |
| Portfolio merge tests | All 3 passed |
| Portfolio scaffold check | Passed; not a compilation/security test |
| Portfolio production build | Passed, Vite 7.3.7, 1652 modules |

Local npm run build and lint passed. Local npm audit reported zero known vulnerabilities. Production entry JS: 294.52 kB / 94.63 kB gzip; CSS: 32.88 kB / 8.01 kB gzip. No field performance or Lighthouse scores are claimed.

### Local Windows test limitation

The first local Vitest run passed 19/20 with one five-second test timeout. Subsequent runs reached Vitest's 60-second worker startup limit under fork/thread pools and Node 24.16/24.19, including outside the sandbox. A standalone jsdom import took about 46 seconds on this machine. The full unchanged assertion suite passed on the clean Linux GitHub runner. No test was removed or skipped; local worker startup remains an environment limitation.

## Actual browser checks

Microsoft Edge/Chromium against production preview and public Vercel deployment:

- 92 route/viewport states: 23 valid/invalid route cases at 375, 768, 1024 and 1440 pixels.
- Zero horizontal overflow, unexpected page/console errors, broken images or fallback substitutions. Live checks explicitly decoded all images.
- 32 axe WCAG A/AA check states, zero rule violations.
- Additional 200% root-text reflow checks for Home, Programs, Contact and FAQ; reduced-motion capture.
- Program filters/search/reset, program-to-consultation navigation/preselection, invalid parameter fallback, first-invalid-field focus, email/consent errors, demo completion without POST or storage, FAQ Enter/Space, journal categories and menu Escape/focus return passed.

These checks are not a WCAG certification. Physical-device, screen-reader and cross-browser Safari/Firefox testing were not performed.

## Public deployment and HTTP

- Public production: https://elevate-performance-coaching-one.vercel.app
- Initial deployment dpl_FcKJEA59PRLxUZ4p9aNYtDMHfoT8 READY; GitHub integration connected to the matching repository.
- Implementation commit's Vercel status: success (deployment CW64uzgfQpaXCsVYM8Vc2BMMPWJG).
- Unauthenticated HTTP verification passed: 20 unique route titles/canonicals, en-CA, noindex, security headers, eight image assets, two valid WOFF2 fonts, twenty sitemap entries and Disallow robots.
- First canonical check ran while the previous deployment was still served; repeated after the GitHub build completed and all twenty routes passed. No rewrite modification was needed.
- Shorter domain was not assigned by Vercel; all source metadata and portfolio links use the verified -one alias.

## Actual deliverables

- Six real browser PNG captures: docs/screenshots/. Program screenshots retaken with all lazy images decoded, then visually reviewed.
- Desktop/mobile homepage, desktop/mobile programs, program details and consultation screenshots visually inspected.
- 1600 × 900 original CSS-device composition from actual homepage captures: docs/portfolio/elevate-performance-coaching-cover.png and .webp. Both visually reviewed; WebP 101,890 bytes. No invented website UI or screenshot distortion.
- Actual browser walkthrough: docs/walkthrough/elevate-performance-coaching.webm. Contains navigation, filtering, program preselection, sample local-only completion and FAQ interaction. No duration/codec score is claimed.
- Original photos optimized locally; hero 200,302 bytes. Latin WOFF2 subsets: Inter 48,256 bytes; Space Grotesk 22,288 bytes. Font licenses and image source record included.

## Portfolio

Published at https://hematyar-professional-portfolio.vercel.app/projects/elevate-performance-coaching using the existing source-managed case-study workflow.

- Four scoped files preserve existing records and give a same-slug CMS record priority.
- Pre-push remote check detected newer commit 69ebe79 affecting only the Atelier cover. Fast-forwarded and verified that cover's Git blob hash before publishing; no existing project was overwritten.
- Portfolio commit 6e2e961a883c28f608cfae574a59ca59d5b9e1e5 pushed normally; clean main/origin/main, 0/0.
- Vercel status success for that exact commit, deployment B54Ut5LBVjY6A4XvJWcFBY9kDVHJ.
- Local and live browser verification passed at 375 and 1440 pixels: unique card, requested title/copy/six technologies, decoded 1600×900 cover, exact GitHub/Live Demo links, detail navigation/direct refresh, no overflow or page errors.
- Existing CMS/backend/authentication and all other portfolio projects preserved.

## Remaining product limitations

Fictional business and educational content; no real coaching or booking. Generic SPA fallback can return HTTP 200 for an unknown route even though the client displays the branded 404. Search indexing deliberately disabled. Real production use requires reviewed business content, appropriate professional guidance, privacy/legal review and a secure operational enquiry/booking integration.
