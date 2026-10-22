# Design System: Elevate Performance Coaching

## Art direction
Premium Fitness Coaching visual identity for Canadian fitness coaches and personal training studios.
- Tagline: Stronger Every Day.
- Tone: credible, refined, contemporary, useful.
- Visual priority: Confident but responsible messaging and clear consultation conversion.

## Colors
charcoal #111827, lime #C7F36B, off-white #F8FAFC, steel #64748B, green #244A35.
- Implement as CSS variables / Tailwind theme tokens.
- Check text and control contrast; decorative accent colors should not carry meaning alone.

## Typography
Space Grotesk headings; Inter body.
- Use responsive `clamp()` heading sizes, readable body line heights and a limited type scale.

## Layout
- Max content width around 1200–1280px with responsive gutters.
- Mobile-first 1-column, tablet 2-column, desktop 3–4-column grids where appropriate.
- Keep generous whitespace, coherent alignment, intentional image crops and consistent spacing.
- Desktop sticky navigation, accessible mobile menu and clear CTA hierarchy.

## Components
- Navigation, Footer, Hero, SectionHeading, Cards, Buttons, Inputs, Feedback, EmptyState and relevant feature-specific UI.
- Hover, active, disabled, error and focus states must all be visually distinct.
- Dialogs: close via button and Escape, trap focus when open, return focus to trigger.

## Content and imagery
- Prefer consistent aspect ratios and photographic style; use legally reusable images with verified attribution/licensing where necessary.
- Keep all fictional data and illustrative endorsements clearly labeled.
- Avoid fake urgency, deceptive trust badges or unverified claims.

## Responsive and motion
- Test 375, 768, 1024 and 1440px widths.
- Subtle CSS transitions only; honor `prefers-reduced-motion`.
- Avoid autoplay and unnecessary heavy animations.

## Quality bar
Looks distinctive rather than like a generic template, while preserving fast navigation and accessible UI.
