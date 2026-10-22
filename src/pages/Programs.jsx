// Program filtering is URL-backed so browsing history and shared links retain the selection.
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, Clock, CalendarDays } from 'lucide-react'
import { programs, filterPrograms, getProgram, currency } from '../data/programs'
import { Intro, ProgramCard, Photo, ButtonLink, FinalCTA, SectionTitle } from '../components/UI'
import NotFound from './NotFound'

// ========================================
// PROGRAM FILTERING
// ========================================
export function Programs() {
  const [params, setParams] = useSearchParams()
  const categories = ['All', 'Strength', 'Performance', 'Lifestyle']
  const category = categories.includes(params.get('category')) ? params.get('category') : 'All'
  const query = params.get('q') || ''
  const results = filterPrograms(category, query)
  const update = (key, value) => setParams(previous => { const next = new URLSearchParams(previous); if (value && value !== 'All') next.set(key, value); else next.delete(key); return next }, { replace: key === 'q' })
  return <><Intro label="PURPOSEFUL TRAINING, PERSONAL PROGRESS" title={<>Find your program.<br /><span className="subtle">Make it your own.</span></>}>Six different starting points. One belief: the best plan is the one that fits your life.</Intro><section className="container section-bottom"><div className="filters"><div className="filter-buttons" role="group" aria-label="Program category">{categories.map(item => <button key={item} type="button" className={category === item ? 'selected' : ''} aria-pressed={category === item} onClick={() => update('category', item)}>{item}</button>)}</div><div className="search-field"><label htmlFor="program-search" className="sr-only">Search programs</label><input id="program-search" type="search" value={query} onChange={event => update('q', event.target.value)} placeholder="Find your starting point…" maxLength={100} /></div></div><div className="results-row"><p role="status">{results.length} {results.length === 1 ? 'program' : 'programs'} to explore</p><span>All pricing is illustrative · CAD</span></div>{results.length ? <div className="grid-three">{results.map(program => <ProgramCard program={program} key={program.slug} index={programs.indexOf(program)} />)}</div> : <div className="empty-state"><h2>A different starting point?</h2><p>No programs match these filters. Try another search or explore all six.</p><button className="button dark" type="button" onClick={() => setParams({})}>Reset filters</button></div>}<div className="program-bottom-note"><p>Not sure where to begin? A conversation is a good first step.</p><ButtonLink variant="outline">Help me choose</ButtonLink></div></section><FinalCTA /></>
}

// ========================================
// DYNAMIC PROGRAM ROUTING
// ========================================
export function ProgramDetails() {
  const { slug } = useParams()
  const program = getProgram(slug)
  if (!program) return <NotFound />
  return <><section className="container detail-intro"><Link to="/programs" className="text-link"><ArrowLeft size={17} aria-hidden="true" />All programs</Link><div className="detail-heading"><div><p className="eyebrow">{program.category} / {program.duration}</p><h1 tabIndex="-1">{program.title}</h1><p className="intro-copy">{program.summary}</p></div><div className="price-block"><strong>{currency(program.price)}<small> CAD</small></strong><p>Illustrative program price</p></div></div><Photo name={program.image} alt={`Training setting for ${program.title}; illustrative stock photograph`} className="detail-image" eager /></section><section className="container section detail-grid"><div><p className="eyebrow">THE BIG PICTURE</p><h2>A thoughtful way forward.</h2><p className="lead">{program.overview}</p><h3>Who it’s for</h3><p>{program.audience}. This is a general demonstration, not a personalised assessment or a medical recommendation.</p><h3>What to expect</h3><ul className="check-list"><li><Check aria-hidden="true" />A clear sample training structure</li><li><Check aria-hidden="true" />Time to practise and reflect</li><li><Check aria-hidden="true" />Flexible recovery between sessions</li><li><Check aria-hidden="true" />An emphasis on realistic, individual progress</li></ul><h3>A sample week</h3><ol className="week-list">{program.structure.map(item => <li key={item}>{item}</li>)}</ol><p className="disclosure">Fictional program. No services or outcomes are promised. Any real training plan should be adapted to your needs with appropriate professional guidance.</p></div><aside className="program-summary"><p className="eyebrow">YOUR STARTING POINT</p><h2>{program.title}</h2><p>{program.summary}</p><p><Clock size={18} aria-hidden="true" />{program.duration}</p><p><CalendarDays size={18} aria-hidden="true" />{program.frequency}</p><div className="summary-price">{currency(program.price)}<small> CAD · illustrative</small></div><ButtonLink to={`/contact?program=${program.slug}`} variant="dark">Explore this program</ButtonLink><small>Try a demo consultation. Nothing is booked.</small></aside></section><section className="container section-bottom"><SectionTitle label="OTHER WAYS TO MOVE FORWARD" title="Explore another direction." /><div className="grid-three">{programs.filter(item => item.slug !== slug).slice(0, 3).map(program => <ProgramCard program={program} index={programs.indexOf(program)} key={program.slug} />)}</div></section></>
}
