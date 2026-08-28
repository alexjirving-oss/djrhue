import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
}

function resolveFile(urlPath) {
  const clean = urlPath.split('?')[0] ?? '/'
  if (clean === '/' || clean === '') return join(dist, 'index.html')

  const relative = clean.startsWith('/') ? clean.slice(1) : clean
  let filePath = join(dist, relative)

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html')
  }

  if (existsSync(filePath)) return filePath
  return join(dist, 'index.html')
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      try {
        const filePath = resolveFile(req.url ?? '/')
        const body = readFileSync(filePath)
        const type = MIME[extname(filePath)] ?? 'application/octet-stream'
        res.writeHead(200, { 'Content-Type': type })
        res.end(body)
      } catch (err) {
        res.writeHead(404)
        res.end('Not found')
      }
    })

    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolve({ server, port })
    })
  })
}

async function main() {
  const indexPath = join(dist, 'index.html')
  if (!existsSync(indexPath)) {
    console.error('dist/index.html not found — run vite build first')
    process.exit(1)
  }

  const { server, port } = await startServer()
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle', timeout: 60_000 })
    await page.waitForSelector('#root .hero-h1-name', { timeout: 30_000 })
    await page.waitForSelector('#faq', { timeout: 30_000 })

    const rootHtml = await page.locator('#root').innerHTML()
    let indexHtml = readFileSync(indexPath, 'utf8')

    indexHtml = indexHtml.replace(/<div id="root">\s*<\/div>/, `<div id="root">${rootHtml}</div>`)
    writeFileSync(indexPath, indexHtml, 'utf8')

    const terms = ['DJ RHUE', 'Bristol', 'Afrobeats', 'Dancehall', 'How much does a DJ cost']
    const missing = terms.filter((term) => !indexHtml.includes(term))
    if (missing.length) {
      console.error(`Prerender verification failed — missing: ${missing.join(', ')}`)
      process.exit(1)
    }

    console.log(`Prerender OK — dist/index.html contains ${rootHtml.length.toLocaleString()} chars of crawlable content`)
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
