// Unauthenticated production verification for route metadata, local assets and indexing policy.
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { programs } from '../src/data/programs.js'
import { articles } from '../src/data/articles.js'
const origin = 'https://elevate-performance-coaching-one.vercel.app'
const routes = ['/', '/programs', '/transformations', '/about', '/blog', '/contact', '/faq', '/privacy', ...programs.map(item => `/programs/${item.slug}`), ...articles.map(item => `/blog/${item.slug}`)]
const results = []
for (let index = 0; index < routes.length; index += 4) {
  const batch = await Promise.all(routes.slice(index, index + 4).map(async route => {
    const response = await fetch(origin + route)
    assert.equal(response.status, 200, route)
    const html = await response.text()
    assert.ok(html.includes(`href="${origin}${route}"`), `Canonical ${route}`)
    assert.ok(html.includes('noindex, nofollow'), `Indexing ${route}`)
    assert.ok(html.includes('<html lang="en-CA">'))
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
    const title = html.match(/<title>(.*?)<\/title>/)?.[1]
    assert.ok(title?.includes('Elevate Performance Coaching'))
    return { route, status: response.status, title }
  }))
  results.push(...batch)
}
assert.equal(new Set(results.map(item => item.title)).size, 20, 'Unique per-route metadata')
for (const asset of ['hero.webp', 'strength.webp', 'athlete.webp', 'mobility.webp', 'trail.webp', 'weights.webp', 'coach.webp', 'social.jpg']) {
  const response = await fetch(`${origin}/images/${asset}`)
  assert.equal(response.status, 200, asset)
  assert.match(response.headers.get('content-type'), /^image\//)
}
for (const asset of ['inter.woff2', 'space-grotesk.woff2']) {
  const response = await fetch(`${origin}/fonts/${asset}`)
  assert.equal(response.status, 200, asset)
  assert.equal(Buffer.from(await response.arrayBuffer()).subarray(0, 4).toString(), 'wOF2')
}
const sitemap = await fetch(origin + '/sitemap.xml').then(response => response.text())
assert.equal((sitemap.match(/<loc>/g) || []).length, 20)
const robots = await fetch(origin + '/robots.txt').then(response => response.text())
assert.ok(robots.includes('Disallow: /'))
await writeFile('tmp/http-results.json', JSON.stringify({ origin, results, imageAssets: 8, fonts: 2, sitemapEntries: 20, robots: 'Disallow' }, null, 2))
console.log('Production HTTP passed: 20 unique route heads, 8 images, 2 WOFF2 fonts, sitemap, robots and security headers.')
