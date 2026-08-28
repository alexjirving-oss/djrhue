import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '../public/brand/qr.png')
const url = 'https://djrhue.com/#book'

await QRCode.toFile(outPath, url, {
  type: 'png',
  width: 512,
  margin: 2,
  color: { dark: '#0d0d0d', light: '#f5f5f5' },
})

console.log(`QR code written to ${outPath} (${url})`)
