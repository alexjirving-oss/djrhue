import { motion } from 'framer-motion'

const highlights = [
  'St Paul’s Carnival performer',
  'Guest DJ on SWU.FM / Rinse.FM',
  'Featured on Laid Blak Radio',
  'UK clubs, festivals & Malta stages',
]

export function About() {
  return (
    <section className="section about" id="about">
      <div className="about-stage">
        <motion.div
          className="about-main"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/photos/press-full.jpg" alt="DJ RHUE full press portrait" />
          <motion.figure
            className="about-float"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/photos/perf-trinidad.jpg" alt="DJ RHUE live with Trinidad flag" />
          </motion.figure>
        </motion.div>

        <motion.div
          className="about-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">About DJ RHUE</p>
          <h2 className="section-title">Built for crowds that came to move</h2>
          <div className="gold-rule" />
          <p className="section-copy">
            Bristol-based Caribbean &amp; Urban DJ specialising in Afrobeats,
            Dancehall, Amapiano, Reggae, Hip Hop and R&amp;B. Known for reading
            the room and delivering seamless, high-energy sets across clubs,
            festivals, private events and urban nightlife — with international
            dates in Malta.
          </p>
          <div className="about-meta">
            <span>Bristol</span>
            <span>UK</span>
            <span>Malta</span>
          </div>
          <ul className="about-highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="about-strip" aria-hidden="true">
        <img src="/photos/hero-black-gold.jpg" alt="" />
        <img src="/photos/setup-outdoor-dusk.jpg" alt="" />
        <img src="/photos/perf-enzo.jpg" alt="" />
      </div>
    </section>
  )
}
