import type { ReactNode } from 'react'

type SocialLink = {
  name: string
  href: string
  label: string
  icon: ReactNode
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true as const,
  focusable: false as const,
}

const links: SocialLink[] = [
  {
    name: 'youtube',
    href: 'https://youtube.com/@rhue_james7',
    label: 'DJ RHUE on YouTube',
    icon: (
      <svg {...iconProps}>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
      </svg>
    ),
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/dj_rhue/',
    label: 'DJ RHUE on Instagram',
    icon: (
      <svg {...iconProps}>
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4a4.1 4.1 0 0 1-1.5-1 4.1 4.1 0 0 1-1-1.5c-.2-.4-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.8.1-1.1 0-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.3-.1 1.6-.1 4.8s0 3.5.1 4.8c0 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c1.1 0 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c0-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.3-.1-1.6-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.4-8.3a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0z" />
      </svg>
    ),
  },
  {
    name: 'tiktok',
    href: 'https://www.tiktok.com/@dj_rhue',
    label: 'DJ RHUE on TikTok',
    icon: (
      <svg {...iconProps}>
        <path d="M19.6 7.2a6.7 6.7 0 0 1-3.9-1.2v7.3a5.9 5.9 0 1 1-5.1-5.8v2.9a3 3 0 1 0 2.2 2.9V2.2h2.9a3.8 3.8 0 0 0 3.9 3.9v2.1z" />
      </svg>
    ),
  },
  {
    name: 'soundcloud',
    href: 'https://soundcloud.com/rhu-tjames',
    label: 'DJ RHUE on SoundCloud',
    icon: (
      <svg {...iconProps}>
        <path d="M17.4 10.2a3.4 3.4 0 0 0-1.5.4 4.7 4.7 0 0 0-9.2 1.4H6.4a2.9 2.9 0 0 0 0 5.8h11a3.4 3.4 0 1 0 0-6.8zM1.8 12.4h.9v5.1H1.8zm1.9-1.4h.9v6.5h-.9zm1.9-.6h.9v7.1h-.9z" />
      </svg>
    ),
  },
  {
    name: 'mixcloud',
    href: 'https://www.mixcloud.com/DJRHUE/',
    label: 'DJ RHUE on Mixcloud',
    icon: (
      <svg {...iconProps}>
        <path d="M3.2 8.2h1.6v7.6H3.2zm3.1-2.4h1.6v12.4H6.3zm3.1 4.2h1.6v4H9.4zm3.1-3.5h1.6v11H12.5zm3.1 1.7h1.6v7.6h-1.6zm3.2-2.6h1.6v12.8h-1.6z" />
      </svg>
    ),
  },
  {
    name: 'spotify',
    href: 'https://open.spotify.com/user/rhuarje',
    label: 'DJ RHUE on Spotify',
    icon: (
      <svg {...iconProps}>
        <path d="M12 1.8A10.2 10.2 0 1 0 22.2 12 10.2 10.2 0 0 0 12 1.8zm4.7 14.7a.64.64 0 0 1-.88.21 13.2 13.2 0 0 0-7.5-1.9 13.4 13.4 0 0 0-2.5.23.64.64 0 1 1-.24-1.3 14.6 14.6 0 0 1 2.8-.25 14.5 14.5 0 0 1 8.1 2.1.64.64 0 0 1 .22.91zm1.3-2.9a.8.8 0 0 1-1.1.26 16 16 0 0 0-9-2.3 16.3 16.3 0 0 0-2.9.26.8.8 0 0 1-.3-1.55 17.8 17.8 0 0 1 3.2-.29 17.6 17.6 0 0 1 9.9 2.5.8.8 0 0 1 .2 1.12zm.1-3a.95.95 0 0 1-1.3.31 19.2 19.2 0 0 0-10.4-2.6 19.5 19.5 0 0 0-3.4.3.95.95 0 1 1-.33-1.87 21.4 21.4 0 0 1 3.7-.33 21.1 21.1 0 0 1 11.4 2.85.95.95 0 0 1 .33 1.34z" />
      </svg>
    ),
  },
]

type SocialLinksProps = {
  className?: string
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <nav
      className={`social-links ${className}`.trim()}
      aria-label="DJ RHUE on social media"
    >
      {links.map((link) => (
        <a
          key={link.name}
          className="social-link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </nav>
  )
}
