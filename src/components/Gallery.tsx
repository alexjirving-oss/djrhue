import { motion } from 'framer-motion'

const shots = [
  { src: '/photos/perf-trinidad.jpg', alt: 'DJ RHUE with Trinidad & Tobago flag', wide: false },
  { src: '/photos/perf-malta.jpg', alt: 'DJ RHUE performing in Malta', wide: false },
  { src: '/photos/perf-white.jpg', alt: 'DJ RHUE in white shirt at the decks', wide: true },
  { src: '/photos/perf-enzo.jpg', alt: 'DJ RHUE with Enzo', wide: false },
  { src: '/photos/perf-cdj.jpg', alt: 'DJ RHUE on CDJ-3000s', wide: false },
  { src: '/photos/perf-bunjy.jpg', alt: 'DJ RHUE outdoor festival set', wide: false },
  { src: '/photos/hero-black-gold.jpg', alt: 'DJ RHUE black and gold private event', wide: true },
  { src: '/photos/setup-outdoor-day.jpg', alt: 'DJ RHUE branded outdoor booth with PA day setup', wide: false },
  { src: '/photos/setup-outdoor-dusk.jpg', alt: 'DJ RHUE branded outdoor booth at dusk', wide: false },
  { src: '/photos/perf-manoel.jpg', alt: 'DJ RHUE at Manoel Island', wide: true },
  { src: '/photos/press-headphones-1.jpg', alt: 'DJ RHUE press headphones', wide: false },
  { src: '/photos/press-gun.jpg', alt: 'DJ RHUE press portrait', wide: false },
  { src: '/photos/perf-white-close.jpg', alt: 'DJ RHUE close-up mixing', wide: true },
]

export function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <motion.div
          className="gallery-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="eyebrow">On Stage</p>
            <h2 className="section-title">Live in the booth</h2>
          </div>
          <p className="section-copy">
            Real rooms. Real crowds. From St Paul’s energy to Malta coastlines —
            no stock fillers.
          </p>
        </motion.div>
      </div>

      <div className="gallery-mosaic">
        {shots.map((shot, i) => (
          <motion.figure
            key={shot.src}
            className={shot.wide ? 'wide' : ''}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.04 }}
          >
            <img src={shot.src} alt={shot.alt} loading="lazy" />
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
