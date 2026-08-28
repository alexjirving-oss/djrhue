import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RoomBrowse } from '../../components/room/RoomBrowse'
import {
  featuredPosts,
  roomCategories,
  roomPosts,
  roomStats,
  postsByKind,
} from '../../data/room'
import { motionTransition } from '../../lib/motion'
import { RoomPostCard } from '../../components/room/RoomPostCard'

const stats = roomStats()

const suggestions = [
  'cables',
  'XLR',
  'USB failed',
  'Afrobeats',
  'wedding timeline',
  'gain structure',
  'Dancehall',
  'speakON',
  'rekordbox',
  'how to',
]

export function RoomHubPage() {
  const [query, setQuery] = useState('')
  const featured = featuredPosts(6)
  const recentQa = postsByKind('qa').slice(0, 4)

  function applySuggestion(term: string) {
    setQuery(term)
    requestAnimationFrame(() => {
      document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function onHeroSearch(e: FormEvent) {
    e.preventDefault()
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="room-page">
      <section className="room-hero">
        <div className="room-hero-veil" />
        <div className="container room-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition({ duration: 0.7 })}
          >
            <p className="eyebrow">The Room</p>
            <h1 className="room-hero-title">How can we help?</h1>
            <p className="room-hero-copy">
              Search {stats.total}+ FAQs, tips, technical guides and Q&amp;A — cables, mixing, genres,
              bookings, sound and everything between the USB and the dancefloor.
            </p>

            <form className="room-hero-search" onSubmit={onHeroSearch} role="search">
              <label className="sr-only" htmlFor="room-help-search">
                Search The Room
              </label>
              <input
                id="room-help-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything — e.g. understanding XLR cables, wedding DJ timeline…"
                autoComplete="off"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>

            <div className="room-suggest" aria-label="Popular searches">
              {suggestions.map((term) => (
                <button key={term} type="button" onClick={() => applySuggestion(term)}>
                  {term}
                </button>
              ))}
            </div>

            <div className="room-stat-row" aria-label="Library size">
              <div>
                <strong>{stats.total}</strong>
                <span>entries</span>
              </div>
              <div>
                <strong>{stats.faq}</strong>
                <span>FAQs</span>
              </div>
              <div>
                <strong>{stats.tip}</strong>
                <span>tips</span>
              </div>
              <div>
                <strong>{stats.guide}</strong>
                <span>guides</span>
              </div>
              <div>
                <strong>{stats.qa}</strong>
                <span>Q&amp;As</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section room-section room-section-alt" id="library">
        <div className="container">
          <div className="room-section-head">
            <p className="eyebrow">Library</p>
            <h2 className="section-title">Everything</h2>
            <p className="section-copy">
              Filter by type or keep typing — the search covers titles, tags and full answers.
            </p>
          </div>
          <RoomBrowse posts={roomPosts} query={query} onQueryChange={setQuery} />
        </div>
      </section>

      <section className="section room-section">
        <div className="container">
          <div className="room-section-head">
            <p className="eyebrow">Browse</p>
            <h2 className="section-title">Categories</h2>
          </div>
          <div className="room-cat-grid">
            {roomCategories.map((cat) => {
              const count = roomPosts.filter((p) => p.category === cat.id).length
              return (
                <Link key={cat.id} className="room-cat-card" to={`/room/${cat.id}`}>
                  <span className="room-cat-eyebrow">{cat.eyebrow}</span>
                  <h3>{cat.label}</h3>
                  <p>{cat.blurb}</p>
                  <span className="room-cat-count">{count} pieces</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section room-section room-section-alt">
        <div className="container">
          <div className="room-section-head">
            <p className="eyebrow">Start here</p>
            <h2 className="section-title">Featured</h2>
          </div>
          <div className="room-card-grid">
            {featured.map((post) => (
              <RoomPostCard key={`${post.category}/${post.slug}`} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section room-section">
        <div className="container">
          <div className="room-section-head">
            <p className="eyebrow">Community</p>
            <h2 className="section-title">Recent Q&amp;A</h2>
          </div>
          <div className="room-card-grid">
            {recentQa.map((post) => (
              <RoomPostCard key={`${post.category}/${post.slug}`} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section room-cta-band">
        <div className="container room-cta-inner">
          <div>
            <p className="eyebrow">Book the booth</p>
            <h2 className="section-title">Ready for a live room?</h2>
            <p className="section-copy">
              Afrobeats, Dancehall and Caribbean sets for Bristol, UK and Malta.
            </p>
          </div>
          <Link className="btn btn-primary" to="/book">
            Book DJ RHUE
          </Link>
        </div>
      </section>
    </div>
  )
}
