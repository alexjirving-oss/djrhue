import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const reasons = [
  {
    n: '01',
    title: 'Reads the Room',
    copy: 'Set direction adapts with the crowd — from warm-up through to peak time, without relying on a rigid playlist.',
  },
  {
    n: '02',
    title: 'Creative DJ Techniques',
    copy: 'Wordplay, scratching, live remixing, Serato Stems, loops and creative transitions keep sets fresh and distinctive.',
  },
  {
    n: '03',
    title: 'Caribbean & Urban Specialist',
    copy: 'Afrobeats, Dancehall, Amapiano, Reggae, Soca, R&B and Hip-Hop — delivered with a specialist understanding of the music and culture.',
  },
  {
    n: '04',
    title: 'UK & International Experience',
    copy: 'Bristol bookings, radio appearances and international performances in Malta — with a growing network across both scenes.',
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
