import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const shots = [
  {
    src: '/photos/perf-trinidad.jpg',
    alt: 'DJ RHUE on the decks at St Paul\'s Carnival Bristol — Trinidad & Tobago flag, outdoor carnival stage',
    wide: false,
  },
  {
    src: '/photos/perf-malta.jpg',
    alt: 'DJ RHUE performing Afrobeats and Dancehall at a packed club night in Malta — international DJ booking',
    wide: false,
  },
  {
    src: '/photos/perf-enzo.jpg',
    alt: 'DJ RHUE with Enzo at a live Bristol club event — peak-time urban and Caribbean set',
    wide: false,
  },
  {
    src: '/photos/perf-cdj.jpg',
    alt: 'DJ RHUE mixing on Pioneer CDJ-3000s at a Bristol club — professional club DJ performance',
    wide: true,
  },
  {
    src: '/photos/perf-bunjy.jpg',
    alt: 'DJ RHUE outdoor festival set with DJ Bunjy — Bristol carnival and summer stage energy',
    wide: false,
  },
  {
    src: '/photos/hero-black-gold.jpg',
    alt: 'DJ RHUE at a black-and-gold themed private event — corporate and celebration DJ hire Bristol',
    wide: true,
  },
  {
    src: '/photos/setup-outdoor-day.jpg',
    alt: 'Branded outdoor DJ booth with full PA system — day festival and carnival setup, Bristol',
    wide: false,
  },
  {
    src: '/photos/setup-outdoor-dusk.jpg',
    alt: 'Branded outdoor DJ booth at dusk — carnival and festival evening setup with lighting',
    wide: false,
  },
  {
    src: '/photos/perf-manoel.jpg',
    alt: 'DJ RHUE performing at Manoel Island Malta — filmed international session with harbour backdrop',
    wide: true,
  },
  {
    src: '/photos/press-gun.jpg',
    alt: 'DJ RHUE press portrait — Bristol Caribbean and urban DJ for clubs and radio',
    wide: false,
  },
  {
    src: '/photos/perf-white-close.jpg',
    alt: 'DJ RHUE close-up mixing a live Afrobeats and Dancehall set — club booth performance',
    wide: false,
  },
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close])

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <motion.div
          className="gallery-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.4)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <div>
            <p className="eyebrow">On Stage</p>
            <h2 className="section-title">Live in the booth</h2>
          </div>
          <p className="section-copy">
            Live moments from clubs, carnivals, fashion events, radio sessions
            and international bookings. Tap any photo to view full size.
          </p>
        </motion.div>
      </div>

      <div className="gallery-mosaic">
        {shots.map((shot, i) => (
          <motion.figure
            key={shot.src}
            className={shot.wide ? 'wide' : ''}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce(0.15)}
            transition={motionTransition({ duration: 0.55, delay: (i % 4) * 0.04 })}
          >
            <button
              type="button"
              className="gallery-trigger"
              onClick={() => setActive(i)}
              aria-label={`View: ${shot.alt}`}
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" />
              <figcaption>{shot.alt}</figcaption>
            </button>
          </motion.figure>
        ))}
      </div>

      {active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={shots[active].alt}
          onClick={close}
        >
          <button type="button" className="lightbox-close" onClick={close} aria-label="Close">
            ×
          </button>
          <img
            src={shots[active].src}
            alt={shots[active].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="lightbox-caption">{shots[active].alt}</p>
        </div>
      )}
    </section>
  )
}
