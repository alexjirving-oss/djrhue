import type { Transition, Variants } from 'framer-motion'

/** Respect prefers-reduced-motion for Framer transitions. */
export function motionTransition(
  transition: Transition,
  reduced: Transition = { duration: 0 },
): Transition {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return reduced
  }
  return transition
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function viewportOnce(amount = 0.3) {
  return { once: true, amount } as const
}
