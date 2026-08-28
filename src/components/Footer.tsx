import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mark">
        <img src="/brand/signature.png" alt="DJ RHUE" />
      </div>
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/brand/logo.png" alt="" />
          <p>Caribbean &amp; Urban DJ · Est. 2025 · Bristol, United Kingdom · Malta</p>
        </div>

        <div className="footer-meta">
          <SocialLinks className="footer-social" />
          <div className="footer-links">
            <a href="#listen">Listen</a>
            <a href="#rates">Rates</a>
            <a href="#terms">Terms</a>
            <a href="/docs/DJ_RHUE_EPK_2026.pdf" target="_blank" rel="noreferrer">
              EPK
            </a>
            <a href="/docs/DJ_RHUE_Rates_2026.pdf" target="_blank" rel="noreferrer">
              Rates PDF
            </a>
            <a href="#book">Book</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
