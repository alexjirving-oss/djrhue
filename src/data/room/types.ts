export type RoomKind = 'faq' | 'tip' | 'guide' | 'qa'

export type RoomAnswerAuthor = 'room' | 'community'

export type RoomAnswer = {
  author: RoomAnswerAuthor
  name: string
  text: string
  helpful: number
}

export type RoomCategoryId =
  | 'booking'
  | 'gear'
  | 'mixing'
  | 'sound'
  | 'genres'
  | 'events'
  | 'software'
  | 'production'
  | 'career'
  | 'room-tips'

export type RoomCategory = {
  id: RoomCategoryId
  label: string
  eyebrow: string
  blurb: string
}

export type RoomPost = {
  slug: string
  category: RoomCategoryId
  kind: RoomKind
  title: string
  summary: string
  tags: string[]
  published: string
  body: string[]
  answers?: RoomAnswer[]
}
