import { chromium } from 'playwright'
import { writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const mixes = [
  ['afrobeats', 'https://www.mixcloud.com/DJRHUE/dj-rhue-afrobeats-throwback-sunset-mix/'],
  ['dancehall', 'https://www.mixcloud.com/DJRHUE/dj-rhue-trending-dancehall-mix-high-energy-vybz-kartel-kraff/'],
  ['amapiano', 'https://www.mixcloud.com/DJRHUE/dj-rhue-amapiano-radio-mix/'],
  ['reggae', 'https://www.mixcloud.com/DJRHUE/dj-rhue-reggae-mix-sean-paul-chronixx/'],
  ['hiphop', 'https://www.mixcloud.com/DJRHUE/dj-rhue-rb-afrobeats-dancehall-party-mix-2026/'],
]

const ffmpeg =
  'C:\\Users\\Alex\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin\\ffmpeg.exe'

const browser = await chromium.launch({ headless: true })
const results = {}

for (const [id, url] of mixes) {
  const page = await browser.newPage()
  const streams = new Set()
  page.on('response', (res) => {
    const u = res.url()
    if (/(\.m4a|audio|\.mp3|audiocdn|stream)/i.test(u) && res.status() < 400) {
      streams.add(u)
    }
  })
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(3000)
  try {
    await page.locator('button[aria-label*="Play" i]').first().click({ timeout: 4000 })
  } catch {
    try {
      await page.getByRole('button', { name: /play/i }).first().click({ timeout: 2000 })
    } catch {
      /* ignore */
    }
  }
  await page.waitForTimeout(8000)
  const list = [...streams]
  console.log(id, 'captured', list.length, list.slice(0, 3).map((u) => u.slice(0, 120)))
  results[id] = { streams: list }

  const audioUrl = list.find((u) => /\.m4a|\.mp3|audio/i.test(u))
  if (audioUrl) {
    const silence = spawnSync(
      ffmpeg,
      ['-i', audioUrl, '-t', '30', '-af', 'silencedetect=noise=-40dB:d=0.3', '-f', 'null', '-'],
      { encoding: 'utf8' },
    )
    const err = `${silence.stderr || ''}`
    const starts = [...err.matchAll(/silence_start:\s*([\d.]+)/g)].map((m) => Number(m[1]))
    const ends = [...err.matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number(m[1]))
    results[id].silenceStarts = starts
    results[id].silenceEnds = ends
    // Intro silence ends when first silence_end occurs near the beginning
    const introEnd = ends.find((t) => t > 0.2 && t < 20)
    results[id].suggestedStartAt = introEnd ? Math.ceil(introEnd * 10) / 10 : 0
    console.log(id, 'suggestedStartAt', results[id].suggestedStartAt, 'ends', ends.slice(0, 5))
  }
  await page.close()
}

await browser.close()
writeFileSync('mix-silence.json', JSON.stringify(results, null, 2))
console.log('wrote mix-silence.json')
