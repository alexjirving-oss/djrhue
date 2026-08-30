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
          </div>

          <div className="install-promo__actions">
            <div className="install-promo__availability" id="install-app-platform">
              <span className="install-promo__availability-label">Available on</span>
              <span className="install-promo__platform-marks">
                <span className="install-promo__platform-mark install-promo__platform-mark--apple">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.32.07 2.24.72 3.02.77 1.17-.24 2.29-.93 3.54-.84 1.5.12 2.63.71 3.38 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.42 4.11ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
                  </svg>
                  <span className="sr-only">iPhone / iOS</span>
                </span>
                <span className="install-promo__platform-mark install-promo__platform-mark--android">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M7.2 8.6a4.8 4.8 0 0 1 9.6 0M8.2 4.5 6.8 2.7m9 1.8 1.4-1.8M6.2 9h11.6v7.2H6.2zM4.2 10v5.2m15.6-5.2v5.2M8.7 16.2v4m6.6-4v4" />
                    <circle cx="9.3" cy="6.9" r=".55" />
                    <circle cx="14.7" cy="6.9" r=".55" />
                  </svg>
                  <span className="sr-only">Android</span>
                </span>
              </span>
            </div>
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
