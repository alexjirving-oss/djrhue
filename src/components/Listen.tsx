import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const genres = ['Afrobeats', 'Dancehall', 'Amapiano', 'Reggae', 'Hip Hop & R&B']

export function Listen() {
  return (
    <section className="section listen" id="listen">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.35)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <p className="eyebrow">Listen</p>
          <h2 className="section-title">Hear the selection</h2>
          <p className="section-copy">
            Mixes and sets spanning Caribbean heat and urban nights — the same
            energy you get in the booth.
          </p>
          <ul className="listen-genres" aria-label="Genres">
            {genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="listen-embed"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.2)}
          transition={motionTransition({ duration: 0.75, delay: 0.08 })}
        >
          <iframe
            title="DJ RHUE on Mixcloud"
            width="100%"
            height="400"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FDJRHUE%2F"
            loading="lazy"
            allow="encrypted-media"
          />
          <div className="listen-links">
            <a
              className="btn btn-ghost"
              href="https://www.mixcloud.com/DJRHUE/"
              target="_blank"
              rel="noopener noreferrer"
            >
              All mixes on Mixcloud
            </a>
            <a
              className="btn btn-ghost"
              href="https://soundcloud.com/rhu-tjames"
              target="_blank"
              rel="noopener noreferrer"
            >
              SoundCloud
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
