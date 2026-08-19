import { chromium } from 'playwright'
import { PDFDocument } from 'pdf-lib'
import { readFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const flyerDir = join(root, 'flyers/time-machine')
const outDir = join(flyerDir, 'output')

const WIDTH = 2480
const HEIGHT = 3508

function toFileUrl(path) {
  return `file:///${path.replace(/\\/g, '/')}`
}

async function waitForFonts(page) {
  await page.waitForFunction(() => document.fonts.ready.then(() => true))
  await page.waitForTimeout(500)
}

async function renderPage(browser, htmlPath, baseName) {
  const page = await browser.newPage()
  await page.setViewportSize({ width: WIDTH, height: HEIGHT })

  await page.goto(toFileUrl(htmlPath), { waitUntil: 'networkidle' })
  await waitForFonts(page)

  const pngPath = join(outDir, `${baseName}.png`)
  const pdfPath = join(outDir, `${baseName}.pdf`)

  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  })

  await page.pdf({
    path: pdfPath,
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  const pdfBytes = readFileSync(pdfPath)
  await page.close()

  console.log(`  ${baseName}.png`)
  console.log(`  ${baseName}.pdf`)

  return pdfBytes
}

async function mergePdfs(pdfBuffers, outPath) {
  const merged = await PDFDocument.create()
  for (const bytes of pdfBuffers) {
    const doc = await PDFDocument.load(bytes)
    const pages = await merged.copyPages(doc, doc.getPageIndices())
    pages.forEach((p) => merged.addPage(p))
  }
  const mergedBytes = await merged.save()
  const { writeFileSync } = await import('node:fs')
  writeFileSync(outPath, mergedBytes)
  console.log(`  combined.pdf`)
}

async function main() {
  mkdirSync(outDir, { recursive: true })

  const pages = [
    { html: join(flyerDir, 'page1.html'), name: 'page1' },
    { html: join(flyerDir, 'page2.html'), name: 'page2' },
  ]

  console.log('Building Time Machine flyers…')

  const browser = await chromium.launch()
  const pdfBuffers = []

  try {
    for (const { html, name } of pages) {
      const bytes = await renderPage(browser, html, name)
      pdfBuffers.push(bytes)
    }
  } finally {
    await browser.close()
  }

  await mergePdfs(pdfBuffers, join(outDir, 'combined.pdf'))

  console.log(`\nDone → ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
