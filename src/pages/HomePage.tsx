import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Hero } from '../components/Hero'
import { InstallApp } from '../components/InstallApp'
import { motionTransition, viewportOnce } from '../lib/motion'
import './HomePage.css'

const MIXCLOUD = 'https://www.mixcloud.com/DJRHUE/'

const credits = [
  { name: "St Paul's Carnival" },
  { name: 'SWU.FM', href: MIXCLOUD },
  { name: 'Rinse FM', href: MIXCLOUD },
  { name: 'Laid Blak Radio' },
  { name: 'Manoel Island' },
  { name: 'UK clubs & festivals' },
]

const destinations = [
  {
    to: '/listen',
    slug: 'listen',
    eyebrow: 'Press play',
    label: 'Listen',
    copy: 'Mixes and genre lanes',
    image: '/photos/perf-cdj.jpg',
  },
  {
    to: '/gallery',
    slug: 'gallery',
    eyebrow: 'The frames',
    label: 'Gallery',
    copy: 'Live photos from the floor',
    image: '/photos/perf-malta.jpg',
  },
  {
    to: '/services',
    slug: 'services',
    eyebrow: 'The setup',
    label: 'Services',
    copy: 'Clubs, weddings and carnival',
    image: '/photos/setup-outdoor-dusk.jpg',
  },
  {
    to: '/room',
    slug: 'room',
    eyebrow: 'Go deeper',
    label: 'The Room',
    copy: 'Guides, FAQs, tips and Q&A',
  },
  {
    to: '/about',
    slug: 'about',
    eyebrow: 'Behind the decks',
    label: 'About',
    copy: 'Meet DJ RHUE',
    image: '/photos/press-side.jpg',
  },
  {
    to: '/rates',
    slug: 'rates',
    eyebrow: 'Straight up',
    label: 'Rates',
    copy: '2026 performance fees',
  },
  {
    to: '/book',
    slug: 'book',
    eyebrow: 'Your date',
    label: 'Book DJ RHUE',
    copy: 'Start a booking',
    image: '/photos/hero-black-gold.jpg',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

export function HomePage() {
  return (
    <main>
      <Hero />

      <div className="home-post-hero">
        <InstallApp />

        <section className="home-proof" id="proof" aria-labelledby="home-proof-title">
          <div className="container">
            <header className="home-section-heading home-proof__heading">
              <p className="home-section-label">
                <span aria-hidden="true" />
                Stages &amp; airtime
              </p>
              <div className="home-section-heading__row">
                <h2 id="home-proof-title">Proven live.</h2>
                <p>
                  Carnival stages, radio sessions and international sets — a focused selection from
                  the record.
                </p>
              </div>
            </header>

            <div className="home-proof__grid">
              <article className="home-proof-card">
                <div className="home-proof-card__media">
                  <img
                    src="/photos/perf-trinidad.jpg"
                    alt="DJ RHUE performing at St Paul's Carnival in Bristol"
                    width="1024"
                    height="1280"
                    loading="lazy"
                  />
                  <span className="home-proof-card__tag">Bristol</span>
                </div>
                <div className="home-proof-card__body">
                  <div>
                    <p>Live performance</p>
                    <h3>St Paul&apos;s Carnival</h3>
                  </div>
                  <span className="home-proof-card__mark" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </div>
              </article>

              <div className="home-proof__support">
                <div className="home-credits">
                  <div className="home-credits__heading">
                    <h3>Selected credits</h3>
                    <span>Live &amp; broadcast</span>
                  </div>
                  <ul>
                    {credits.map((credit) => (
                      <li key={credit.name}>
                        {credit.href ? (
                          <a
                            href={credit.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${credit.name} on Mixcloud (opens in a new tab)`}
                          >
                            <span>{credit.name}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <span>{credit.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <figure className="home-proof-secondary">
                  <div className="home-proof-secondary__media">
                    <img
                      src="/photos/perf-manoel.jpg"
                      alt="DJ RHUE performing beside the water at Manoel Island, Malta"
                      width="1024"
                      height="576"
                      loading="lazy"
                    />
                  </div>
                  <figcaption>
                    <span>International sessions</span>
                    <strong>Manoel Island</strong>
                    <small>Malta</small>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="home-explore" aria-labelledby="home-explore-title">
          <div className="container">
            <motion.header
              className="home-explore__header"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.25)}
              transition={motionTransition({ duration: 0.65 })}
            >
              <p className="home-kicker">
                <span>02</span> Pick your lane
              </p>
              <div>
                <h2 id="home-explore-title">Enter the set.</h2>
                <p>Listen, look around, get the details or lock in a date.</p>
              </div>
            </motion.header>

            <div className="home-bento">
              {destinations.map((destination, index) => (
                <motion.div
                  className={`home-bento__cell home-bento__cell--${destination.slug}`}
                  key={destination.to}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce(0.12)}
                  transition={motionTransition({
                    duration: 0.5,
                    delay: Math.min(index * 0.035, 0.18),
                  })}
                >
                  <Link className="home-bento__link" to={destination.to}>
                    {destination.image ? (
                      <img src={destination.image} alt="" loading="lazy" />
                    ) : null}
                    <span className="home-bento__shade" aria-hidden="true" />
                    <span className="home-bento__arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="home-bento__copy">
                      <span>{destination.eyebrow}</span>
                      <strong>{destination.label}</strong>
                      <small>{destination.copy}</small>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
