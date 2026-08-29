import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'
import {
  clearListenAutoplayArm,
  listenAutoplayArmed,
} from '../lib/listenAutoplay'

const YOUTUBE_CHANNEL = 'https://youtube.com/@rhue_james7'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/ehH6LHv1TiA'
const MIXCLOUD_PROFILE = 'https://www.mixcloud.com/DJRHUE/'
const WIDGET_API = 'https://widget.mixcloud.com/media/js/widgetApi.js'

type GenreId = 'afrobeats' | 'dancehall' | 'amapiano' | 'reggae' | 'hiphop'

type GenreMix = {
  id: GenreId
  label: string
  title: string
  key: string
  feed: string
  art: string
  duration: string
  /** Seconds to seek past Mixcloud intro silence (from silence probe). */
  startAt: number
}

const genres: GenreMix[] = [
  {
    id: 'afrobeats',
    label: 'Afrobeats',
    title: 'Afrobeats Throwback Sunset Mix',
    key: '/DJRHUE/dj-rhue-afrobeats-throwback-sunset-mix/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-afrobeats-throwback-sunset-mix/',
    art: 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/1/2/7/d/a2d1-45c6-4229-88f9-6f96a58b7827',
    duration: '19:49',
    startAt: 4.8,
  },
  {
    id: 'dancehall',
    label: 'Dancehall',
    title: 'Trending Dancehall Mix',
    key: '/DJRHUE/dj-rhue-trending-dancehall-mix-high-energy-vybz-kartel-kraff/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-trending-dancehall-mix-high-energy-vybz-kartel-kraff/',
    art: 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/c/2/c/a/8d23-cdb5-4d7d-8e73-17d61c2b5e43',
    duration: '18:26',
    startAt: 0,
  },
  {
    id: 'amapiano',
    label: 'Amapiano',
    title: 'Amapiano Radio Mix',
    key: '/DJRHUE/dj-rhue-amapiano-radio-mix/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-amapiano-radio-mix/',
    art: 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/b/4/a/5/f79a-cb4b-4adc-b926-d154472250c9',
    duration: '18:32',
    startAt: 4.8,
  },
  {
    id: 'reggae',
    label: 'Reggae',
    title: 'Reggae Mix — Sean Paul, Chronixx+',
    key: '/DJRHUE/dj-rhue-reggae-mix-sean-paul-chronixx/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-reggae-mix-sean-paul-chronixx/',
    art: 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/d/2/5/7/09c2-81f5-4490-8a25-fc4b71f3c489',
    duration: '15:14',
    startAt: 4.1,
  },
  {
    id: 'hiphop',
    label: 'Hip Hop & R&B',
    title: 'R&B, Afrobeats & Dancehall Party Mix',
    key: '/DJRHUE/dj-rhue-rb-afrobeats-dancehall-party-mix-2026/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-rb-afrobeats-dancehall-party-mix-2026/',
    art: 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/4/2/d/3/ac96-dcee-4c2a-98e0-1c839439d936',
    duration: '40:42',
    startAt: 4.8,
  },
]

type MixcloudWidget = {
  ready: Promise<void>
  play: () => void
  pause: () => void
  load: (cloudcastKey: string, startPlaying?: boolean) => void
  seek: (seconds: number) => void
  getPosition: (cb: (position: number) => void) => void
  events: {
    play: { on: (cb: () => void) => void; off: (cb: () => void) => void }
    pause: { on: (cb: () => void) => void; off: (cb: () => void) => void }
  }
}

declare global {
  interface Window {
    Mixcloud?: {
      PlayerWidget: (el: HTMLIFrameElement) => MixcloudWidget
    }
  }
}

function widgetSrc(feed: string, autoplay: boolean) {
  const params = new URLSearchParams({
    hide_cover: '1',
    mini: '1',
    light: '0',
    feed,
  })
  if (autoplay) params.set('autoplay', '1')
  return `https://www.mixcloud.com/widget/iframe/?${params.toString()}`
}

function loadWidgetApi(): Promise<void> {
  if (window.Mixcloud?.PlayerWidget) return Promise.resolve()
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_API}"]`)
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Mixcloud?.PlayerWidget) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Mixcloud widget failed')), {
        once: true,
      })
    })
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = WIDGET_API
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Mixcloud widget failed'))
    document.body.appendChild(script)
  })
}

export function Listen() {
  const [activeId, setActiveId] = useState<GenreId>('afrobeats')
  const [playing, setPlaying] = useState(false)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<MixcloudWidget | null>(null)
  const activeIdRef = useRef(activeId)
  const playingRef = useRef(false)
  const feedRef = useRef(genres[0].feed)
  /** Mixcloud key we already intro-sought for — avoids re-seek on pause/resume. */
  const introSeekedKeyRef = useRef<string | null>(null)
  activeIdRef.current = activeId
  playingRef.current = playing
  feedRef.current = (genres.find((g) => g.id === activeId) ?? genres[0]).feed

  const active = genres.find((g) => g.id === activeId) ?? genres[0]

  const onPlay = useEffectEvent(() => {
    setPlaying(true)
    setNeedsGesture(false)
    clearListenAutoplayArm()
  })
  const onPause = useEffectEvent(() => setPlaying(false))

  const skipIntroSilence = useEffectEvent((widget: MixcloudWidget) => {
    const mix = genres.find((g) => g.id === activeIdRef.current) ?? genres[0]
    if (introSeekedKeyRef.current === mix.key) return
    introSeekedKeyRef.current = mix.key
    if (!mix.startAt) return
    try {
      widget.seek(mix.startAt)
    } catch {
      /* seek may fail if the widget is still buffering */
    }
  })

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let cancelled = false
    let playHandler: (() => void) | null = null
    let pauseHandler: (() => void) | null = null
    let retryTimer: number | undefined
    let giveUpTimer: number | undefined
    let attempts = 0

    const gestureOpts: AddEventListenerOptions = { capture: true, passive: true }
    const gestureEvents = ['pointerdown', 'touchstart', 'keydown'] as const

    const unlockOnGesture = () => {
      for (const evt of gestureEvents) {
        window.removeEventListener(evt, unlockOnGesture, gestureOpts)
      }
      if (cancelled || playingRef.current) return

      const mix = genres.find((g) => g.id === activeIdRef.current) ?? genres[0]
      const widget = widgetRef.current
      if (widget) {
        introSeekedKeyRef.current = null
        try {
          widget.load(mix.key, true)
        } catch {
          try {
            widget.play()
          } catch {
            /* ignore */
          }
        }
      } else if (iframeRef.current) {
        introSeekedKeyRef.current = null
        iframeRef.current.src = widgetSrc(mix.feed, true)
      }
      setNeedsGesture(false)
    }

    for (const evt of gestureEvents) {
      window.addEventListener(evt, unlockOnGesture, gestureOpts)
    }

    loadWidgetApi()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.Mixcloud?.PlayerWidget) return
        const widget = window.Mixcloud.PlayerWidget(iframeRef.current)
        widgetRef.current = widget
        return widget.ready.then(() => {
          if (cancelled) return
          playHandler = () => {
            if (retryTimer) window.clearInterval(retryTimer)
            onPlay()
            skipIntroSilence(widget)
          }
          pauseHandler = () => onPause()
          widget.events.play.on(playHandler)
          widget.events.pause.on(pauseHandler)
          setWidgetReady(true)

          const tryPlay = () => {
            if (cancelled || playingRef.current) return
            attempts += 1
            try {
              widget.play()
            } catch {
              /* autoplay may be blocked */
            }
            if (attempts === 3 && iframeRef.current) {
              // One hard reload with autoplay flag if early attempts fail.
              iframeRef.current.src = widgetSrc(feedRef.current, true)
            }
          }

          tryPlay()
          const armed = listenAutoplayArmed()
          retryTimer = window.setInterval(tryPlay, armed ? 350 : 450)
          giveUpTimer = window.setTimeout(() => {
            if (retryTimer) window.clearInterval(retryTimer)
            if (!cancelled && !playingRef.current) setNeedsGesture(true)
            clearListenAutoplayArm()
          }, armed ? 5000 : 2800)
        })
      })
      .catch(() => {
        if (!cancelled) {
          // Widget API failed — still rely on iframe autoplay=1 + gesture unlock.
          giveUpTimer = window.setTimeout(() => {
            if (!cancelled && !playingRef.current) setNeedsGesture(true)
          }, 2000)
        }
      })

    return () => {
      cancelled = true
      if (retryTimer) window.clearInterval(retryTimer)
      if (giveUpTimer) window.clearTimeout(giveUpTimer)
      for (const evt of gestureEvents) {
        window.removeEventListener(evt, unlockOnGesture, gestureOpts)
      }
      const widget = widgetRef.current
      if (widget && playHandler && pauseHandler) {
        widget.events.play.off(playHandler)
        widget.events.pause.off(pauseHandler)
      }
      widgetRef.current = null
      setWidgetReady(false)
    }
  }, [])

  const selectGenre = (id: GenreId) => {
    if (id === activeIdRef.current) {
      if (!playing) startPlayback()
      return
    }
    const next = genres.find((g) => g.id === id)
    if (!next) return
    setActiveId(id)
    activeIdRef.current = id
    setNeedsGesture(false)

    const widget = widgetRef.current
    if (widget && widgetReady) {
      introSeekedKeyRef.current = null
      widget.load(next.key, true)
      return
    }

    const iframe = iframeRef.current
    if (iframe) {
      introSeekedKeyRef.current = null
      iframe.src = widgetSrc(next.feed, true)
    }
  }

  const startPlayback = () => {
    setNeedsGesture(false)
    const mix = genres.find((g) => g.id === activeIdRef.current) ?? genres[0]
    const widget = widgetRef.current
    if (widget) {
      introSeekedKeyRef.current = null
      try {
        widget.load(mix.key, true)
      } catch {
        widget.play()
      }
      return
    }
    const iframe = iframeRef.current
    if (iframe) {
      introSeekedKeyRef.current = null
      iframe.src = widgetSrc(mix.feed, true)
    }
  }

  return (
    <section className="section listen" id="listen">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.35)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <p className="eyebrow">Listen</p>
          <h2 className="section-title">Hear the selection</h2>
          <p className="section-copy">
            Afrobeats starts automatically — tap another genre to switch the mix
            instantly, without leaving the site.
          </p>
        </motion.div>

        <motion.div
          className="listen-deck"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.2)}
          transition={motionTransition({ duration: 0.75, delay: 0.06 })}
        >
          <div className="listen-deck-stage" data-playing={playing ? 'true' : 'false'}>
            <button
              type="button"
              className="listen-deck-art"
              aria-label={playing ? `${active.label} playing` : `Play ${active.label}`}
              onClick={() => {
                if (!playing) startPlayback()
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.art}
                  alt=""
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={motionTransition({ duration: 0.45 })}
                />
              </AnimatePresence>
              <div className="listen-deck-veil" />
              <div className={`listen-eq ${playing ? 'is-live' : ''}`} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              {!playing && (
                <span className="listen-art-play" aria-hidden="true">
                  <i />
                </span>
              )}
            </button>

            <div className="listen-deck-main">
              <div className="listen-now">
                <span className="listen-now-label">
                  {playing ? 'Now playing' : needsGesture ? 'Ready' : 'Queued'}
                </span>
                <AnimatePresence mode="sync">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, position: 'absolute', y: -6 }}
                    transition={motionTransition({ duration: 0.28 })}
                  >
                    <h3 className="listen-now-title">{active.title}</h3>
                    <p className="listen-now-meta">
                      {active.label} · {active.duration}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                className="listen-genres"
                role="tablist"
                aria-label="Choose a mix genre"
              >
                {genres.map((genre) => {
                  const selected = genre.id === activeId
                  return (
                    <button
                      key={genre.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className={`listen-genre${selected ? ' is-active' : ''}`}
                      onClick={() => selectGenre(genre.id)}
                    >
                      {genre.label}
                    </button>
                  )
                })}
              </div>

              <div className="listen-player">
                {needsGesture && (
                  <button
                    type="button"
                    className="listen-tap"
                    onClick={startPlayback}
                  >
                    <span className="listen-tap-icon" aria-hidden="true" />
                    Tap to start · {active.label}
                  </button>
                )}
                <iframe
                  ref={iframeRef}
                  title={`DJ RHUE — ${active.label} mix`}
                  width="100%"
                  height="60"
                  allow="autoplay; encrypted-media; fullscreen"
                  loading="eager"
                  src={widgetSrc(genres[0].feed, true)}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="listen-video"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.2)}
          transition={motionTransition({ duration: 0.75, delay: 0.1 })}
        >
          <div className="listen-video-head">
            <p className="eyebrow">On video</p>
            <h3 className="listen-video-title">Watch a set</h3>
            <p className="section-copy">
              Full mix energy on YouTube — plays right here on the page.
            </p>
          </div>
          <div className="listen-embed">
            <iframe
              title="DJ RHUE on YouTube — latest mix"
              width="100%"
              height="400"
              src={YOUTUBE_EMBED}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="listen-links">
            <a
              className="btn btn-ghost"
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
            >
              All mixes on YouTube
            </a>
          </div>
        </motion.div>

        <motion.aside
          className="listen-mixcloud"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.25)}
          transition={motionTransition({ duration: 0.6, delay: 0.08 })}
        >
          <div>
            <p className="eyebrow">Also on Mixcloud</p>
            <h3 className="listen-mixcloud-title">Hear me on Mixcloud</h3>
            <p className="section-copy">
              Full archive of DJ RHUE sets — same selection energy, host profile
              and more uploads.
            </p>
          </div>
          <a
            className="btn btn-ghost"
            href={MIXCLOUD_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Mixcloud
          </a>
        </motion.aside>
      </div>
    </section>
  )
}
