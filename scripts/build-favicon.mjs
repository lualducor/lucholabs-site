// sharp must be installed: npm install -D sharp
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')
const inputPath = resolve(rootDir, 'public', 'favicon.svg')
const faviconOutputPath = resolve(rootDir, 'public', 'favicon-32.png')
const appleTouchOutputPath = resolve(rootDir, 'public', 'apple-touch-icon.png')

async function buildFavicons() {
  try {
    const source = sharp(inputPath)

    await source
      .clone()
      .resize(32, 32)
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
      .toFile(faviconOutputPath)

    await source
      .clone()
      .resize(180, 180)
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
      .toFile(appleTouchOutputPath)

    console.log(`Generated ${faviconOutputPath}`)
    console.log(`Generated ${appleTouchOutputPath}`)
  } catch (error) {
    console.error('Failed to build favicon assets.')
    console.error(error)
    process.exitCode = 1
  }
}

buildFavicons()
