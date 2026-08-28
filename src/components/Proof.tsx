import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const credits = [
  {
    venue: "St Paul's Carnival",
    detail: 'Performer — Bristol',
  },
  {
    venue: 'SWU.FM',
    detail: 'Guest DJ & radio sessions',
  },
  {
    venue: 'Rinse FM',
    detail: 'Guest mix / radio session',
  },
  {
    venue: 'Laid Blak Radio',
    detail: 'Featured artist',
  },
  {
    venue: 'Manoel Island · Malta',
    detail: 'Filmed DJ sessions / international content',
  },
  {
    venue: 'UK clubs & festivals',
    detail: 'Bristol, London & nationwide',
  },
]

export function Proof() {
  return (
    <section className="section proof" id="proof">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.35)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <p className="eyebrow">Proof</p>
          <h2 className="section-title">Stages & airtime</h2>
          <p className="section-copy">
            From carnival stages and live events to radio sessions and
            international performances.
          </p>
        </motion.div>

        <div className="proof-grid">
          {credits.map((item, i) => (
            <motion.article
              className="proof-badge"
              key={item.venue}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.25)}
              transition={motionTransition({ duration: 0.5, delay: i * 0.04 })}
            >
              <strong>{item.venue}</strong>
              <span>{item.detail}</span>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="proof-epk"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.3)}
          transition={motionTransition({ duration: 0.6, delay: 0.1 })}
        >
          <div>
            <h3>Press & promoters</h3>
            <p>Full bio, services, highlights and why-book notes in one PDF.</p>
          </div>
          <a
            className="btn btn-primary"
            href="/docs/DJ_RHUE_EPK_2026.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download EPK
          </a>
        </motion.div>
      </div>
    </section>
  )
}
