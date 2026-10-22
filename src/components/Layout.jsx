// The shared shell provides route-aware navigation, Escape handling and an unobtrusive demo disclosure.
import { useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MapPin, ArrowUpRight } from 'lucide-react'
import { Logo, ButtonLink } from './UI'

const links = [['/', 'Home'], ['/programs', 'Programs'], ['/transformations', 'Stories'], ['/about', 'About'], ['/blog', 'Journal']]

export function Header() {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  return <><div className="demo-banner">A fictional fitness brand. A real commitment to good design.<span>PORTFOLIO DEMO</span></div><header className="header"><div className="container nav-inner"><Link to="/" aria-label="Elevate Performance Coaching home" onClick={() => setOpen(false)}><Logo /></Link><button type="button" className="menu-toggle" ref={trigger} aria-expanded={open} aria-controls="primary-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button><nav id="primary-nav" aria-label="Main navigation" className={open ? 'nav-open' : ''} onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() } }}><ul>{links.map(([to, label]) => <li key={to}><NavLink to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink></li>)}</ul><ButtonLink className="nav-cta">Let’s talk</ButtonLink></nav></div></header></>
}

export function Footer() {
  const { pathname } = useLocation()
  return <><footer className="footer"><div className="container"><div className="footer-grid"><div><Link to="/" aria-label="Elevate home"><Logo /></Link><p>Purposeful training.<br />Personal progress.<br />Stronger every day.</p><span className="location"><MapPin size={15} aria-hidden="true" /> Inspired by Calgary, Alberta</span></div><div><h2>Explore</h2><Link to="/programs">Our programs</Link><Link to="/transformations">Illustrative stories</Link><Link to="/about">Our approach</Link><Link to="/blog">The journal</Link></div><div><h2>Take the next step</h2><Link to="/contact">Demo consultation <ArrowUpRight size={16} aria-hidden="true" /></Link><Link to="/faq">Common questions</Link><Link to="/privacy">Privacy & demo details</Link><p>Designed for movement.<br />Built for real life.</p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Elevate Performance Coaching · Fictional portfolio project.</p><p>No real services. No real enquiries. All prices in CAD.</p></div></div></footer>{pathname !== '/contact' && <div className="mobile-sticky"><ButtonLink>Explore a demo consultation</ButtonLink></div>}</>
}
