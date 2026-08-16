import { motion } from 'framer-motion'

const reasons = [
  {
    n: '01',
    title: 'Crowd reader',
    copy: 'Reads the room and adapts every set — warm-up to peak time.',
  },
  {
    n: '02',
    title: 'Caribbean & Urban',
    copy: 'Afrobeats, Dancehall, Amapiano, Reggae and Urban with seamless mixing.',
  },
  {
    n: '03',
    title: 'Professional & reliable',
    copy: 'Punctual, organised and trusted by venues, promoters and private clients.',
  },
  {
    n: '04',
    title: 'Seamless mixing',
    copy: 'Smooth transitions and high-energy mixing that keeps floors moving.',
  },
  {
    n: '05',
    title: 'Own equipment',
    copy: 'DJ setup, PA and mics available — from essential to industry CDJs.',
  },
  {
    n: '06',
    title: 'UK & international',
    copy: 'Performing across the UK and Malta, with growing industry connections.',
  },
]

export function Why() {
  return (
    <section className="section why" id="why">
      <div className="why-visual">
        <img src="/photos/press-headphones-1.jpg" alt="" />
        <div className="why-visual-veil" />
      </div>

      <div className="container why-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Why Book DJ RHUE</p>
          <h2 className="section-title">What promoters book for</h2>
        </motion.div>

        <div className="why-grid">
          {reasons.map((reason, i) => (
            <motion.article
              className="why-item"
              key={reason.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
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
