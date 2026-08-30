import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Hero } from '../components/Hero'
import { InstallApp } from '../components/InstallApp'
import { motionTransition, viewportOnce } from '../lib/motion'
import './HomePage.css'

const MIXCLOUD = 'https://www.mixcloud.com/DJRHUE/'

const credits = [
  { name: "St Paul's Carnival", detail: 'Bristol' },
  { name: 'SWU.FM', detail: 'Guest DJ · radio sessions', href: MIXCLOUD },
  { name: 'Rinse FM', detail: 'Guest mix · radio session', href: MIXCLOUD },
  { name: 'Laid Blak Radio', detail: 'Featured artist' },
  { name: 'Manoel Island', detail: 'Malta sessions' },
  { name: 'UK clubs & festivals', detail: 'Live sets' },
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

export function HomePage() {
  return (
    <main>
      <Hero />

      <div className="home-post-hero">
        <InstallApp />

        <section className="home-proof" id="proof" aria-labelledby="home-proof-title">
          <div className="container">
            <motion.header
              className="home-proof__header"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.25)}
              transition={motionTransition({ duration: 0.7 })}
            >
              <div>
                <p className="home-kicker">
                  <span>01</span> On record
                </p>
                <h2 id="home-proof-title">
                  Bristol
                  <span>to Malta.</span>
                </h2>
              </div>
              <p className="home-proof__intro">
                Carnival stages, radio sessions and international sets. The names below are the
                record — no filler.
              </p>
            </motion.header>
          </div>

          <div className="home-marquee" aria-hidden="true">
            <div className="home-marquee__track">
              {[0, 1].map((group) => (
                <div className="home-marquee__group" key={group}>
                  {credits.map((credit) => (
                    <span key={`${group}-${credit.name}`}>
                      {credit.name}
                      <i>✦</i>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="container home-proof__layout">
            <motion.figure
              className="home-proof__feature"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.15)}
              transition={motionTransition({ duration: 0.7 })}
            >
              <div className="home-proof__image">
                <img
                  src="/photos/perf-trinidad.jpg"
                  alt="DJ RHUE performing at St Paul's Carnival in Bristol"
                  loading="lazy"
                />
                <span className="home-proof__image-word" aria-hidden="true">
                  Carnival
                </span>
              </div>
              <figcaption>
                <span>Live / Bristol</span>
                <strong>St Paul&apos;s Carnival</strong>
              </figcaption>
            </motion.figure>

            <motion.div
              className="home-proof__ledger"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.15)}
              transition={motionTransition({ duration: 0.65, delay: 0.08 })}
            >
              <div className="home-proof__ledger-head">
                <p>Selected credits</p>
                <span>06 entries</span>
              </div>
              <ol>
                {credits.map((credit, index) => {
                  const content = (
                    <>
                      <span className="home-proof__number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="home-proof__credit">
                        <strong>{credit.name}</strong>
                        <small>{credit.detail}</small>
                      </span>
                      {credit.href ? (
                        <span className="home-proof__outbound" aria-hidden="true">
                          ↗
                        </span>
                      ) : null}
                    </>
                  )

                  return (
                    <li key={credit.name}>
                      {credit.href ? (
                        <a href={credit.href} target="_blank" rel="noopener noreferrer">
                          {content}
                        </a>
                      ) : (
                        <div>{content}</div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </motion.div>

            <motion.figure
              className="home-proof__malta"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.15)}
              transition={motionTransition({ duration: 0.65, delay: 0.12 })}
            >
              <img
                src="/photos/perf-manoel.jpg"
                alt="DJ RHUE performing beside the water at Manoel Island, Malta"
                loading="lazy"
              />
              <figcaption>
                <span>International sessions</span>
                <strong>Manoel Island · Malta</strong>
              </figcaption>
            </motion.figure>
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
