// Shared presentation primitives keep page layouts and accessible behaviour consistent.
import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { currency } from '../data/programs'
import { faqs } from '../data/content'

export function Logo() {
  return <span className="logo"><svg aria-hidden="true" viewBox="0 0 48 42"><path d="M1 36 22 3h12L13 36zm24 0 12-20 10 20z" fill="currentColor" /></svg><span>ELEVATE<small>PERFORMANCE COACHING</small></span></span>
}

export function ButtonLink({ to = '/contact', children = 'Explore a consultation', variant = '', className = '' }) {
  return <Link to={to} className={`button ${variant} ${className}`}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>
}

export function Photo({ name, alt, className = '', eager = false }) {
  return <img src={`/images/${name}.webp`} alt={alt} className={className} width="1200" height="900" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/fallback.svg' }} />
}

export function Intro({ label, title, children }) {
  return <section className="page-intro container"><p className="eyebrow"><span />{label}</p><h1 tabIndex="-1">{title}</h1>{children && <p className="intro-copy">{children}</p>}</section>
}

export function SectionTitle({ label, title, children, link, to }) {
  return <div className="section-title"><div><p className="eyebrow">{label}</p><h2>{title}</h2>{children && <p>{children}</p>}</div>{link && <Link className="text-link" to={to}>{link}<ArrowUpRight size={19} aria-hidden="true" /></Link>}</div>
}

export function ProgramCard({ program, index }) {
  return <article className="program-card"><Link className="card-photo" to={`/programs/${program.slug}`} tabIndex={-1} aria-hidden="true"><Photo name={program.image} alt="" /><span className="photo-label">{program.category}</span><span className="card-number">0{index + 1}</span></Link><div className="card-body"><p className="card-meta">{program.duration}<span> / </span>{program.frequency}</p><h3><Link to={`/programs/${program.slug}`}>{program.title}</Link></h3><p>{program.summary}</p><p className="audience">For {program.audience.toLowerCase()}.</p><div className="card-bottom"><span><strong>{currency(program.price)}</strong> <small>CAD · illustrative</small></span><Link to={`/programs/${program.slug}`} className="circle-link" aria-label={`Explore ${program.title}`}><ArrowUpRight size={20} aria-hidden="true" /></Link></div></div></article>
}

// ========================================
// FAQ ACCORDION INTERACTIONS
// ========================================
export function FAQ({ limit }) {
  const [open, setOpen] = useState(null)
  return <div className="faq-list">{faqs.slice(0, limit).map(([question, answer], index) => <div className={`faq-item ${open === index ? 'is-open' : ''}`} key={question}><h3><button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpen(open === index ? null : index)}>{question}{open === index ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}</button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={open !== index}><p>{answer}</p></div></div>)}</div>
}

export function FinalCTA() {
  return <section className="final-cta"><div className="container cta-inner"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Small steps.<br />Stronger tomorrows.</h2><p>You bring the intention. Explore what a plan could look like.</p></div><div><ButtonLink variant="dark">Let’s find your starting point</ButtonLink><p className="cta-note">Try the demo consultation · No enquiry is sent</p></div></div></section>
}

export function StoryCard({ story }) {
  return <article className="story-card"><Photo name={story.image} alt={`${story.name} scenario: illustrative training setting, not a client photograph`} /><div><p className="eyebrow">{story.name}</p><h3>{story.title}</h3><p>{story.text}</p><p className="disclosure">Illustrative coaching scenario — not a real client testimonial.</p><Link className="text-link" to={`/programs/${story.program}`}>Explore the sample program<ArrowUpRight size={18} aria-hidden="true" /></Link></div></article>
}
