// Capture fully decoded real page images; lazy assets must finish before each screenshot.
const { chromium } = require('C:/Users/DE LL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('node:fs')
;(async () => {
  const origin = process.argv[2] || 'http://127.0.0.1:4188'
  const browser = await chromium.launch({ headless: true, channel: 'msedge' })
  try {
    const page = await browser.newPage()
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
      await page.screenshot({ path: `docs/screenshots/${name}.png` })
      console.log(`Captured ${name}, all images decoded.`)
    }
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
