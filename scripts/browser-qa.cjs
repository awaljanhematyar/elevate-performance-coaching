// Production-preview browser checks and real screenshots. Uses the existing QA runtime.
const { chromium } = require('C:/Users/DE LL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('node:fs')
const assert = require('node:assert/strict')
const origin = process.argv[2] || 'http://127.0.0.1:4188'
const axePath = 'D:/atelier-north-interiors/tmp/qa-tools/node_modules/axe-core/axe.min.js'

;(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' })
  const context = await browser.newContext()
  const page = await context.newPage()
  const errors = [], results = [], accessibility = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const routes = ['/', '/programs', '/programs/strength-foundations', '/programs/everyday-athlete', '/programs/move-with-purpose', '/programs/built-for-the-trails', '/programs/strength-progress', '/programs/personal-coaching', '/transformations', '/about', '/blog', '/blog/start-small-build-consistency', '/blog/first-strength-session', '/blog/recovery-is-part-of-training', '/blog/train-for-your-weekend', '/blog/progress-beyond-the-numbers', '/blog/make-movement-fit', '/contact', '/faq', '/privacy', '/programs/unknown', '/blog/unknown', '/missing-page']
  try {
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      for (const route of routes) {
        await page.goto(origin + route, { waitUntil: 'networkidle' })
        await page.locator('h1').waitFor()
        await page.evaluate(() => document.fonts.ready)
        await page.locator('img').evaluateAll(async images => { images.forEach(image => { image.loading = 'eager' }); await Promise.all(images.map(image => image.decode())) })
        assert.equal(await page.locator('h1').count(), 1, `one h1: ${route}`)
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow ${width} ${route}`)
        await page.locator('footer').scrollIntoViewIfNeeded()
        await page.waitForTimeout(70)
        const broken = await page.locator('img').evaluateAll(images => images.filter(image => image.complete && (!image.naturalWidth || image.src.endsWith('fallback.svg'))).map(image => image.src))
        assert.deepEqual(broken, [], `Images ${route}`)
        if (fs.existsSync(axePath) && ['/', '/programs', '/contact', '/faq', '/transformations', '/programs/strength-foundations', '/blog/first-strength-session', '/missing-page'].includes(route)) {
          await page.addScriptTag({ path: axePath })
          const report = await page.evaluate(async () => { const report = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return report.violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.map(node => node.target) })) })
          accessibility.push({ width, route, violations: report })
        }
        results.push({ width, route })
      }
    }
    await page.setViewportSize({ width: 375, height: 1000 })
    await page.goto(origin, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.getByRole('link', { name: 'Programs', exact: true }).focus()
    await page.keyboard.press('Escape')
    await assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false')
    await page.goto(origin + '/programs', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Strength', exact: true }).click()
    assert.match(await page.getByRole('status').innerText(), /2 programs/)
    await page.getByRole('searchbox').fill('impossible')
    await page.getByRole('button', { name: 'Reset filters' }).click()
    assert.match(await page.getByRole('status').innerText(), /6 programs/)
    await page.getByRole('link', { name: 'Strength Foundations', exact: true }).click()
    await page.getByRole('link', { name: 'Explore this program', exact: true }).click()
    assert.equal(await page.getByLabel('Program you’re interested in').inputValue(), 'strength-foundations')
    assert.equal(await page.locator('.mobile-sticky').count(), 0)
    await page.getByRole('button', { name: 'Try the demo enquiry' }).click()
    assert.equal(await page.locator('#name').evaluate(element => document.activeElement === element), true)
    await page.getByLabel('Your name *').fill('Alex Sample')
    await page.getByLabel('Email address *').fill('invalid')
    await page.getByLabel('A general fitness goal *').fill('Build a consistent movement routine.')
    await page.getByRole('button', { name: 'Try the demo enquiry' }).click()
    assert.equal(await page.locator('#email').getAttribute('aria-invalid'), 'true')
    await page.getByLabel('Email address *').fill('alex@example.com')
    await page.getByRole('checkbox').check()
    const requests = []
    page.on('request', request => { if (request.method() !== 'GET') requests.push(request.url()) })
    await page.getByRole('button', { name: 'Try the demo enquiry' }).dblclick()
    await page.getByRole('heading', { name: 'You’ve explored the first step.' }).waitFor()
    assert.deepEqual(requests, [])
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0)
    await page.goto(origin + '/contact?program=invalid', { waitUntil: 'networkidle' })
    assert.equal(await page.getByLabel('Program you’re interested in').inputValue(), '')
    await page.goto(origin + '/faq', { waitUntil: 'networkidle' })
    const faq = page.getByRole('button', { name: 'Do I need experience to get started?' })
    await faq.focus(); await page.keyboard.press('Enter')
    assert.equal(await faq.getAttribute('aria-expanded'), 'true')
    await page.keyboard.press('Space'); assert.equal(await faq.getAttribute('aria-expanded'), 'false')
    await page.goto(origin + '/blog', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Recovery', exact: true }).click()
    assert.equal(await page.locator('.article-card').count(), 1)
    // Enlarged text and reduced motion provide a focused stress check beyond the required widths.
    for (const route of ['/', '/programs', '/contact', '/faq']) {
      await page.goto(origin + route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.documentElement.style.fontSize = '200%')
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `200% text overflow ${route}`)
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    fs.mkdirSync('docs/screenshots', { recursive: true })
    for (const [name, route, width, height] of [
      ['desktop-home', '/', 1440, 1000], ['mobile-home', '/', 375, 1000],
      ['desktop-programs', '/programs', 1440, 1100], ['mobile-programs', '/programs', 375, 1100],
      ['program-details', '/programs/strength-foundations', 1440, 1000], ['consultation', '/contact?program=strength-foundations', 1440, 1100],
    ]) {
      await page.setViewportSize({ width, height })
      await page.goto(origin + route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      await page.locator('img').evaluateAll(async images => { images.forEach(image => { image.loading = 'eager' }); await Promise.all(images.map(image => image.decode())) })
      await page.screenshot({ path: `docs/screenshots/${name}.png`, fullPage: false })
    }
    fs.mkdirSync('tmp', { recursive: true })
    fs.writeFileSync('tmp/browser-results.json', JSON.stringify({ origin, results, errors, accessibility }, null, 2))
    assert.deepEqual(errors, [])
    const violations = accessibility.filter(item => item.violations.length)
    assert.deepEqual(violations, [], JSON.stringify(violations))
    console.log(JSON.stringify({ origin, responsiveStates: results.length, accessibilityStates: accessibility.length, errors, screenshots: 6, interactions: 'passed' }))
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
