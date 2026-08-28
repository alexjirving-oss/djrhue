import { useEffect, useState } from 'react'

const links = [
  { href: '#listen', label: 'Listen' },
  { href: '#proof', label: 'Proof' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why' },
  { href: '#faq', label: 'FAQ' },
  { href: '#rates', label: 'Rates' },
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
            <a className="btn btn-primary nav-cta" href="#book" onClick={() => setOpen(false)}>
              Book
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
