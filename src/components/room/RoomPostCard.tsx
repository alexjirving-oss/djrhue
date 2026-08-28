import { Link } from 'react-router-dom'
import type { RoomPost } from '../../data/room'
import { getCategory, roomKindLabel } from '../../data/room'

export function RoomPostCard({ post }: { post: RoomPost }) {
  const cat = getCategory(post.category)
  return (
    <Link className="room-card" to={`/room/${post.category}/${post.slug}`}>
      <div className="room-card-meta">
        <span className="room-kind">{roomKindLabel[post.kind]}</span>
        {cat ? <span className="room-card-cat">{cat.label}</span> : null}
      </div>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
    </Link>
  )
}
