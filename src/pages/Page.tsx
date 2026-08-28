import type { ReactNode } from 'react'

/** Shared top padding for non-home pages under the fixed nav. */
export function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <main className={`site-page ${className}`.trim()}>{children}</main>
}
