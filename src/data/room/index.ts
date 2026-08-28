import type { RoomCategory, RoomCategoryId, RoomKind, RoomPost } from './types'
import { roomPosts } from './posts.generated'

export type { RoomCategory, RoomCategoryId, RoomKind, RoomPost, RoomAnswer } from './types'
export { roomPosts }

export const roomCategories: RoomCategory[] = [
  {
    id: 'booking',
    label: 'Booking & Rates',
    eyebrow: 'Book',
    blurb: 'Fees, deposits, timelines and how to enquire without the runaround.',
  },
  {
    id: 'gear',
    label: 'Gear & Booth',
    eyebrow: 'Tech',
    blurb: 'CDJs, mixers, cables (XLR, RCA, speakON…), USBs and kit habits that survive load-in.',
  },
  {
    id: 'mixing',
    label: 'Mixing Craft',
    eyebrow: 'Craft',
    blurb: 'Phrasing, EQ, stems, programming and transitions that serve the floor.',
  },
  {
    id: 'sound',
    label: 'Sound & PA',
    eyebrow: 'Sound',
    blurb: 'Gain structure, outdoor realities, feedback and hearing longevity.',
  },
  {
    id: 'genres',
    label: 'Genres & Culture',
    eyebrow: 'Music',
    blurb: 'Afrobeats, Dancehall, Amapiano, Reggae, Hip Hop and R&B — with respect.',
  },
  {
    id: 'events',
    label: 'Events & Formats',
    eyebrow: 'Nights',
    blurb: 'Clubs, weddings, corporate, carnival, festivals and private rooms.',
  },
  {
    id: 'software',
    label: 'Software & Libraries',
    eyebrow: 'Prep',
    blurb: 'rekordbox, Serato, crates, cues, recordings and offline discipline.',
  },
  {
    id: 'production',
    label: 'Edits & Production',
    eyebrow: 'Edits',
    blurb: 'Clean versions, extended intros and mashup manners for working DJs.',
  },
  {
    id: 'career',
    label: 'Career & Promo',
    eyebrow: 'Career',
    blurb: 'Guest slots, EPKs, invoices, social proof and getting paid cleanly.',
  },
  {
    id: 'room-tips',
    label: 'Room Tips & Q&A',
    eyebrow: 'Room',
    blurb: 'Helpful tips from DJ RHUE plus community questions answered in The Room.',
  },
]

export const roomKindLabel: Record<RoomKind, string> = {
  faq: 'FAQ',
  tip: 'Tip',
  guide: 'Guide',
  qa: 'Q&A',
}

export function getCategory(id: string): RoomCategory | undefined {
  return roomCategories.find((c) => c.id === id)
}

export function getPost(categoryId: string, slug: string): RoomPost | undefined {
  return roomPosts.find((p) => p.category === categoryId && p.slug === slug)
}

export function postsByCategory(categoryId: RoomCategoryId): RoomPost[] {
  return roomPosts.filter((p) => p.category === categoryId)
}

export function searchPosts(query: string): RoomPost[] {
  const q = query.trim().toLowerCase()
  if (!q) return roomPosts
  const terms = q.split(/\s+/).filter(Boolean)
  return roomPosts.filter((p) => {
    const hay = [p.title, p.summary, p.tags.join(' '), p.body.join(' '), p.kind]
      .join(' ')
      .toLowerCase()
    return terms.every((t) => hay.includes(t))
  })
}

export function relatedPosts(post: RoomPost, limit = 4): RoomPost[] {
  const tagSet = new Set(post.tags)
  return roomPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = 0
      if (p.category === post.category) score += 3
      if (p.kind === post.kind) score += 1
      for (const t of p.tags) if (tagSet.has(t)) score += 2
      return { p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p)
}

export function featuredPosts(limit = 6): RoomPost[] {
  const priority = roomPosts.filter(
    (p) => p.kind === 'guide' || p.kind === 'tip' || (p.kind === 'faq' && p.category === 'booking'),
  )
  return priority.slice(0, limit)
}

export function postsByKind(kind: RoomKind): RoomPost[] {
  return roomPosts.filter((p) => p.kind === kind)
}

export function roomStats() {
  const byKind = { faq: 0, tip: 0, guide: 0, qa: 0 }
  for (const p of roomPosts) byKind[p.kind]++
  return {
    total: roomPosts.length,
    categories: roomCategories.length,
    ...byKind,
  }
}
