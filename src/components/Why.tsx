import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const reasons = [
  {
    n: '01',
    title: 'Reads the room',
    copy: 'Set direction shifts with the crowd — no rigid playlist, no dead moments.',
  },
  {
    n: '02',
    title: 'Turnkey when needed',
    copy: 'From controller-only to full PA and CDJ rigs — one contact, one setup.',
  },
  {
    n: '03',
    title: 'Promoter-ready',
    copy: 'On time, clear comms, EPK and terms sorted before you ask.',
  },
  {
    n: '04',
    title: 'UK & Malta',
    copy: 'Regular Bristol bookings plus international dates and growing radio credits.',
  },
]

export function Why() {
  return (
    <section className="section why" id="why">
      <div className="why-visual">
        <img src="/photos/setup-outdoor-dusk.jpg" alt="" />
        <div className="why-visual-veil" />
      </div>

      <div className="container why-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.4)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <p className="eyebrow">Why Book DJ RHUE</p>
          <h2 className="section-title">What you get on the night</h2>
        </motion.div>

        <div className="why-grid">
          {reasons.map((reason, i) => (
            <motion.article
              className="why-item"
              key={reason.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.3)}
              transition={motionTransition({ duration: 0.5, delay: i * 0.05 })}
            >
              <span className="num">{reason.n}</span>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
