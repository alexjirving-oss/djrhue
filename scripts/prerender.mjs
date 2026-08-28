import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync, copyFileSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

/** Every top-level app route that must resolve on GitHub Pages (directory index). */
const STATIC_ROUTES = [
  { path: '/', out: 'index.html', wait: '#root .hero-h1-name', terms: ['DJ RHUE', 'Bristol', 'Afrobeats'] },
  { path: '/listen', out: 'listen/index.html', wait: '#listen', terms: ['Listen'] },
  { path: '/about', out: 'about/index.html', wait: '#about', terms: ['About'] },
  { path: '/gallery', out: 'gallery/index.html', wait: '#gallery', terms: ['Gallery'] },
  { path: '/services', out: 'services/index.html', wait: '#services', terms: ['Services'] },
  { path: '/rates', out: 'rates/index.html', wait: '#rates', terms: ['Rates'] },
  { path: '/book', out: 'book/index.html', wait: '#book', terms: ['Book'] },
  { path: '/faq', out: 'faq/index.html', wait: '#faq', terms: ['FAQ'] },
  { path: '/terms', out: 'terms/index.html', wait: '#terms', terms: ['Terms'] },
  { path: '/room', out: 'room/index.html', wait: '.room-hero-title', terms: ['The Room', 'How can we help'] },
]

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
  // SPA fallback while prerendering deep links
  return join(dist, '404.html')
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
      } catch {
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

async function prerenderPath(page, port, routePath, shellHtml, outFile, waitSelector, verifyTerms) {
  await page.goto(`http://127.0.0.1:${port}${routePath}`, {
    waitUntil: 'networkidle',
    timeout: 60_000,
  })
  await page.waitForSelector(waitSelector, { timeout: 30_000 })

  const rootHtml = await page.locator('#root').innerHTML()
  const html = shellHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${rootHtml}</div>`)

  const missing = verifyTerms.filter((term) => !html.includes(term))
  if (missing.length) {
    throw new Error(`Prerender ${routePath} failed — missing: ${missing.join(', ')}`)
  }

  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html, 'utf8')
  console.log(`Prerender OK — ${routePath}`)
}

async function main() {
  const indexPath = join(dist, 'index.html')
  if (!existsSync(indexPath)) {
    console.error('dist/index.html not found — run vite build first')
    process.exit(1)
  }

  const shellHtml = readFileSync(indexPath, 'utf8')
  if (!shellHtml.includes('id="root"')) {
    throw new Error('dist/index.html missing #root')
  }

  // GitHub Pages: unknown paths (deep Room articles) fall back to this SPA shell
  copyFileSync(indexPath, join(dist, '404.html'))

  // Wipe any static redirects Vite copied from /public so prerender hits the SPA
  for (const route of STATIC_ROUTES) {
    if (route.path === '/') continue
    const out = join(dist, route.out)
    mkdirSync(dirname(out), { recursive: true })
    copyFileSync(join(dist, '404.html'), out)
  }

  const { server, port } = await startServer()
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    for (const route of STATIC_ROUTES) {
      await prerenderPath(
        page,
        port,
        route.path,
        shellHtml,
        join(dist, route.out),
        route.wait,
        route.terms,
      )
    }
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
