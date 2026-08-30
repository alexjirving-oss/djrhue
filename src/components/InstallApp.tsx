import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './InstallApp.css'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallPlatform = 'android' | 'ios' | 'other'
type IOSBrowser = 'safari' | 'chrome' | 'firefox' | 'edge' | 'opera' | 'embedded' | 'other'
type InstallFallback = Exclude<InstallPlatform, 'ios'>
type CopyStatus = 'idle' | 'copied' | 'error'

const INSTALL_URL = 'https://djrhue.com/'

function getIOSBrowser(userAgent: string): IOSBrowser {
  if (
    /FBAN|FBAV|FB_IAB|Instagram|TikTok|musical_ly|BytedanceWebview|Snapchat|Pinterest|LinkedInApp|MicroMessenger|Line\/|GSA\//i.test(
      userAgent,
    )
  ) {
    return 'embedded'
  }
  if (/CriOS\//i.test(userAgent)) return 'chrome'
  if (/FxiOS\//i.test(userAgent)) return 'firefox'
  if (/EdgiOS\//i.test(userAgent)) return 'edge'
  if (/OPiOS\//i.test(userAgent)) return 'opera'
  if (/Version\/[\d.]+.*Safari\//i.test(userAgent)) return 'safari'
  return 'other'
}

function getInstallContext(): { platform: InstallPlatform; iosBrowser: IOSBrowser } {
  if (typeof navigator === 'undefined') {
    return { platform: 'other', iosBrowser: 'other' }
  }

  const userAgent = navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent)
  const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1

  if (isIOS || isIPadOS) {
    return { platform: 'ios', iosBrowser: getIOSBrowser(userAgent) }
  }
  if (/Android/i.test(userAgent)) {
    return { platform: 'android', iosBrowser: 'other' }
  }
  return { platform: 'other', iosBrowser: 'other' }
}

function getIOSBrowserName(browser: IOSBrowser) {
  const names: Partial<Record<IOSBrowser, string>> = {
    safari: 'Safari',
    chrome: 'Chrome',
    firefox: 'Firefox',
    edge: 'Edge',
    opera: 'Opera',
  }
  return names[browser] ?? 'your browser'
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
  const installButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [installContext] = useState(() => getInstallContext())
  const [hint, setHint] = useState<InstallFallback | null>(null)
  const [installed, setInstalled] = useState(() => isStandaloneDisplay())
  const [busy, setBusy] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

  const { platform, iosBrowser } = installContext
  const requiresSafari = iosBrowser === 'embedded' || iosBrowser === 'other'
  const instructionBrowser = requiresSafari ? 'Safari' : getIOSBrowserName(iosBrowser)

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

    const onInstalled = () => {
      setDialogOpen(false)
      setInstalled(true)
    }
    const standaloneQuery = window.matchMedia('(display-mode: standalone)')
    const onDisplayModeChange = (event: MediaQueryListEvent) => {
      if (event.matches) onInstalled()
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

  useEffect(() => {
    if (!dialogOpen) return

    const body = document.body
    const root = document.documentElement
    const scrollY = window.scrollY
    const previouslyFocused = document.activeElement as HTMLElement | null
    const returnTarget = installButtonRef.current ?? previouslyFocused
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    }
    const previousScrollBehavior = root.style.scrollBehavior
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth)
    const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
    }

    const focusDialog = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setDialogOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const activeElement = document.activeElement
      if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.cancelAnimationFrame(focusDialog)
      document.removeEventListener('keydown', onKeyDown)

      body.style.overflow = previousBodyStyles.overflow
      body.style.position = previousBodyStyles.position
      body.style.top = previousBodyStyles.top
      body.style.left = previousBodyStyles.left
      body.style.right = previousBodyStyles.right
      body.style.width = previousBodyStyles.width
      body.style.paddingRight = previousBodyStyles.paddingRight

      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollY)
      root.style.scrollBehavior = previousScrollBehavior

      if (returnTarget?.isConnected) returnTarget.focus()
    }
  }, [dialogOpen])

  if (installed) return null

  const revealPlatformHint = () => setHint(platform === 'android' ? 'android' : 'other')

  const onInstall = async () => {
    if (platform === 'ios') {
      setHint(null)
      setCopyStatus('idle')
      setDialogOpen(true)
      return
    }

    const event = deferred.current

    if (!event) {
      revealPlatformHint()
      return
    }

    deferred.current = null
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
      setBusy(false)
    }
  }

  const copyInstallLink = async () => {
    let copied = false

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(INSTALL_URL)
        copied = true
      } catch {
        copied = false
      }
    }

    if (!copied) {
      const textarea = document.createElement('textarea')
      textarea.value = INSTALL_URL
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.append(textarea)
      textarea.select()

      try {
        copied = document.execCommand('copy')
      } catch {
        copied = false
      } finally {
        textarea.remove()
      }
    }

    setCopyStatus(copied ? 'copied' : 'error')
  }

  const hintId = hint ? 'install-app-hint' : undefined

  return (
    <>
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
                ref={installButtonRef}
                type="button"
                className="btn btn-primary install-promo__button"
                onClick={onInstall}
                disabled={busy}
                aria-haspopup={platform === 'ios' ? 'dialog' : undefined}
                aria-expanded={dialogOpen || Boolean(hint)}
                aria-controls={dialogOpen ? 'install-ios-dialog' : hintId}
                aria-describedby={`install-app-platform${hintId ? ` ${hintId}` : ''}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 16v3h14v-3" />
                </svg>
                {busy ? 'Opening install…' : 'Download our app'}
              </button>

              <div className="install-promo__feedback" aria-live="polite">
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

      {dialogOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="install-dialog-backdrop"
              onClick={(event) => {
                if (event.target === event.currentTarget) setDialogOpen(false)
              }}
            >
              <div
                ref={dialogRef}
                className="install-dialog"
                id="install-ios-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="install-ios-title"
                aria-describedby="install-ios-description install-ios-limitation"
                tabIndex={-1}
              >
                <span className="install-dialog__handle" aria-hidden="true" />
                <button
                  ref={closeButtonRef}
                  className="install-dialog__close"
                  type="button"
                  aria-label="Close install instructions"
                  onClick={() => setDialogOpen(false)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m7 7 10 10M17 7 7 17" />
                  </svg>
                </button>

                <header className="install-dialog__header">
                  <p className="install-dialog__eyebrow">iPhone &amp; iPad</p>
                  <h2 id="install-ios-title">Install DJ RHUE on iPhone</h2>
                  <p id="install-ios-description">
                    {requiresSafari
                      ? 'For the most reliable iPhone install, continue in Safari and use its Share menu.'
                      : `iOS does not show an automatic install prompt. Use ${instructionBrowser}’s Share menu to add DJ RHUE.`}
                  </p>
                </header>

                {requiresSafari ? (
                  <div className="install-dialog__handoff">
                    <span className="install-dialog__handoff-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="m14.9 9.1-1.8 4-4 1.8 1.8-4 4-1.8Z" />
                      </svg>
                    </span>
                    <span className="install-dialog__handoff-copy">
                      <strong>Open djrhue.com in Safari</strong>
                      <span>Copy the link, switch to Safari, then paste it in the address bar.</span>
                    </span>
                    <button
                      className="install-dialog__copy"
                      type="button"
                      onClick={copyInstallLink}
                      aria-label={
                        copyStatus === 'copied' ? 'DJ RHUE link copied' : 'Copy DJ RHUE link'
                      }
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        {copyStatus === 'copied' ? (
                          <path d="m6.5 12.5 3.2 3.2 7.8-8.1" />
                        ) : (
                          <>
                            <rect x="8" y="8" width="10" height="11" rx="2" />
                            <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </>
                        )}
                      </svg>
                      {copyStatus === 'copied' ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                ) : null}

                <ol className="install-dialog__steps">
                  <li>
                    <span className="install-dialog__step-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 15V3m0 0L8.5 6.5M12 3l3.5 3.5M5 11v8h14v-8" />
                      </svg>
                    </span>
                    <span className="install-dialog__step-copy">
                      <strong>Tap the browser Share icon</strong>
                      <span>Find it in {instructionBrowser}’s toolbar.</span>
                    </span>
                  </li>
                  <li>
                    <span className="install-dialog__step-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <rect x="4" y="4" width="16" height="16" rx="3" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                    </span>
                    <span className="install-dialog__step-copy">
                      <strong>Choose Add to Home Screen</strong>
                      <span>Scroll down in the Share menu if it is not visible.</span>
                    </span>
                  </li>
                  <li>
                    <span
                      className="install-dialog__step-icon install-dialog__step-icon--add"
                      aria-hidden="true"
                    >
                      Add
                    </span>
                    <span className="install-dialog__step-copy">
                      <strong>Tap Add</strong>
                      <span>Confirm in the top-right corner.</span>
                    </span>
                  </li>
                </ol>

                <p className="install-dialog__limitation" id="install-ios-limitation">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 10.5v6M12 7.5h.01" />
                  </svg>
                  iOS requires these manual steps; websites cannot install a Home Screen app
                  automatically.
                </p>

                <p className="install-dialog__status" role="status" aria-live="polite">
                  {copyStatus === 'copied'
                    ? 'Link copied. Open Safari and paste it in the address bar.'
                    : null}
                  {copyStatus === 'error'
                    ? 'Copy did not work. Press and hold djrhue.com above to copy it.'
                    : null}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
