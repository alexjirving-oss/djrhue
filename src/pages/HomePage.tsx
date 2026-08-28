import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Proof } from '../components/Proof'

const destinations = [
  { to: '/listen', label: 'Listen', copy: 'Mixes and genre lanes' },
  { to: '/about', label: 'About', copy: 'Who RHUE is on the night' },
  { to: '/gallery', label: 'Gallery', copy: 'Live photos from the floor' },
  { to: '/services', label: 'Services', copy: 'Clubs, weddings, carnival' },
  { to: '/room', label: 'The Room', copy: 'FAQs, tips, guides, Q&A' },
  { to: '/rates', label: 'Rates', copy: '2026 performance fees' },
  { to: '/faq', label: 'FAQ', copy: 'Booking questions' },
  { to: '/book', label: 'Book', copy: 'Lock in a date' },
]

export function HomePage() {
  return (
    <main>
      <Hero />
      <Proof />

      <section className="section home-destinations">
        <div className="container">
          <p className="eyebrow">Explore</p>
          <h2 className="section-title">More than one scroll</h2>
          <p className="section-copy">
            Pick a page — mixes, proof, rates, The Room library, or go straight to booking.
          </p>
          <div className="home-dest-grid">
            {destinations.map((d) => (
              <Link key={d.to} className="home-dest-card" to={d.to}>
                <h3>{d.label}</h3>
                <p>{d.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
