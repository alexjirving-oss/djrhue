import { useEffect, useRef, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isIosDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua)
  const iPadOs = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  return iOS || iPadOs
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
  const [canPrompt, setCanPrompt] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [showIosHint, setShowIosHint] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (isStandaloneDisplay()) {
      setHidden(true)
      return
    }

    if (isIosDevice()) setIsIos(true)

    const onBip = (e: Event) => {
      e.preventDefault()
      deferred.current = e as BeforeInstallPromptEvent
      setCanPrompt(true)
      setShowIosHint(false)
    }

    window.addEventListener('beforeinstallprompt', onBip)
    return () => window.removeEventListener('beforeinstallprompt', onBip)
  }, [])

  if (hidden || (!canPrompt && !isIos)) return null

  const onInstall = async () => {
    const event = deferred.current
    if (!event) {
      setShowIosHint(true)
      return
    }
    setBusy(true)
    try {
      await event.prompt()
      const { outcome } = await event.userChoice
      if (outcome === 'accepted') setHidden(true)
      deferred.current = null
      setCanPrompt(false)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="install-app">
      <button
        type="button"
        className="btn btn-ghost install-app-btn"
        onClick={onInstall}
        disabled={busy}
        aria-expanded={isIos && !canPrompt ? showIosHint : undefined}
      >
        Add to Home Screen
      </button>
      {isIos && !canPrompt && showIosHint ? (
        <p className="install-app-hint">
          Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
        </p>
      ) : null}
    </div>
  )
}
