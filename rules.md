# Codex Engineering Rules: Elevate Performance Coaching

## Instruction priority
Follow the PRD, architecture, design and phases. If a requirement conflicts with safety, privacy, a verified package API or another document, report the conflict and propose the smallest correction.

## Technology constraints
React 19-compatible React + Vite, JavaScript JSX, Tailwind CSS current Vite plugin setup, react-router-dom, lucide-react. No TypeScript, Next.js, Redux, Framer Motion, database or backend for demo.

## Coding standards
1. Prefer small functional React components, descriptive names and straightforward JSX.
2. Separate content data, rendering components and calculation utilities.
3. Use Tailwind utilities and design tokens consistently; do not hardcode inconsistent colors throughout components.
4. Use `useEffect` only for real side effects. Avoid unnecessary memoization or complex state frameworks.
5. Use stable IDs and semantic buttons/links, with keyboard access and visible focus.
6. Handle empty, invalid and missing data without crashes.
7. Do not leave TODO buttons that appear functional, fake submissions or unexplained placeholders.
8. Do not introduce TypeScript, Redux, Next.js, Framer Motion, a backend or extra packages without approval.
9. Never modify unrelated repositories or delete user data without approval.
10. Do not claim testing, browser verification or deployment occurred unless actually performed.

## Demo integrity
No fake credentials, medical claims, before-and-after evidence, guaranteed results or real client testimonials. Demo enquiries are not sent.

## Image and content rules
- Fictional brand, fictional product/service records, truthful labels.
- Source legally reusable imagery; no unlicensed client photographs, logos or fake real-world endorsements.
- Use graceful image fallbacks and test actual image loading where browser tools are available.

## Work protocol
- Read all six docs and README before editing code.
- Present a concise plan and implementation order; proceed only after user approval when asked.
- Complete one phase at a time; run available checks, report remaining risks, and update `memory.md` with verified results.
- Record changes with clear commits; never expose secrets in Git.

## Testing emphasis
program routes and related programs; inquiry preselection; required consent; FAQ keyboard navigation; mobile sticky CTA and no fake transformations.
