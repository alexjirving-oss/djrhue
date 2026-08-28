import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/listen', label: 'Listen' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/services', label: 'Services' },
  { to: '/room', label: 'Room' },
  { to: '/faq', label: 'FAQ' },
  { to: '/rates', label: 'Rates' },
  { to: '/terms', label: 'Terms' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const notHome = location.pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className={`nav${scrolled || notHome ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" aria-label="DJ RHUE home">
          <img className="nav-logo" src="/brand/logo.png" alt="DJ RHUE" />
        </Link>

        <button
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map((link) => {
            const active =
              link.to === '/room'
                ? location.pathname.startsWith('/room')
                : location.pathname === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={active ? 'nav-active' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li>
            <a
              className="btn btn-ghost nav-epk"
              href="/docs/DJ_RHUE_EPK_2026.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              EPK
            </a>
          </li>
          <li>
            <Link className="btn btn-primary nav-cta" to="/book" onClick={() => setOpen(false)}>
              Book
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
