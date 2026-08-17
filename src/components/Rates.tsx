import { motion } from 'framer-motion'

const performance = [
  {
    price: '£50',
    unit: 'per hour',
    title: 'Standard DJ Booking',
    copy: 'Multi-hour bookings, private events, bars, pubs and extended DJ sets. Minimum booking may apply.',
  },
  {
    price: 'From £70',
    unit: 'up to 1 hour',
    title: 'Warm-Up or Guest Set',
    copy: 'Ideal for opening sets, supporting artists, club nights and shorter performances.',
  },
  {
    price: 'From £100',
    unit: 'quoted from',
    title: 'Headline Set or Peak Dates',
    copy: 'High-energy specialist sets focused on Afrobeats, Dancehall, Amapiano, Reggae, Soca & Caribbean/Urban music. Peak dates and special events (NYE, Halloween, Christmas, etc.) are quoted individually.',
  },
]

const essential = [
  {
    price: '+£50',
    title: 'Essential DJ setup',
    items: ['Professional DJ controller', 'Laptop & cabling', 'Setup & pack-down'],
  },
  {
    price: '+£80',
    title: 'Branded DJ setup',
    items: [
      'Controller + DJ booth',
      'DJ RHUE banner + QR',
      'Ambient/disco lighting where suitable',
      'Laptop stand & cabling',
    ],
  },
  {
    price: '+£150',
    title: 'Essential PA package',
    items: [
      'Everything in Branded DJ Setup',
      '2× Mackie Thump 1000W speakers',
      'Speaker stands + mic(s) if required',
      'Full setup & pack-down',
    ],
  },
]

const pro = [
  {
    price: '+£120',
    title: 'Pro DJ setup',
    items: [
      'FLX10 or Rane ONE',
      'Professional booth + branding',
      'Laptop stand & lighting',
      'Setup & pack-down',
    ],
  },
  {
    price: '+£220',
    title: 'Pro PA setup',
    items: [
      'Everything in Pro DJ Setup',
      '2× Mackie Thump 1400W speakers',
      'Up to 2 microphones',
      'Full setup & pack-down',
    ],
  },
]

const large = [
  {
    price: '+£300',
    title: 'Large event setup',
    items: [
      'Pro DJ Setup + FLX10 / Rane ONE',
      '4× Mackie Thump (2×1400W + 2×1000W)',
      'Up to 4 stands, booth + branding',
      'Up to 2 microphones',
    ],
  },
  {
    price: '+£400',
    title: 'Industry / multi-DJ setup',
    items: [
      'Everything in Large Event Setup',
      '2× Pioneer CDJ-2000',
      'Pioneer DJM-900NXS',
      'Industry-standard multi-DJ ready',
    ],
  },
]

const hire = [
  {
    price: '£175',
    unit: 'per day / event',
    title: 'CDJ / mixer package',
    copy: '2× Pioneer CDJ-2000, Pioneer DJM-900NXS & required cabling.',
  },
  {
    price: '£100',
    unit: 'per day / event',
    title: 'PA package',
    copy: '2× Mackie Thump 1000W, 2× stands & required cabling.',
  },
  {
    price: '£250',
    unit: 'per day / event',
    title: 'Complete DJ + PA',
    copy: 'CDJ/mixer package plus PA package — full standalone hire.',
  },
]

const extras = [
  { label: 'DJ booth', value: '+£30' },
  { label: 'Local delivery', value: 'From £25' },
  { label: 'Delivery & setup', value: 'From £50' },
  { label: 'Extra DJ time', value: '£50 / hour' },
]

function PackageGrid({
  items,
}: {
  items: { price: string; title: string; items: string[] }[]
}) {
  return (
    <div className="rate-packages">
      {items.map((pkg, i) => (
        <motion.article
          key={pkg.title}
          className="rate-package"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <p className="rate-price">{pkg.price}</p>
          <h3>{pkg.title}</h3>
          <ul>
            {pkg.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  )
}

export function Rates() {
  return (
    <section className="section rates" id="rates">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">2026 Rates</p>
          <h2 className="section-title">Performance & equipment</h2>
          <p className="section-copy">
            DJ performance rates are exclusive of equipment hire, PA packages and
            travel unless otherwise agreed. Setup packages are available exclusively
            with DJ RHUE bookings.
          </p>
        </motion.div>

        <div className="rate-block">
          <h3 className="rate-heading">Performance</h3>
          <div className="rate-list">
            {performance.map((rate, i) => (
              <motion.article
                className="rate-row"
                key={rate.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
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

        <div className="rate-block">
          <h3 className="rate-heading">Essential setups</h3>
          <p className="rate-note">For venues with their own suitable PA, or shorter bookings.</p>
          <PackageGrid items={essential} />
        </div>

        <div className="rate-block">
          <h3 className="rate-heading">Professional setups</h3>
          <p className="rate-note">Private events, corporate bookings & higher-spec venues.</p>
          <PackageGrid items={pro} />
        </div>

        <div className="rate-block">
          <h3 className="rate-heading">Club, festival & large event</h3>
          <PackageGrid items={large} />
        </div>

        <div className="rate-block">
          <h3 className="rate-heading">Standalone equipment hire</h3>
          <p className="rate-note">
            Refundable security deposit & valid photo ID required. Full hire terms
            apply.
          </p>
          <div className="rate-list">
            {hire.map((rate, i) => (
              <motion.article
                className="rate-row"
                key={rate.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
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

          <div className="rate-extras">
            {extras.map((extra) => (
              <div key={extra.label}>
                <span>{extra.label}</span>
                <strong>{extra.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rate-cta">
          <a className="btn btn-primary" href="#book">
            Request a quote
          </a>
          <a className="btn btn-ghost" href="/docs/DJ_RHUE_Rates_2026.pdf" target="_blank" rel="noreferrer">
            Download full rates PDF
          </a>
          <a
            className="btn btn-ghost"
            href="/docs/DJ_RHUE_Promo_Rates.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Promo / flyer rates PDF
          </a>
        </div>
      </div>
    </section>
  )
}
