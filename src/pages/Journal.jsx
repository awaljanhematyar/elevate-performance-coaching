// Filterable original educational articles and their dynamic detail routes.
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { articles, readingTime } from '../data/articles'
import { Intro, Photo, SectionTitle, FinalCTA } from '../components/UI'
import NotFound from './NotFound'

export function ArticleCard({ article }) {
  return <article className="article-card"><Link to={`/blog/${article.slug}`} className="card-photo" tabIndex={-1} aria-hidden="true"><Photo name={article.image} alt="" /></Link><p className="card-meta">{article.category} · {readingTime(article)} min read</p><h3><Link to={`/blog/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link className="text-link" to={`/blog/${article.slug}`}>Read article<span className="sr-only">: {article.title}</span><ArrowUpRight size={18} aria-hidden="true" /></Link></article>
}

export function Journal() {
  const [params, setParams] = useSearchParams()
  const categories = ['All', 'Training', 'Mindset', 'Recovery', 'Lifestyle']
  const category = categories.includes(params.get('category')) ? params.get('category') : 'All'
  const results = articles.filter(article => category === 'All' || article.category === category)
  return <><Intro label="THE ELEVATE JOURNAL" title={<>A little knowledge.<br />A fresh perspective.</>}>Practical thoughts on training, consistency, and making room for movement. General education, written for this demo.</Intro><section className="container section-bottom"><div className="filters"><div className="filter-buttons" role="group" aria-label="Article category">{categories.map(item => <button type="button" key={item} className={category === item ? 'selected' : ''} aria-pressed={category === item} onClick={() => setParams(item === 'All' ? {} : { category: item })}>{item}</button>)}</div></div><p className="results-row" role="status">{results.length} articles to explore</p><div className="grid-three article-grid">{results.map(article => <ArticleCard article={article} key={article.slug} />)}</div></section><FinalCTA /></>
}

export function ArticleDetails() {
  const { slug } = useParams()
  const article = articles.find(item => item.slug === slug)
  if (!article) return <NotFound />
  return <><div className="container detail-intro"><Link className="text-link" to="/blog"><ArrowLeft size={17} aria-hidden="true" />Back to the journal</Link><div className="article-heading"><p className="eyebrow">{article.category} · {readingTime(article)} MIN READ</p><h1 tabIndex="-1">{article.title}</h1><p className="intro-copy">{article.excerpt}</p><p className="article-byline">Elevate editorial · Original demo content</p></div><Photo name={article.image} alt={`Illustrative training setting for the article “${article.title}”`} className="detail-image" eager /></div><article className="article-content">{article.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<aside className="editorial-note"><strong>A note on this article</strong><p>This is general educational demo content, not personalised fitness or medical advice. No results are guaranteed. Seek appropriate qualified guidance for your own circumstances.</p></aside><Link to="/programs" className="text-link">Find a sample program that fits<ArrowUpRight size={17} aria-hidden="true" /></Link></article><section className="container section"><SectionTitle label="KEEP EXPLORING" title="More from the journal." /><div className="grid-three">{articles.filter(item => item.slug !== slug).slice(0, 3).map(item => <ArticleCard key={item.slug} article={item} />)}</div></section></>
}
