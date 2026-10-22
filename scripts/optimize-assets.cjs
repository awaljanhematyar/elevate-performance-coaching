// Lossy web delivery assets retain the originals in the ignored workspace archive.
const sharp = require('C:/Users/DE LL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const fs = require('node:fs/promises')
;(async () => {
  await fs.mkdir('tmp/original-images', { recursive: true })
  for (const name of ['hero', 'strength', 'athlete', 'mobility', 'trail', 'weights', 'coach']) {
    const source = await fs.readFile(`public/images/${name}.webp`)
    await fs.writeFile(`tmp/original-images/${name}.webp`, source)
    const image = await sharp(source).resize({ width: name === 'hero' ? 1680 : 1100, withoutEnlargement: true }).webp({ quality: 73 }).toBuffer()
    await fs.writeFile(`public/images/${name}.webp`, image)
    console.log(`${name}: ${source.length} -> ${image.length}`)
  }
  await sharp('public/images/hero.webp').resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toFile('public/images/social.jpg')
})().catch(error => { console.error(error); process.exitCode = 1 })
