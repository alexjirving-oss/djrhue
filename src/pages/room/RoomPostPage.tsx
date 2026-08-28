import { Link, Navigate, useParams } from 'react-router-dom'
import { RoomAnswers } from '../../components/room/RoomAnswers'
import { RoomPostCard } from '../../components/room/RoomPostCard'
import {
  getCategory,
  getPost,
  relatedPosts,
  roomKindLabel,
} from '../../data/room'

export function RoomPostPage() {
  const { categoryId = '', slug = '' } = useParams()
  const post = getPost(categoryId, slug)
  if (!post) return <Navigate to="/room" replace />

  const category = getCategory(post.category)
  const related = relatedPosts(post)

  return (
    <div className="room-page">
      <article className="room-article">
        <header className="room-article-header">
          <div className="container">
            <nav className="room-crumbs" aria-label="Breadcrumb">
              <Link to="/room">The Room</Link>
              <span>/</span>
              {category ? (
                <Link to={`/room/${category.id}`}>{category.label}</Link>
              ) : (
                <span>{post.category}</span>
              )}
              <span>/</span>
              <span>Article</span>
            </nav>
            <div className="room-card-meta">
              <span className="room-kind">{roomKindLabel[post.kind]}</span>
              {category ? <span className="room-card-cat">{category.label}</span> : null}
            </div>
            <h1>{post.title}</h1>
            <p className="room-article-summary">{post.summary}</p>
            <p className="room-article-date">Updated {post.published}</p>
          </div>
        </header>

        <div className="container room-article-body">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {post.tags.length ? (
            <ul className="room-tags">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}

          {post.answers?.length ? <RoomAnswers answers={post.answers} /> : null}
        </div>
      </article>

      {related.length ? (
        <section className="section room-section room-section-alt">
          <div className="container">
            <div className="room-section-head">
              <p className="eyebrow">Continue</p>
              <h2 className="section-title">Related in The Room</h2>
            </div>
            <div className="room-card-grid">
              {related.map((p) => (
                <RoomPostCard key={`${p.category}/${p.slug}`} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
