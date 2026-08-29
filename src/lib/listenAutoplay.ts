/** Mark that the visitor interacted — used to keep Listen autoplay retries hot. */
const KEY = 'djrhue-listen-autoplay'

export function armListenAutoplay() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* private mode */
  }
}

export function listenAutoplayArmed() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function clearListenAutoplayArm() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
