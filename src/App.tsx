import type { ReactNode } from 'react'
import { lazy, Suspense, useLayoutEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ListenPage } from './pages/ListenPage'
import { AboutPage } from './pages/AboutPage'
import { GalleryPage } from './pages/GalleryPage'
import { ServicesPage } from './pages/ServicesPage'
import { RatesPage } from './pages/RatesPage'
import { BookPage } from './pages/BookPage'
import { FaqPage } from './pages/FaqPage'
import { TermsPage } from './pages/TermsPage'
import './App.css'

const RoomHubPage = lazy(() =>
  import('./pages/room/RoomHubPage').then((m) => ({ default: m.RoomHubPage })),
)
const RoomCategoryPage = lazy(() =>
  import('./pages/room/RoomCategoryPage').then((m) => ({ default: m.RoomCategoryPage })),
)
const RoomPostPage = lazy(() =>
  import('./pages/room/RoomPostPage').then((m) => ({ default: m.RoomPostPage })),
)

function ScrollManager() {
  const location = useLocation()

  useLayoutEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return null
}

/** Keep /room/ and /book/ matched to routes (GitHub Pages directory URLs). */
function StripTrailingSlash() {
  const location = useLocation()
  if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
    return (
      <Navigate
        to={`${location.pathname.replace(/\/+$/, '')}${location.search}${location.hash}`}
        replace
      />
    )
  }
  return null
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}

function RoomFallback() {
  return (
    <main className="room-page">
      <section className="room-hero room-hero-compact">
        <div className="container room-hero-inner">
          <p className="eyebrow">The Room</p>
          <h1 className="room-hero-title">Loading…</h1>
        </div>
      </section>
    </main>
  )
}

function RoomRoute({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<RoomFallback />}>
      <main>{children}</main>
    </Suspense>
  )
}

function NotFoundPage() {
  return (
    <main className="site-page">
      <section className="section">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1 className="section-title">Page not found</h1>
          <p className="section-copy">
            That URL is not on this site. Try the home page, The Room, or booking.
          </p>
          <div className="home-dest-grid" style={{ marginTop: '1.5rem' }}>
            <a className="home-dest-card" href="/">
              <h3>Home</h3>
              <p>Back to DJ RHUE</p>
            </a>
            <a className="home-dest-card" href="/room">
              <h3>The Room</h3>
              <p>FAQs, tips and guides</p>
            </a>
            <a className="home-dest-card" href="/book">
              <h3>Book</h3>
              <p>Send an enquiry</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <StripTrailingSlash />
      <ScrollManager />
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listen" element={<ListenPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route
            path="/room"
            element={
              <RoomRoute>
                <RoomHubPage />
              </RoomRoute>
            }
          />
          <Route
            path="/room/:categoryId"
            element={
              <RoomRoute>
                <RoomCategoryPage />
              </RoomRoute>
            }
          />
          <Route
            path="/room/:categoryId/:slug"
            element={
              <RoomRoute>
                <RoomPostPage />
              </RoomRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}
