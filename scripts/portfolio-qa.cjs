// Verify the exact new portfolio record, real cover and destination links without modifying CMS data.
const { chromium } = require('C:/Users/DE LL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const assert = require('node:assert/strict')
const fs = require('node:fs')
;(async () => {
  const origin = process.argv[2] || 'http://127.0.0.1:4189'
  const browser = await chromium.launch({ headless: true, channel: 'msedge' })
  const results = []
  try {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto(origin, { waitUntil: 'domcontentloaded' })
      const card = page.locator('#projects .project-card').filter({ has: page.getByRole('heading', { name: 'Elevate Performance Coaching — Premium Fitness Website', exact: true }) })
      await card.waitFor({ timeout: 45000 })
      console.log(`Portfolio card found at ${width}px.`)
      assert.equal(await card.count(), 1)
      assert.match(await card.innerText(), /Fitness & Coaching Website/)
      await card.scrollIntoViewIfNeeded()
      await card.locator('img').evaluate(image => image.decode())
      assert.ok(await card.locator('img').evaluate(image => image.naturalWidth === 1600 && image.naturalHeight === 900))
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
      await card.click()
      await page.getByRole('heading', { name: 'Elevate Performance Coaching — Premium Fitness Website', exact: true, level: 1 }).waitFor()
      assert.equal(await page.getByRole('link', { name: /^View live project/ }).getAttribute('href'), 'https://elevate-performance-coaching-one.vercel.app')
      assert.equal(await page.getByRole('link', { name: /^Source code/ }).getAttribute('href'), 'https://github.com/awaljanhematyar/elevate-performance-coaching')
      await page.locator('.detail-cover').evaluate(image => image.decode())
      assert.match(await page.locator('.detail-body').innerText(), /All coaching content, success stories, pricing, and enquiries are illustrative/)
      for (const technology of ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'React Router', 'Lucide React']) assert.ok((await page.locator('.detail-body').innerText()).includes(technology))
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
      await page.reload({ waitUntil: 'domcontentloaded' })
      await page.getByRole('heading', { level: 1, name: 'Elevate Performance Coaching — Premium Fitness Website', exact: true }).waitFor()
      results.push({ width, route: page.url(), cover: 'decoded', links: 'verified', overflow: false })
    }
    assert.deepEqual(errors, [])
    fs.writeFileSync('tmp/portfolio-results.json', JSON.stringify({ origin, results, errors }, null, 2))
    console.log(JSON.stringify({ origin, results, errors }))
  } catch (error) { console.error('Portfolio assertion:', error.message); throw error } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
