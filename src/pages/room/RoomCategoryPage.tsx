import { Link, Navigate, useParams } from 'react-router-dom'
import { RoomBrowse } from '../../components/room/RoomBrowse'
import { getCategory, postsByCategory } from '../../data/room'

export function RoomCategoryPage() {
  const { categoryId = '' } = useParams()
  const category = getCategory(categoryId)
  if (!category) return <Navigate to="/room" replace />

  const posts = postsByCategory(category.id)

  return (
    <div className="room-page">
      <section className="room-hero room-hero-compact">
        <div className="room-hero-veil" />
        <div className="container room-hero-inner">
          <nav className="room-crumbs" aria-label="Breadcrumb">
            <Link to="/room">The Room</Link>
            <span>/</span>
            <span>{category.label}</span>
          </nav>
          <p className="eyebrow">{category.eyebrow}</p>
          <h1 className="room-hero-title">{category.label}</h1>
          <p className="room-hero-copy">{category.blurb}</p>
        </div>
      </section>

      <section className="section room-section">
        <div className="container">
          <RoomBrowse posts={posts} compactSearch />
        </div>
      </section>
    </div>
  )
}
