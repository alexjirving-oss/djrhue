import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'
import './Listen.css'

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
  artPosition: string
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
    art: '/listen/afrobeats.webp',
    artPosition: '50% 20%',
    duration: '19:49',
    startAt: 3,
  },
  {
    id: 'dancehall',
    label: 'Dancehall',
    title: 'Trending Dancehall Mix',
    key: '/DJRHUE/dj-rhue-trending-dancehall-mix-high-energy-vybz-kartel-kraff/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-trending-dancehall-mix-high-energy-vybz-kartel-kraff/',
    art: '/listen/dancehall.webp',
    artPosition: '50% 24%',
    duration: '18:26',
    startAt: 0,
  },
  {
    id: 'amapiano',
    label: 'Amapiano',
    title: 'Amapiano Radio Mix',
    key: '/DJRHUE/dj-rhue-amapiano-radio-mix/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-amapiano-radio-mix/',
    art: '/listen/amapiano.webp',
    artPosition: '60% 50%',
    duration: '18:32',
    startAt: 4,
  },
  {
    id: 'reggae',
    label: 'Reggae',
    title: 'Reggae Mix — Sean Paul, Chronixx+',
    key: '/DJRHUE/dj-rhue-reggae-mix-sean-paul-chronixx/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-reggae-mix-sean-paul-chronixx/',
    art: '/listen/reggae.webp',
    artPosition: '50% 25%',
    duration: '15:14',
    startAt: 4.1,
  },
  {
    id: 'hiphop',
    label: 'Hip Hop & R&B',
    title: 'R&B, Afrobeats & Dancehall Party Mix',
    key: '/DJRHUE/dj-rhue-rb-afrobeats-dancehall-party-mix-2026/',
    feed: 'https://www.mixcloud.com/DJRHUE/dj-rhue-rb-afrobeats-dancehall-party-mix-2026/',
    art: '/listen/hiphop.webp',
    artPosition: '54% 50%',
    duration: '40:42',
    startAt: 5,
  },
]

type MixcloudWidget = {
  ready: Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  load: (cloudcastKey: string, startPlaying?: boolean) => Promise<void>
  seek: (seconds: number) => Promise<boolean>
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
  const [, setStarting] = useState(false)
  const [, setNeedsGesture] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)
  const [artSwitching, setArtSwitching] = useState(false)
  const [playbackError, setPlaybackError] = useState<string | null>(null)
  const [coverReady, setCoverReady] = useState(false)
  const [widgetPainted, setWidgetPainted] = useState(false)
  const [nativeFallback, setNativeFallback] = useState(false)
  const [playAttempts, setPlayAttempts] = useState(0)
  const [loadAttempts, setLoadAttempts] = useState(0)
  const [lastPlayUserActivated, setLastPlayUserActivated] = useState('none')

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
  const coldAutoplayAttemptedRef = useRef(false)
  const iframeLoadedRef = useRef(false)
  const initializeWidgetRef = useRef<() => void>(() => undefined)
  /** Mixcloud key verified at its requested start position. */
  const introSeekedKeyRef = useRef<string | null>(null)
  const introSeekingKeyRef = useRef<string | null>(null)
  const introSeekRunRef = useRef(0)
  const seekTimersRef = useRef<number[]>([])
  const paintTimerRef = useRef<number | null>(null)

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

  const revealWidgetAfterPaint = useCallback(
    (mix: GenreMix, runId?: number, delay = 5000) => {
      if (paintTimerRef.current !== null) {
        window.clearTimeout(paintTimerRef.current)
      }
      paintTimerRef.current = window.setTimeout(() => {
        paintTimerRef.current = null
        if (
          !mountedRef.current ||
          activeIdRef.current !== mix.id ||
          (runId !== undefined && runId !== playbackRunRef.current)
        ) {
          return
        }
        setWidgetPainted(true)
      }, delay)
    },
    [],
  )

  const seekPastIntro = useCallback(
    (widget: MixcloudWidget, mix: GenreMix) => {
      if (
        introSeekedKeyRef.current === mix.key ||
        introSeekingKeyRef.current === mix.key
      ) {
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
          if (activeIdRef.current === mix.id) {
            setPlaybackError('Mix started, but the intro position could not be set.')
          }
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
            const seekAllowed = await widget.seek(target)
            if (!seekAllowed) {
              scheduleNext()
              return
            }
            await wait(120)
            if (runId !== introSeekRunRef.current) return

            const position = await widget.getPosition()
            if (
              Number.isFinite(position) &&
              position >= target - 0.25 &&
              position <= target + 1.5
            ) {
              introSeekedKeyRef.current = mix.key
              introSeekingKeyRef.current = null
              introSeekRunRef.current += 1
              setPlaybackError(null)
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
      setPlaybackError(null)
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
        try {
          const isPaused = await widget.getIsPaused()
          if (isPaused === false) {
            markPlaying(widget, mix)
            return true
          }
          playingRef.current = false
          setPlaying(false)
        } catch {
          // Retry: postMessage getters can fail while the player is buffering.
        }
      }
      return false
    },
    [markPlaying],
  )

  const verifyInitialAutoplay = useCallback(
    (widget: MixcloudWidget, mix: GenreMix) => {
      if (coldAutoplayAttemptedRef.current) return
      coldAutoplayAttemptedRef.current = true

      const runId = playbackRunRef.current + 1
      playbackRunRef.current = runId

      let playCommand: Promise<void>
      try {
        // This is the single cold-load autoplay attempt. It is expected to be
        // policy-blocked on many mobile browsers and is never retried.
        setPlayAttempts((count) => count + 1)
        setLastPlayUserActivated(
          window.navigator.userActivation?.isActive ? 'true' : 'false',
        )
        playCommand = widget.play()
      } catch {
        playCommand = Promise.resolve()
      }

      void (async () => {
        try {
          await playCommand
        } catch {
          // Verify state because the widget event can still win this race.
        }
        const started = await verifyPlayback(widget, mix, runId)
        if (
          !started &&
          mountedRef.current &&
          runId === playbackRunRef.current &&
          activeIdRef.current === mix.id
        ) {
          setNeedsGesture(true)
        }
      })()
    },
    [verifyPlayback],
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
          setArtSwitching(true)
          setWidgetPainted(false)
          setNativeFallback(false)
          if (paintTimerRef.current !== null) {
            window.clearTimeout(paintTimerRef.current)
            paintTimerRef.current = null
          }
          cancelIntroSeek()
          introSeekedKeyRef.current = null
          try {
            // Stop the previous media before loading so its still-playing state
            // cannot be mistaken for confirmation that the new mix started.
            void widget.pause().catch(() => undefined)
            // startPlaying is sent with the one load during the originating click.
            setLoadAttempts((count) => count + 1)
            const loadCommand = widget.load(intent.mix.key, true)
            revealWidgetAfterPaint(intent.mix, runId)
            await loadCommand
            if (
              runId === playbackRunRef.current &&
              activeIdRef.current === intent.mix.id
            ) {
              loadedKeyRef.current = intent.mix.key
              revealWidgetAfterPaint(intent.mix, runId, 1400)
            }
          } catch {
            commandSucceeded = false
            if (
              mountedRef.current &&
              runId === playbackRunRef.current &&
              activeIdRef.current === intent.mix.id
            ) {
              setPlaybackError('Mix failed to load. Try again.')
            }
          } finally {
            if (loadingKeyRef.current === intent.mix.key) {
              loadingKeyRef.current = null
            }
            if (
              runId === playbackRunRef.current &&
              activeIdRef.current === intent.mix.id
            ) {
              setArtSwitching(false)
            }
          }
        } else {
          try {
            // The initial Afrobeats iframe is already loaded; never reload it.
            setPlayAttempts((count) => count + 1)
            setLastPlayUserActivated(
              window.navigator.userActivation?.isActive ? 'true' : 'false',
            )
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
          setStarting(false)
          setNeedsGesture(true)
          setNativeFallback(true)
          setPlaybackError(null)
        }
      } finally {
        if (runId === playbackRunRef.current) {
          playbackInFlightRef.current = false
          playbackInFlightKeyRef.current = null

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
      }
    },
    [cancelIntroSeek, revealWidgetAfterPaint, verifyPlayback],
  )

  runPlaybackIntentRef.current = (intent) => {
    void runPlaybackIntent(intent)
  }

  const requestPlayback = useCallback((mix: GenreMix) => {
    setNeedsGesture(false)
    setPlaybackError(null)
    if (
      playingRef.current &&
      loadedKeyRef.current === mix.key &&
      loadingKeyRef.current === null
    ) {
      setStarting(false)
      return
    }

    setStarting(true)
    const intent = { mix }
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

  const handleIframeLoad = useCallback(() => {
    iframeLoadedRef.current = true
    revealWidgetAfterPaint(mixForId(activeIdRef.current))
    initializeWidgetRef.current()
  }, [revealWidgetAfterPaint])

  useEffect(() => {
    mountedRef.current = true
    let cancelled = false
    let initializing = false
    let initializingWidget: MixcloudWidget | null = null
    let playHandler: (() => void) | null = null
    let pauseHandler: (() => void) | null = null

    const bindWidget = (widget: MixcloudWidget) => {
      playHandler = () => {
        const mix =
          mixForKey(loadingKeyRef.current ?? loadedKeyRef.current) ??
          mixForId(activeIdRef.current)
        const runId = playbackRunRef.current
        void (async () => {
          await wait(90)
          if (
            cancelled ||
            runId !== playbackRunRef.current ||
            activeIdRef.current !== mix.id
          ) {
            return
          }
          try {
            if ((await widget.getIsPaused()) === false) {
              markPlaying(widget, mix)
            }
          } catch {
            // The explicit playback verifier will perform further probes.
          }
        })()
      }
      pauseHandler = () => {
        playingRef.current = false
        setPlaying(false)
      }
      widget.events.play.on(playHandler)
      widget.events.pause.on(pauseHandler)
      widgetReadyRef.current = true
      setWidgetReady(true)
      revealWidgetAfterPaint(mixForId(activeIdRef.current), undefined, 1400)

      const pending = pendingIntentRef.current
      pendingIntentRef.current = null
      if (pending) {
        requestPlayback(pending.mix)
      } else {
        verifyInitialAutoplay(widget, mixForId(activeIdRef.current))
      }
    }

    const revealNativePlayer = () => {
      if (cancelled) return
      // Keep the native dark iframe available if the control API fails.
      setNativeFallback(true)
      setStarting(false)
      setPlaybackError(null)
      if (iframeLoadedRef.current) {
        revealWidgetAfterPaint(mixForId(activeIdRef.current))
      }
    }

    // Fetch the controller in parallel with the iframe, but never construct a
    // PlayerWidget until React receives the iframe's real load event.
    const apiPromise = loadWidgetApi()
    void apiPromise.catch(revealNativePlayer)

    const initializeWidget = () => {
      const iframe = iframeRef.current
      if (
        cancelled ||
        !iframe ||
        !iframeLoadedRef.current ||
        initializing ||
        widgetRef.current
      ) {
        return
      }

      initializing = true
      void apiPromise
        .then(() => {
          if (
            cancelled ||
            !iframeRef.current ||
            !window.Mixcloud?.PlayerWidget ||
            widgetRef.current
          ) {
            return
          }

          const widget = window.Mixcloud.PlayerWidget(iframeRef.current)
          initializingWidget = widget
          widgetRef.current = widget
          return widget.ready.then(() => {
            if (cancelled || widgetRef.current !== widget) return
            bindWidget(widget)
          })
        })
        .catch(() => {
          if (widgetRef.current === initializingWidget) {
            widgetRef.current = null
          }
          initializing = false
          revealNativePlayer()
        })
    }

    initializeWidgetRef.current = initializeWidget
    initializeWidget()

    return () => {
      cancelled = true
      mountedRef.current = false
      initializeWidgetRef.current = () => undefined
      playbackRunRef.current += 1
      cancelIntroSeek()
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
      introSeekedKeyRef.current = null
      playingRef.current = false
      if (paintTimerRef.current !== null) {
        window.clearTimeout(paintTimerRef.current)
        paintTimerRef.current = null
      }
      setWidgetReady(false)
    }
  }, [
    cancelIntroSeek,
    markPlaying,
    requestPlayback,
    revealWidgetAfterPaint,
    verifyInitialAutoplay,
  ])

  const selectGenre = (id: GenreId) => {
    if (id === activeIdRef.current) {
      return
    }
    const next = mixForId(id)
    setActiveId(id)
    activeIdRef.current = id
    setNeedsGesture(false)
    setCoverReady(false)
    setNativeFallback(false)
    requestPlayback(next)
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
          <div
            className="listen-deck-stage"
            data-playing={playing ? 'true' : 'false'}
            data-widget-ready={widgetReady ? 'true' : 'false'}
            data-api-play-attempts={playAttempts}
            data-load-attempts={loadAttempts}
            data-last-play-user-activated={lastPlayUserActivated}
            data-cover-ready={coverReady ? 'true' : 'false'}
            data-player-covered={
              !widgetPainted || artSwitching ? 'true' : 'false'
            }
            data-play-state={
              playing
                ? 'playing'
                : artSwitching
                  ? 'loading-mix'
                  : !coverReady
                    ? 'loading-art'
                  : widgetReady
                    ? 'ready'
                    : nativeFallback
                      ? 'native-fallback'
                      : 'loading-widget'
            }
          >
            <div
              className={`listen-deck-art${widgetReady ? ' is-ready' : ''}${artSwitching ? ' is-switching' : ''}`}
              aria-busy={!widgetReady || artSwitching || !coverReady}
            >
              <img
                className="listen-art-cover"
                key={active.id}
                src={active.art}
                alt=""
                style={{ objectPosition: active.artPosition }}
                onLoad={() => {
                  if (activeIdRef.current === active.id) setCoverReady(true)
                }}
              />
              <span className="listen-deck-veil" aria-hidden="true" />
              <div className={`listen-eq ${playing ? 'is-live' : ''}`} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="listen-deck-main">
              <div className="listen-now">
                <span className="listen-now-label">
                  {artSwitching
                    ? 'Loading'
                    : playing
                      ? 'Now playing'
                      : !widgetReady && !nativeFallback
                        ? 'Loading'
                        : 'Ready / paused'}
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
                className={`listen-player${widgetPainted ? ' is-painted' : ''}`}
                data-covered={!widgetPainted || artSwitching ? 'true' : 'false'}
              >
                <iframe
                  ref={iframeRef}
                  title={`DJ RHUE — ${active.label} Mixcloud player`}
                  width="100%"
                  height="60"
                  allow="autoplay *; encrypted-media *; fullscreen *"
                  loading="eager"
                  src={widgetSrc(genres[0].feed)}
                  onLoad={handleIframeLoad}
                />
                <span className="listen-player-cover" aria-hidden="true" />
              </div>

              {playbackError ? (
                <p className="listen-playback-error" role="status">
                  {playbackError}
                </p>
              ) : null}
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
