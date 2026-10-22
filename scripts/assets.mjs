// One-time source asset acquisition. Photos are downloaded locally, not hotlinked at runtime.
import { mkdir, writeFile } from 'node:fs/promises'
await mkdir('public/fonts', { recursive: true })
await mkdir('public/images', { recursive: true })
const photos = {
  hero: ['1517836357463-d25dfeac3438', 1920],
  strength: ['1534438327276-14e5300c3a48', 1200],
  athlete: ['1517838277536-f5f99be501cd', 1200],
  mobility: ['1544367567-0f2fcb009e0b', 1200],
  trail: ['1551632811-561732d1e306', 1200],
  weights: ['1581009146145-b5ef050c2e1e', 1200],
  coach: ['1534258936925-c58bed479fcb', 1200],
}
await Promise.all(Object.entries(photos).map(async ([name, [id, width]]) => {
  const response = await fetch(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=82&fm=webp`)
  if (!response.ok) throw new Error(`${name}: ${response.status}`)
  await writeFile(`public/images/${name}.webp`, Buffer.from(await response.arrayBuffer()))
  console.log(`Downloaded ${name}`)
}))
for (const [name, family] of [['inter', 'Inter:wght@100..900'], ['space-grotesk', 'Space+Grotesk:wght@300..700']]) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(response => response.text())
  const url = [...css.matchAll(/url\((https:[^)]+)\)/g)].at(-1)?.[1]
  if (!url) throw new Error(`No font URL: ${name}`)
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Font failed: ${name}`)
  await writeFile(`public/fonts/${name}.woff2`, Buffer.from(await response.arrayBuffer()))
  console.log(`Downloaded ${name}`)
}
