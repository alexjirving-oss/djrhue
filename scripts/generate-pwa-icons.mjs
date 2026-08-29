/**
 * Generate PWA / home-screen icons from public/brand/logo.png (requires ImageMagick `magick`).
 * Usage: node scripts/generate-pwa-icons.mjs
 */
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const logo = join(root, 'public', 'brand', 'logo.png')
const outDir = join(root, 'public', 'icons')
const bg = '#0d0d0d'

mkdirSync(outDir, { recursive: true })

function makeIcon(outName, canvas, logoFit) {
  const out = join(outDir, outName)
  execFileSync(
    'magick',
    [
      logo,
      '-resize',
      `${logoFit}x${logoFit}`,
      '-background',
      bg,
      '-gravity',
      'center',
      '-extent',
      `${canvas}x${canvas}`,
      out,
    ],
    { stdio: 'inherit' },
  )
  console.log('wrote', outName)
}

makeIcon('icon-192.png', 192, 172)
makeIcon('icon-512.png', 512, 460)
makeIcon('icon-192-maskable.png', 192, 144)
makeIcon('icon-512-maskable.png', 512, 360)
makeIcon('apple-touch-icon.png', 180, 160)

console.log('PWA icons ready in public/icons/')
