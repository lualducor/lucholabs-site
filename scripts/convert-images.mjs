import fs from 'node:fs'
import path from 'node:path'

let sharp

try {
  ;({ default: sharp } = await import('sharp'))
} catch {
  console.error('ERROR: sharp not installed. Run: npm install -D sharp')
  process.exit(1)
}

const conversions = [
  {
    src: 'public/photo.jpg',
    dest: 'public/photo.webp',
    resize: { width: 192, height: 192, fit: 'cover' },
    quality: 80,
  },
  {
    src: 'public/speaking.jpg',
    dest: 'public/speaking.webp',
    resize: { width: 1200, fit: 'inside' },
    quality: 80,
  },
  {
    src: 'public/talks/ai-cyber-2026/hero.jpg',
    dest: 'public/talks/ai-cyber-2026/hero.webp',
    resize: { width: 1200, fit: 'inside' },
    quality: 80,
  },
  {
    src: 'public/talks/ai-cyber-2026/humanizing.jpg',
    dest: 'public/talks/ai-cyber-2026/humanizing.webp',
    resize: { width: 1200, fit: 'inside' },
    quality: 80,
  },
  {
    src: 'public/talks/ai-cyber-2026/speaking-alt.jpg',
    dest: 'public/talks/ai-cyber-2026/speaking-alt.webp',
    resize: { width: 1200, fit: 'inside' },
    quality: 80,
  },
  {
    src: 'public/talks/ai-cyber-2026/speaking-proof.jpg',
    dest: 'public/talks/ai-cyber-2026/speaking-proof.webp',
    resize: { width: 1200, fit: 'inside' },
    quality: 80,
  },
]

const galleryDir = 'public/talks/ai-cyber-2026/gallery'

if (fs.existsSync(galleryDir)) {
  for (const entry of fs.readdirSync(galleryDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.jpg')) continue

    const src = path.join(galleryDir, entry.name)
    const dest = src.replace(/\.jpg$/i, '.webp')

    conversions.push({
      src,
      dest,
      resize: { width: 1200, fit: 'inside' },
      quality: 80,
    })
  }
}

function formatKb(bytes) {
  return (bytes / 1024).toFixed(1)
}

async function convertFile({ src, dest, resize, quality }) {
  if (!fs.existsSync(src)) {
    console.log(`SKIP: ${src} not found`)
    return
  }

  const inputPath = path.resolve(src)
  const outputPath = path.resolve(dest)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  const inputBytes = fs.statSync(inputPath).size

  await sharp(inputPath).resize(resize).webp({ quality }).toFile(outputPath)

  const outputBytes = fs.statSync(outputPath).size

  console.log(
    `✓ converted ${src} -> ${dest} (${formatKb(inputBytes)} KB -> ${formatKb(outputBytes)} KB)`,
  )
}

for (const conversion of conversions) {
  await convertFile(conversion)
}
