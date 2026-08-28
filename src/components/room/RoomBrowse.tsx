import { useEffect, useMemo, useState } from 'react'
import type { RoomKind, RoomPost } from '../../data/room'
import { roomKindLabel } from '../../data/room'
import { RoomPostCard } from './RoomPostCard'

const kinds: Array<RoomKind | 'all'> = ['all', 'faq', 'tip', 'guide', 'qa']

export function RoomBrowse({
  posts,
  emptyLabel = 'Nothing matches that search yet. Try cables, Afrobeats, wedding timeline, USB…',
  query: controlledQuery,
  onQueryChange,
  autoFocus = false,
  showFilters = true,
  compactSearch = false,
  id,
}: {
  posts: RoomPost[]
  emptyLabel?: string
  query?: string
  onQueryChange?: (q: string) => void
  autoFocus?: boolean
  showFilters?: boolean
  compactSearch?: boolean
  id?: string
}) {
  const [internalQuery, setInternalQuery] = useState(controlledQuery ?? '')
  const [kind, setKind] = useState<RoomKind | 'all'>('all')
  const query = controlledQuery !== undefined ? controlledQuery : internalQuery

  useEffect(() => {
    if (controlledQuery !== undefined) setInternalQuery(controlledQuery)
  }, [controlledQuery])

  function setQuery(next: string) {
    setInternalQuery(next)
    onQueryChange?.(next)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const terms = q ? q.split(/\s+/).filter(Boolean) : []
    return posts.filter((p) => {
      if (kind !== 'all' && p.kind !== kind) return false
      if (!terms.length) return true
      const hay = [p.title, p.summary, p.tags.join(' '), p.body.join(' '), p.kind]
        .join(' ')
        .toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
  }, [posts, query, kind])

  return (
    <div className="room-browse" id={id}>
      <div className={`room-browse-bar${compactSearch ? ' room-browse-bar-compact' : ''}`}>
        <label className={`room-search${compactSearch ? '' : ' room-search-hero'}`}>
          <span className="sr-only">Search The Room</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              compactSearch
                ? 'Search this category…'
                : 'How can we help? e.g. XLR cables, wedding timeline, USB failed…'
            }
            autoComplete="off"
            autoFocus={autoFocus}
          />
        </label>
        {showFilters ? (
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
        ) : null}
      </div>

      <p className="room-browse-count">
        {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        {query.trim() ? ` matching “${query.trim()}”` : ''}
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
