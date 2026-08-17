import { useState } from 'react'
import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const performance = [
  {
    price: 'From £70',
    unit: 'up to 1 hour',
    title: 'Warm-Up or Guest Set',
    featured: true,
    copy: 'Opening sets, supporting artists and shorter club slots — the entry point for most bookings.',
  },
  {
    price: 'From £100',
    unit: 'quoted from',
    title: 'Headline Set or Peak Dates',
    featured: true,
    copy: 'Peak-time Afrobeats, Dancehall, Amapiano & Caribbean/Urban sets. NYE, Halloween, Christmas and special dates quoted individually.',
  },
  {
    price: '£50',
    unit: 'per hour',
    title: 'Extended / Multi-Hour',
    featured: false,
    copy: 'Multi-hour private events, bars and longer residencies. Minimum booking may apply.',
  },
]

const packageSummary = [
  'Essential DJ setup from +£50',
  'Branded booth from +£80',
  'PA package from +£150',
  'Pro CDJ setups from +£120',
  'Large event & industry packages available',
  'Standalone equipment hire from £100/day',
]

export function Rates() {
  const [packagesOpen, setPackagesOpen] = useState(false)

  return (
    <section className="section rates" id="rates">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.4)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <p className="eyebrow">2026 Rates</p>
          <h2 className="section-title">Performance pricing</h2>
          <p className="section-copy">
            DJ fees are exclusive of equipment hire, PA and travel unless agreed.
            Setup packages available exclusively with DJ RHUE bookings.
          </p>
        </motion.div>

        <div className="rate-block">
          <div className="rate-list rate-list--featured">
            {performance.map((rate, i) => (
              <motion.article
                className={`rate-row${rate.featured ? ' featured' : ''}`}
                key={rate.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce(0.4)}
                transition={motionTransition({ duration: 0.45, delay: i * 0.05 })}
              >
                <div className="rate-price-col">
                  <strong>{rate.price}</strong>
                  <span>{rate.unit}</span>
                </div>
                <div>
                  <h4>{rate.title}</h4>
                  <p>{rate.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="rate-packages-collapsed">
          <button
            type="button"
            className="rate-packages-toggle"
            aria-expanded={packagesOpen}
            onClick={() => setPackagesOpen((v) => !v)}
          >
            Equipment &amp; setup packages
            <span aria-hidden="true">{packagesOpen ? '−' : '+'}</span>
          </button>
          {packagesOpen && (
            <motion.div
              className="rate-packages-summary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={motionTransition({ duration: 0.35 })}
            >
              <ul>
                {packageSummary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="rate-note">
                Full breakdown of essential, pro, large-event and standalone hire
                pricing is in the PDF.
              </p>
            </motion.div>
          )}
        </div>

        <div className="rate-cta">
          <a className="btn btn-primary" href="#book">
            Request a quote
          </a>
          <a className="btn btn-ghost" href="/docs/DJ_RHUE_Rates_2026.pdf" target="_blank" rel="noreferrer">
            Download full rates PDF
          </a>
        </div>
      </div>
    </section>
  )
}
