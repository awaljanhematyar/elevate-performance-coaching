// Unknown pages and invalid content slugs share a clear recovery path.
import { ButtonLink } from '../components/UI'
export default function NotFound() {
  return <section className="container not-found"><p className="eyebrow">A SMALL DETOUR</p><span className="error-number" aria-hidden="true">404</span><h1 tabIndex="-1">Let’s find your way back.</h1><p>This page has moved off the training plan. There’s plenty more to explore.</p><ButtonLink to="/" variant="dark">Back to the homepage</ButtonLink></section>
}
