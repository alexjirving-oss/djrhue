import { chromium } from 'playwright'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const assets = {
  LOGO: join(root, 'public/brand/logo.png'),
  HERO: join(root, 'public/photos/hero-black-gold.jpg'),
  PRESS: join(root, 'public/photos/press-full.jpg'),
  GALLERY1: join(root, 'public/photos/perf-malta.jpg'),
  GALLERY2: join(root, 'public/photos/setup-outdoor-day.jpg'),
  GALLERY3: join(root, 'public/photos/perf-manoel.jpg'),
  CONTACT: join(root, 'public/photos/perf-trinidad.jpg'),
  QR: join(root, 'public/brand/qr.png'),
}

function toFileUrl(path) {
  return `file:///${path.replace(/\\/g, '/')}`
}

function buildHtml() {
  let html = readFileSync(join(__dirname, 'epk/template.html'), 'utf8')
  for (const [key, path] of Object.entries(assets)) {
    html = html.replaceAll(`{{${key}}}`, toFileUrl(path))
  }
  return html
}

async function main() {
  const outDir = join(root, 'public/docs')
  const outPath = join(outDir, 'DJ_RHUE_EPK_2026.pdf')
  const tmpHtml = join(__dirname, 'epk/.build.html')

  mkdirSync(outDir, { recursive: true })
  writeFileSync(tmpHtml, buildHtml(), 'utf8')

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(toFileUrl(tmpHtml), { waitUntil: 'networkidle' })
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()
  console.log(`EPK written to ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
