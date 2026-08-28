import { useMemo, useState } from 'react'
import type { RoomKind, RoomPost } from '../../data/room'
import { roomKindLabel } from '../../data/room'
import { RoomPostCard } from './RoomPostCard'

const kinds: Array<RoomKind | 'all'> = ['all', 'faq', 'tip', 'guide', 'qa']

export function RoomBrowse({
  posts,
  emptyLabel = 'Nothing matches that search yet.',
}: {
  posts: RoomPost[]
  emptyLabel?: string
}) {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<RoomKind | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const terms = q ? q.split(/\s+/).filter(Boolean) : []
    return posts.filter((p) => {
      if (kind !== 'all' && p.kind !== kind) return false
      if (!terms.length) return true
      const hay = [p.title, p.summary, p.tags.join(' '), p.body.join(' ')].join(' ').toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
  }, [posts, query, kind])

  return (
    <div className="room-browse">
      <div className="room-browse-bar">
        <label className="room-search">
          <span className="sr-only">Search The Room</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gear, genres, bookings, tips…"
            autoComplete="off"
          />
        </label>
        <div className="room-kind-filters" role="tablist" aria-label="Filter by type">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={kind === k}
              className={kind === k ? 'active' : undefined}
              onClick={() => setKind(k)}
            >
              {k === 'all' ? 'All' : roomKindLabel[k]}
            </button>
          ))}
        </div>
      </div>

      <p className="room-browse-count">
        {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
      </p>

      {filtered.length ? (
        <div className="room-card-grid">
          {filtered.map((post) => (
            <RoomPostCard key={`${post.category}/${post.slug}`} post={post} />
          ))}
        </div>
      ) : (
        <p className="room-empty">{emptyLabel}</p>
      )}
    </div>
  )
}
