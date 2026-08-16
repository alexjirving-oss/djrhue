import { motion } from 'framer-motion'

const genres = [
  { name: 'Afrobeats', img: '/photos/perf-trinidad.jpg' },
  { name: 'Dancehall', img: '/photos/perf-enzo.jpg' },
  { name: 'Amapiano', img: '/photos/perf-malta.jpg' },
  { name: 'Reggae', img: '/photos/press-gun.jpg' },
  { name: 'Hip Hop & R&B', img: '/photos/perf-white-close.jpg' },
]

export function Sounds() {
  return (
    <section className="section sounds" id="sounds">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">The Sound</p>
          <h2 className="section-title">Specialising in heat</h2>
          <p className="section-copy">
            Creative transitions, exclusive edits and modern DJ technique —
            warm-up to peak time.
          </p>
        </motion.div>
      </div>

      <div className="sounds-rail">
        {genres.map((genre, i) => (
          <motion.article
            className="sound-tile"
            key={genre.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <img src={genre.img} alt="" loading="lazy" />
            <div className="sound-tile-veil" />
            <strong>{genre.name}</strong>
            <div className="sound-bars" aria-hidden="true">
              <span /><span /><span />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
