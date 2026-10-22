// Route composition and focus/metadata updates are centralised; larger page modules load on demand.
import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer } from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { getProgram } from './data/programs'
import { articles } from './data/articles'

const Programs = lazy(() => import('./pages/Programs').then(module => ({ default: module.Programs })))
const ProgramDetails = lazy(() => import('./pages/Programs').then(module => ({ default: module.ProgramDetails })))
const Journal = lazy(() => import('./pages/Journal').then(module => ({ default: module.Journal })))
const ArticleDetails = lazy(() => import('./pages/Journal').then(module => ({ default: module.ArticleDetails })))
const Contact = lazy(() => import('./pages/Contact'))
const other = name => lazy(() => import('./pages/Other').then(module => ({ default: module[name] })))
const About = other('About'), Stories = other('Stories'), Questions = other('Questions'), Privacy = other('Privacy')

const titles = { '/': 'Stronger Every Day.', '/programs': 'Find your program', '/transformations': 'Illustrative coaching stories', '/about': 'Our approach', '/blog': 'The Elevate Journal', '/contact': 'Demo consultation', '/faq': 'Common questions', '/privacy': 'Privacy & demo details' }

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    const program = pathname.startsWith('/programs/') && getProgram(pathname.split('/')[2])
    const article = pathname.startsWith('/blog/') && articles.find(item => item.slug === pathname.split('/')[2])
    const title = program?.title || article?.title || titles[pathname] || 'Page not found'
    document.title = `${title} | Elevate Performance Coaching`
    const canonical = document.querySelector('link[rel="canonical"]')
    canonical?.setAttribute('href', `https://elevate-performance-coaching-one.vercel.app${pathname}`)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    window.scrollTo(0, 0)
    // Focus after lazy content resolves, while leaving first document load undisturbed.
    let observer
    const focus = () => { const heading = [...document.querySelectorAll('h1')].find(element => element.getClientRects().length); if (heading) { heading.focus({ preventScroll: true }); observer?.disconnect(); return true } return false }
    if (!focus()) { observer = new MutationObserver(focus); observer.observe(document.getElementById('main'), { childList: true, subtree: true }) }
    return () => observer?.disconnect()
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  return <><a className="skip-link" href="#main">Skip to content</a><Header key={pathname} /><main id="main"><Suspense fallback={<div className="container loading" role="status">Finding your next step…</div>}><Routes><Route path="/" element={<Home />} /><Route path="/programs" element={<Programs />} /><Route path="/programs/:slug" element={<ProgramDetails />} /><Route path="/transformations" element={<Stories />} /><Route path="/about" element={<About />} /><Route path="/blog" element={<Journal />} /><Route path="/blog/:slug" element={<ArticleDetails />} /><Route path="/contact" element={<Contact key={pathname} />} /><Route path="/faq" element={<Questions />} /><Route path="/privacy" element={<Privacy />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></main><Footer /><RouteEffects /></>
}
