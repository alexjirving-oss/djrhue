import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

export function About() {
  return (
    <section className="section about" id="about">
      <div className="about-stage">
        <motion.div
          className="about-main"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.15)}
          transition={motionTransition({ duration: 0.85, ease: [0.22, 1, 0.36, 1] })}
        >
          <img
            src="/photos/press-full.jpg"
            alt="DJ RHUE full press portrait — Bristol Afrobeats and Dancehall DJ"
            loading="lazy"
          />
          <motion.figure
            className="about-float"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce(0.2)}
            transition={motionTransition({ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] })}
          >
            <img
              src="/photos/perf-trinidad.jpg"
              alt="DJ RHUE live at St Paul's Carnival Bristol with Trinidad & Tobago flag"
              loading="lazy"
            />
          </motion.figure>
        </motion.div>

        <motion.div
          className="about-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.2)}
          transition={motionTransition({ duration: 0.8, ease: [0.22, 1, 0.36, 1] })}
        >
          <p className="eyebrow">About DJ RHUE</p>
          <h2 className="section-title">Built for crowds that came to move</h2>
          <div className="gold-rule" />
          <p className="section-copy">
            Bristol-based Afrobeats and Dancehall DJ with roots in Caribbean and
            urban nightlife. Sets are tailored in real time — warm-up grooves
            through to peak-time pressure — for clubs, festivals, private events
            and Malta stages across the UK.
          </p>
          <p className="section-copy about-seo">
            Available for DJ hire in Bristol and nationwide — club nights, St
            Paul&apos;s Carnival, wedding receptions with Caribbean and Afrobeats
            programming, corporate functions and brand activations. As a
            Dancehall DJ in the UK with Malta bookings and radio sessions on
            SWU.FM and Rinse FM, RHUE brings the same energy from festival
            stages to intimate rooms.
          </p>
          <div className="about-meta">
            <span>Bristol, United Kingdom</span>
            <span>Malta</span>
          </div>
        </motion.div>
      </div>

      <div className="about-strip" aria-hidden="true">
        <img src="/photos/perf-cdj.jpg" alt="" loading="lazy" />
        <img src="/photos/perf-manoel.jpg" alt="" loading="lazy" />
        <img src="/photos/press-headphones-1.jpg" alt="" loading="lazy" />
      </div>
    </section>
  )
}
