// Download Latin variable WOFF2 font subsets and retain their open-font licences.
import { writeFile } from 'node:fs/promises'
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
for (const [name, family, directory, licenseName] of [['inter', 'Inter:wght@100..900', 'inter', 'Inter'], ['space-grotesk', 'Space+Grotesk:wght@300..700', 'spacegrotesk', 'SpaceGrotesk']]) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`, { headers: { 'User-Agent': userAgent } }).then(response => response.text())
  const url = [...css.matchAll(/url\((https:[^)]+)\)/g)].at(-1)?.[1]
  if (!url) throw new Error(`Missing font ${name}`)
  const data = Buffer.from(await fetch(url).then(response => response.arrayBuffer()))
  if (data.subarray(0, 4).toString() !== 'wOF2') throw new Error('Expected WOFF2 format')
  await writeFile(`public/fonts/${name}.woff2`, data)
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${directory}/OFL.txt`)
  if (!license.ok) throw new Error(`Missing license ${name}`)
  await writeFile(`public/fonts/OFL-${licenseName}.txt`, await license.text())
  console.log(`${name}: valid WOFF2, ${data.length} bytes, OFL saved`)
}
