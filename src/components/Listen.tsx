import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const YOUTUBE_CHANNEL = 'https://youtube.com/@rhue_james7'
const YOUTUBE_LATEST_MIX = 'https://www.youtube.com/watch?v=ehH6LHv1TiA'
const YOUTUBE_OLD_SCHOOL_MIX = 'https://www.youtube.com/watch?v=-FJbNvuNojM'

const MIXCLOUD = 'https://www.mixcloud.com/DJRHUE/'

const genres = [
  { label: 'Afrobeats', href: MIXCLOUD },
  { label: 'Dancehall', href: MIXCLOUD },
  { label: 'Amapiano', href: YOUTUBE_LATEST_MIX },
  { label: 'Reggae', href: MIXCLOUD },
  { label: 'Hip Hop & R&B', href: YOUTUBE_OLD_SCHOOL_MIX },
] as const

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
          <h2 className="section-title">
            <a
              className="listen-title-link"
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hear the selection
            </a>
          </h2>
          <p className="section-copy">
            Afrobeats, Dancehall, Amapiano, Reggae, Hip Hop and R&amp;B mixes —
            the same Caribbean and urban energy you get when you book DJ RHUE
            in Bristol or Malta.
          </p>
          <ul className="listen-genres" aria-label="Genres played by DJ RHUE">
            {genres.map((genre) => (
              <li key={genre.label}>
                <a href={genre.href} target="_blank" rel="noopener noreferrer">
                  {genre.label}
                </a>
              </li>
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
            title="DJ RHUE on YouTube — latest mix"
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/ehH6LHv1TiA"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <div className="listen-links">
            <a
              className="btn btn-ghost"
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
            >
              All mixes on YouTube
            </a>
            <a
              className="btn btn-ghost"
              href={YOUTUBE_LATEST_MIX}
              target="_blank"
              rel="noopener noreferrer"
            >
              Latest mix
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.mixcloud.com/DJRHUE/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mixcloud
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
