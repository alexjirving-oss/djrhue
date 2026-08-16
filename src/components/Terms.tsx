import { motion } from 'framer-motion'

const docs = [
  {
    title: 'Performance terms & conditions',
    copy: 'Booking fees, payment, cancellations, venue requirements, branding and liability.',
    href: '/docs/DJ_RHUE_Terms_2026.pdf',
  },
  {
    title: 'Equipment hire terms',
    copy: 'Hire confirmation, security deposits, ID, damage liability and return conditions.',
    href: '/docs/DJ_RHUE_Equipment_Hire_Terms.pdf',
  },
  {
    title: '2026 rates sheet',
    copy: 'Full performance, setup package and standalone hire pricing.',
    href: '/docs/DJ_RHUE_Rates_2026.pdf',
  },
]

const highlights = [
  {
    title: 'Booking fee secures the date',
    copy: 'Standard £50 · Warm-up / guest £70 · Specialist / headline £100. Fee forms part of the total price.',
  },
  {
    title: 'Balance before the event',
    copy: 'Unless agreed otherwise, remaining balance is due no later than 48 hours before the event.',
  },
  {
    title: 'Client cancellations',
    copy: 'More than 30 days: 50% of booking fee retained. 30 days or less: 100% of booking fee retained.',
  },
  {
    title: 'Extra performance time',
    copy: 'Additional DJ time at £50 per hour, subject to availability.',
  },
]

export function Terms() {
  return (
    <section className="section terms" id="terms">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Terms</p>
          <h2 className="section-title">Clear booking rules</h2>
          <p className="section-copy">
            All bookings are subject to DJ RHUE Terms &amp; Conditions. Payment of the
            booking fee confirms acceptance. Download the full documents below.
          </p>
        </motion.div>

        <div className="terms-highlights">
          {highlights.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </div>

        <div className="terms-docs">
          {docs.map((doc, i) => (
            <motion.a
              key={doc.href}
              className="terms-doc"
              href={doc.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <div>
                <h3>{doc.title}</h3>
                <p>{doc.copy}</p>
              </div>
              <span>PDF</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
