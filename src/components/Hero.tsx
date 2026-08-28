import { motion } from 'framer-motion'
import { motionTransition } from '../lib/motion'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <img src="/photos/perf-white.jpg" alt="" fetchPriority="high" />
      </div>
      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-content">
        <motion.img
          className="hero-brand"
          src="/brand/logo.png"
          alt="DJ RHUE"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={motionTransition({ duration: 1, ease: [0.22, 1, 0.36, 1] })}
        />

        <motion.h1
          className="hero-h1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition({ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] })}
        >
          <span className="hero-h1-name">DJ RHUE</span>
          <span className="hero-h1-meta">
            Bristol · Afrobeats · Dancehall · Amapiano · Reggae
          </span>
        </motion.h1>

        <motion.h2
          className="hero-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition({ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] })}
        >
          Caribbean heat.
          <br />
          Urban nights.
        </motion.h2>

        <motion.p
          className="hero-lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition({ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] })}
        >
          Afrobeats · Dancehall · Amapiano · Reggae — Bristol, United Kingdom &amp; Malta.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition({ duration: 0.85, delay: 0.34, ease: [0.22, 1, 0.36, 1] })}
        >
          <a className="btn btn-primary" href="#book">
            Book DJ RHUE
            <span className="hero-eq" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </span>
          </a>
          <a className="btn btn-ghost" href="#listen">
            Listen to mixes
          </a>
          <a
            className="btn btn-ghost hero-epk"
            href="/docs/DJ_RHUE_EPK_2026.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download EPK
          </a>
        </motion.div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
      </div>
    </section>
  )
}
