import { useEffect, useRef, useState } from 'react'
import './InstallApp.css'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallPlatform = 'android' | 'ios' | 'other'

function getInstallPlatform(): InstallPlatform {
  if (typeof navigator === 'undefined') return 'other'

  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua)
  const iPadOs = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1

  if (iOS || iPadOs) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'other'
}

function isStandaloneDisplay() {
  if (typeof window === 'undefined') return false
  const mq = window.matchMedia('(display-mode: standalone)').matches
  const iosStandalone =
    'standalone' in navigator &&
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  return mq || iosStandalone
}

export function InstallApp() {
  const deferred = useRef<BeforeInstallPromptEvent | null>(null)
  const [platform] = useState<InstallPlatform>(() => getInstallPlatform())
  const [hint, setHint] = useState<InstallPlatform | null>(null)
  const [installed, setInstalled] = useState(() => isStandaloneDisplay())
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (isStandaloneDisplay()) {
      setInstalled(true)
      return
    }

    const onBip = (e: Event) => {
      e.preventDefault()
      deferred.current = e as BeforeInstallPromptEvent
      setHint(null)
    }

    const onInstalled = () => setInstalled(true)
    const standaloneQuery = window.matchMedia('(display-mode: standalone)')
    const onDisplayModeChange = (event: MediaQueryListEvent) => {
      if (event.matches) setInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', onBip)
    window.addEventListener('appinstalled', onInstalled)
    standaloneQuery.addEventListener('change', onDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBip)
      window.removeEventListener('appinstalled', onInstalled)
      standaloneQuery.removeEventListener('change', onDisplayModeChange)
    }
  }, [])

  if (installed) return null

  const revealPlatformHint = () => setHint(platform)

  const onInstall = async () => {
    const event = deferred.current

    if (!event) {
      revealPlatformHint()
      return
    }

    setBusy(true)
    try {
      await event.prompt()
      const { outcome } = await event.userChoice
      if (outcome === 'accepted') {
        setInstalled(true)
      } else {
        revealPlatformHint()
      }
    } catch {
      revealPlatformHint()
    } finally {
      deferred.current = null
      setBusy(false)
    }
  }

  const hintId = hint ? 'install-app-hint' : undefined

  return (
    <section className="install-promo" aria-labelledby="install-app-title">
      <div className="container">
        <div className="install-promo__card">
          <div className="install-promo__icon" aria-hidden="true">
            <img src="/icons/icon-192.png" alt="" width="192" height="192" />
          </div>

          <div className="install-promo__copy">
            <p className="install-promo__label">
              <span>00</span> Mobile access
            </p>
            <h2 id="install-app-title">DJ RHUE app.</h2>
            <p>Mixes, bookings and The Room — one tap from your Home Screen.</p>
          </div>

          <div className="install-promo__actions">
            <p className="install-promo__platform" id="install-app-platform">
              Android <span aria-hidden="true">·</span> iPhone
            </p>
            <button
              type="button"
              className="btn btn-primary install-promo__button"
              onClick={onInstall}
              disabled={busy}
              aria-expanded={Boolean(hint)}
              aria-controls={hintId}
              aria-describedby={`install-app-platform${hintId ? ` ${hintId}` : ''}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 16v3h14v-3" />
              </svg>
              {busy ? 'Opening install…' : 'Download our app'}
            </button>

            <div className="install-promo__feedback" aria-live="polite">
              {hint === 'ios' ? (
                <p className="install-promo__hint" id={hintId}>
                  On iPhone, tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.
                </p>
              ) : null}
              {hint === 'android' ? (
                <p className="install-promo__hint" id={hintId}>
                  Open your browser menu, then tap <strong>Install app</strong> or{' '}
                  <strong>Add to Home screen</strong>.
                </p>
              ) : null}
              {hint === 'other' ? (
                <p className="install-promo__hint" id={hintId}>
                  Open djrhue.com on Android or iPhone to add the DJ RHUE app.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
