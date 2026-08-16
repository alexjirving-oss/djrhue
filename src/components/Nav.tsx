import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#sounds', label: 'Sounds' },
  { href: '#services', label: 'Services' },
  { href: '#rates', label: 'Rates' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#terms', label: 'Terms' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" aria-label="DJ RHUE home">
          <img className="nav-logo" src="/brand/logo.png" alt="DJ RHUE" />
        </a>

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
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a className="btn btn-primary nav-cta" href="#book" onClick={() => setOpen(false)}>
              Book
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
