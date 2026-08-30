import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

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
  /** Exact playback position requested after the mix starts. */
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
    startAt: 3,
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
    startAt: 4,
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
    startAt: 5,
  },
]

type MixcloudWidget = {
  ready: Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  load: (cloudcastKey: string, startPlaying?: boolean) => Promise<void>
  seek: (seconds: number) => Promise<void>
  getPosition: () => Promise<number>
  getIsPaused: () => Promise<boolean>
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

type PlaybackIntent = {
  mix: GenreMix
  source: 'autoplay' | 'gesture'
}

const PLAYBACK_VERIFY_DELAYS = [250, 650, 1200] as const
const INTRO_SEEK_DELAYS = [120, 300, 650, 1100, 1800] as const

let widgetApiPromise: Promise<void> | null = null

function widgetSrc(feed: string) {
  const params = new URLSearchParams({
    hide_cover: '1',
    mini: '1',
    light: '0',
    feed,
    autoplay: '1',
  })
  return `https://www.mixcloud.com/widget/iframe/?${params.toString()}`
}

function loadWidgetApi(): Promise<void> {
  if (window.Mixcloud?.PlayerWidget) return Promise.resolve()
  if (widgetApiPromise) return widgetApiPromise

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_API}"]`)
  widgetApiPromise = new Promise((resolve, reject) => {
    if (existing) {
      if (window.Mixcloud?.PlayerWidget) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Mixcloud widget failed')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = WIDGET_API
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Mixcloud widget failed'))
    document.body.appendChild(script)
  })

  widgetApiPromise = widgetApiPromise.catch((error) => {
    widgetApiPromise = null
    throw error
  })
  return widgetApiPromise
}

function mixForId(id: GenreId): GenreMix {
  return genres.find((g) => g.id === id) ?? genres[0]
}

function mixForKey(key: string | null): GenreMix | null {
  return genres.find((g) => g.key === key) ?? null
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export function Listen() {
  const [activeId, setActiveId] = useState<GenreId>('afrobeats')
  const [playing, setPlaying] = useState(false)
  const [starting, setStarting] = useState(false)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<MixcloudWidget | null>(null)
  const widgetReadyRef = useRef(false)
  const activeIdRef = useRef(activeId)
  const playingRef = useRef(false)
  const mountedRef = useRef(false)
  const loadedKeyRef = useRef(genres[0].key)
  const loadingKeyRef = useRef<string | null>(null)
  const pendingIntentRef = useRef<PlaybackIntent | null>(null)
  const playbackInFlightRef = useRef(false)
  const playbackInFlightKeyRef = useRef<string | null>(null)
  const playbackRunRef = useRef(0)
  const runPlaybackIntentRef = useRef<(intent: PlaybackIntent) => void>(() => undefined)
  const firstGestureHandledRef = useRef(false)
  /** Mixcloud key verified at its requested start position. */
  const introSeekedKeyRef = useRef<string | null>(null)
  const introSeekingKeyRef = useRef<string | null>(null)
  const introSeekRunRef = useRef(0)
  const seekTimersRef = useRef<number[]>([])

  activeIdRef.current = activeId

  const active = mixForId(activeId)

  const clearSeekTimers = useCallback(() => {
    for (const id of seekTimersRef.current) window.clearTimeout(id)
    seekTimersRef.current = []
  }, [])

  const cancelIntroSeek = useCallback(() => {
    introSeekRunRef.current += 1
    introSeekingKeyRef.current = null
    clearSeekTimers()
  }, [clearSeekTimers])

  const seekPastIntro = useCallback(
    (widget: MixcloudWidget, mix: GenreMix) => {
      if (
        introSeekedKeyRef.current === mix.key ||
        introSeekingKeyRef.current === mix.key
      ) {
        return
      }
      if (mix.startAt === 0) {
        introSeekedKeyRef.current = mix.key
        return
      }

      cancelIntroSeek()
      const runId = introSeekRunRef.current
      const target = mix.startAt
      let attempt = 0
      introSeekingKeyRef.current = mix.key

      const scheduleNext = () => {
        if (runId !== introSeekRunRef.current) return
        if (attempt >= INTRO_SEEK_DELAYS.length) {
          introSeekingKeyRef.current = null
          return
        }

        const delay = INTRO_SEEK_DELAYS[attempt]
        attempt += 1
        const timer = window.setTimeout(async () => {
          if (
            runId !== introSeekRunRef.current ||
            activeIdRef.current !== mix.id
          ) {
            return
          }

          try {
            await widget.seek(target)
            await wait(120)
            if (runId !== introSeekRunRef.current) return

            const position = await widget.getPosition()
            if (Number.isFinite(position) && position >= target - 0.25) {
              introSeekedKeyRef.current = mix.key
              introSeekingKeyRef.current = null
              introSeekRunRef.current += 1
              clearSeekTimers()
              return
            }
          } catch {
            // The widget can reject while the new mix is still buffering.
          }

          scheduleNext()
        }, delay)
        seekTimersRef.current.push(timer)
      }

      scheduleNext()
    },
    [cancelIntroSeek, clearSeekTimers],
  )

  const markPlaying = useCallback(
    (widget: MixcloudWidget, mix: GenreMix) => {
      if (!mountedRef.current || activeIdRef.current !== mix.id) return
      playingRef.current = true
      setPlaying(true)
      setStarting(false)
      setNeedsGesture(false)
      seekPastIntro(widget, mix)
    },
    [seekPastIntro],
  )

  const verifyPlayback = useCallback(
    async (widget: MixcloudWidget, mix: GenreMix, runId: number) => {
      for (const delay of PLAYBACK_VERIFY_DELAYS) {
        await wait(delay)
        if (
          !mountedRef.current ||
          runId !== playbackRunRef.current ||
          activeIdRef.current !== mix.id
        ) {
          return false
        }
        if (playingRef.current) return true

        try {
          const isPaused = await widget.getIsPaused()
          if (isPaused === false) {
            markPlaying(widget, mix)
            return true
          }
        } catch {
          // Retry: postMessage getters can fail while the player is buffering.
        }
      }
      return false
    },
    [markPlaying],
  )

  const runPlaybackIntent = useCallback(
    async (intent: PlaybackIntent) => {
      const widget = widgetRef.current
      if (!widget || !widgetReadyRef.current) {
        pendingIntentRef.current = intent
        return
      }
      if (playbackInFlightRef.current) {
        if (playbackInFlightKeyRef.current !== intent.mix.key) {
          pendingIntentRef.current = intent
        }
        return
      }
      if (
        playingRef.current &&
        loadedKeyRef.current === intent.mix.key &&
        loadingKeyRef.current === null
      ) {
        setStarting(false)
        return
      }

      playbackInFlightRef.current = true
      playbackInFlightKeyRef.current = intent.mix.key
      const runId = playbackRunRef.current + 1
      playbackRunRef.current = runId
      const isNewMix = loadedKeyRef.current !== intent.mix.key
      let commandSucceeded = true

      try {
        if (isNewMix) {
          loadingKeyRef.current = intent.mix.key
          cancelIntroSeek()
          introSeekedKeyRef.current = null
          try {
            // startPlaying is sent with the load during the originating click.
            await widget.load(intent.mix.key, true)
            loadedKeyRef.current = intent.mix.key
          } catch {
            commandSucceeded = false
          } finally {
            if (loadingKeyRef.current === intent.mix.key) {
              loadingKeyRef.current = null
            }
          }
        } else {
          try {
            // The initial Afrobeats iframe is already loaded; never reload it.
            await widget.play()
          } catch {
            // A rejected command can still race with a real play event, so verify.
          }
        }

        const started =
          commandSucceeded && (await verifyPlayback(widget, intent.mix, runId))
        if (
          !started &&
          mountedRef.current &&
          runId === playbackRunRef.current &&
          activeIdRef.current === intent.mix.id
        ) {
          playingRef.current = false
          setPlaying(false)
          setStarting(false)
          setNeedsGesture(true)
        }
      } finally {
        if (runId === playbackRunRef.current) {
          playbackInFlightRef.current = false
          playbackInFlightKeyRef.current = null
        }

        const next = pendingIntentRef.current
        pendingIntentRef.current = null
        if (
          next &&
          mountedRef.current &&
          activeIdRef.current === next.mix.id
        ) {
          window.queueMicrotask(() => runPlaybackIntentRef.current(next))
        }
      }
    },
    [cancelIntroSeek, verifyPlayback],
  )

  runPlaybackIntentRef.current = (intent) => {
    void runPlaybackIntent(intent)
  }

  const requestPlayback = useCallback((mix: GenreMix, source: PlaybackIntent['source']) => {
    setNeedsGesture(false)
    if (
      playingRef.current &&
      loadedKeyRef.current === mix.key &&
      loadingKeyRef.current === null
    ) {
      setStarting(false)
      return
    }

    setStarting(true)
    const intent = { mix, source }
    if (!widgetRef.current || !widgetReadyRef.current) {
      pendingIntentRef.current = intent
      return
    }
    if (playbackInFlightRef.current) {
      if (playbackInFlightKeyRef.current !== mix.key) {
        pendingIntentRef.current = intent
      }
      return
    }
    runPlaybackIntentRef.current(intent)
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    mountedRef.current = true
    let cancelled = false
    let playHandler: (() => void) | null = null
    let pauseHandler: (() => void) | null = null

    const gestureOpts: AddEventListenerOptions = { capture: true, passive: true }
    const gestureEvents = ['pointerdown', 'touchstart', 'keydown'] as const

    const removeGestureListeners = () => {
      for (const evt of gestureEvents) {
        window.removeEventListener(evt, unlockOnGesture, gestureOpts)
      }
    }

    const unlockOnGesture = (event: Event) => {
      if (
        event instanceof KeyboardEvent &&
        event.key !== 'Enter' &&
        event.key !== ' '
      ) {
        return
      }
      removeGestureListeners()
      if (cancelled || firstGestureHandledRef.current || playingRef.current) return
      firstGestureHandledRef.current = true

      // Listen controls execute their own click intent; capture must not pre-empt it.
      const target = event.target
      if (target instanceof Element && target.closest('.listen-deck-stage button')) {
        return
      }
      requestPlayback(mixForId(activeIdRef.current), 'gesture')
    }

    for (const evt of gestureEvents) {
      window.addEventListener(evt, unlockOnGesture, gestureOpts)
    }

    const onIframeLoad = () => {
      if (cancelled || widgetRef.current) return
      loadWidgetApi()
        .then(() => {
          if (cancelled || !iframeRef.current || !window.Mixcloud?.PlayerWidget) return
          if (widgetRef.current) return
          const widget = window.Mixcloud.PlayerWidget(iframeRef.current)
          widgetRef.current = widget
          return widget.ready.then(() => {
            if (cancelled) return
            bindWidget(widget)
          })
        })
        .catch(() => {
          if (!cancelled) {
            // Keep the native dark iframe available if the control API fails.
            setWidgetReady(true)
            setStarting(false)
          }
        })
    }

    const bindWidget = (widget: MixcloudWidget) => {
      playHandler = () => {
        const mix =
          mixForKey(loadingKeyRef.current ?? loadedKeyRef.current) ??
          mixForId(activeIdRef.current)
        markPlaying(widget, mix)
      }
      pauseHandler = () => {
        playingRef.current = false
        setPlaying(false)
      }
      widget.events.play.on(playHandler)
      widget.events.pause.on(pauseHandler)
      widgetReadyRef.current = true
      setWidgetReady(true)

      const pending = pendingIntentRef.current
      pendingIntentRef.current = null
      if (pending) {
        requestPlayback(pending.mix, pending.source)
      } else {
        requestPlayback(mixForId(activeIdRef.current), 'autoplay')
      }
    }

    iframe.addEventListener('load', onIframeLoad)
    onIframeLoad()

    return () => {
      cancelled = true
      mountedRef.current = false
      playbackRunRef.current += 1
      cancelIntroSeek()
      iframe.removeEventListener('load', onIframeLoad)
      removeGestureListeners()
      const widget = widgetRef.current
      if (widget && playHandler && pauseHandler) {
        widget.events.play.off(playHandler)
        widget.events.pause.off(pauseHandler)
      }
      widgetRef.current = null
      widgetReadyRef.current = false
      playbackInFlightRef.current = false
      playbackInFlightKeyRef.current = null
      pendingIntentRef.current = null
      loadingKeyRef.current = null
      loadedKeyRef.current = genres[0].key
      firstGestureHandledRef.current = false
      setWidgetReady(false)
    }
  }, [cancelIntroSeek, markPlaying, requestPlayback])

  const selectGenre = (id: GenreId) => {
    if (id === activeIdRef.current) {
      if (!playingRef.current) requestPlayback(mixForId(id), 'gesture')
      return
    }
    const next = mixForId(id)
    setActiveId(id)
    activeIdRef.current = id
    playingRef.current = false
    setPlaying(false)
    setNeedsGesture(false)
    requestPlayback(next, 'gesture')
  }

  const startPlayback = () => {
    requestPlayback(mixForId(activeIdRef.current), 'gesture')
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
            Afrobeats, Dancehall, Amapiano, Reggae, Hip Hop and R&amp;B mixes — the
            same Caribbean and urban energy you&apos;ll hear at clubs, carnivals and
            private events.
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
              aria-label={
                playing
                  ? `${active.label} playing`
                  : starting
                    ? `Starting ${active.label}`
                    : `Play ${active.label}`
              }
              aria-busy={starting}
              onClick={startPlayback}
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
                <span
                  className={`listen-art-play${starting ? ' is-starting' : ''}`}
                  aria-hidden="true"
                >
                  <i />
                </span>
              )}
            </button>

            <div className="listen-deck-main">
              <div className="listen-now">
                <span className="listen-now-label">
                  {playing
                    ? 'Now playing'
                    : starting
                      ? 'Starting'
                      : needsGesture
                        ? 'Ready'
                        : 'Queued'}
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

              <div
                className={`listen-player${widgetReady ? ' is-ready' : ''}`}
                data-loading={widgetReady ? 'false' : 'true'}
              >
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
                  src={widgetSrc(genres[0].feed)}
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
