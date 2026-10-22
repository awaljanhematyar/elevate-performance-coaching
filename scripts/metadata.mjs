// Generate per-route crawlable metadata after Vite builds the static application.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { programs } from '../src/data/programs.js'
import { articles } from '../src/data/articles.js'
const origin = 'https://elevate-performance-coaching-one.vercel.app'
const routes = [
  ['/', 'Stronger Every Day.', 'Purposeful training, personal progress. A fictional Calgary coaching portfolio demonstration.'],
  ['/programs', 'Find your program', 'Explore six fictional strength, performance and lifestyle programs with illustrative CAD pricing.'],
  ['/transformations', 'Illustrative coaching stories', 'Three fictional coaching scenarios. No real clients, testimonials or promised transformations.'],
  ['/about', 'Our approach', 'Explore the people-first philosophy behind this fictional Calgary fitness brand.'],
  ['/blog', 'The Elevate Journal', 'Original articles on training, mindset, recovery and everyday movement.'],
  ['/contact', 'Demo consultation', 'Try an accessible consultation form. Nothing is sent, stored or booked.'],
  ['/faq', 'Common questions', 'Straight answers about programs, the approach and this fictional portfolio demo.'],
  ['/privacy', 'Privacy & demo details', 'Understand the fictional content, in-memory consultation and hosting limitations.'],
  ...programs.map(program => [`/programs/${program.slug}`, program.title, program.summary]),
  ...articles.map(article => [`/blog/${article.slug}`, article.title, article.excerpt]),
]
const template = await readFile('dist/index.html', 'utf8')
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
for (const [route, title, description] of routes) {
  const canonical = origin + (route === '/' ? '/' : route)
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)} | Elevate Performance Coaching</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(title)} | Elevate Performance Coaching`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonical}`)
    .replace('</head>', `  <meta property="og:url" content="${canonical}" />\n  </head>`)
  const directory = route === '/' ? 'dist' : `dist${route}`
  await mkdir(directory, { recursive: true })
  await writeFile(`${directory}/index.html`, html)
}
await writeFile('dist/404.html', template.replace(/<title>.*?<\/title>/, '<title>Page not found | Elevate Performance Coaching</title>').replace(/<link rel="canonical"[^>]+>/, ''))
await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n# Fictional portfolio demo intentionally excluded from search indexing.\n')
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(([route]) => `<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>`)
console.log(`Generated metadata for ${routes.length} routes. Fictional site remains noindex.`)
