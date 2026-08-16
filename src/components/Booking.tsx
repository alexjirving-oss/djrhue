import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'

const eventTypes = [
  'Club night',
  'Festival / outdoor',
  'Private party',
  'Corporate / brand',
  'Wedding / celebration',
  'Equipment hire',
  'Other',
]

export function Booking() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const eventType = String(data.get('eventType') || '').trim()
    const date = String(data.get('date') || '').trim()
    const location = String(data.get('location') || '').trim()
    const message = String(data.get('message') || '').trim()

    const subject = encodeURIComponent(`DJ RHUE Booking — ${eventType || 'Enquiry'} — ${name}`)
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Event type: ${eventType}`,
        `Date: ${date}`,
        `Location: ${location}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    )

    window.location.href = `mailto:booking.djrhue@gmail.com?subject=${subject}&body=${body}`
    setStatus('ok')
    form.reset()
  }

  return (
    <section className="section booking" id="book">
      <div className="booking-banner">
        <img src="/photos/perf-malta.jpg" alt="" />
        <div className="booking-banner-veil" />
        <div className="container booking-banner-copy">
          <p className="eyebrow">Bookings & Enquiries</p>
          <h2 className="section-title">Lock in the date</h2>
        </div>
      </div>

      <div className="container booking-layout">
        <motion.div
          className="booking-side"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-copy">
            Clubs, festivals, private parties, corporate and equipment hire —
            across the UK and Malta.
          </p>

          <div className="booking-contact">
            <a href="tel:+447305940902">07305 940 902</a>
            <a href="mailto:booking.djrhue@gmail.com">booking.djrhue@gmail.com</a>
            <a href="https://instagram.com/dj_rhue" target="_blank" rel="noreferrer">
              @DJ_RHUE
            </a>
            <span>Bristol, UK &amp; Malta</span>
          </div>

          <div className="booking-qr">
            <img src="/brand/qr.png" alt="DJ RHUE Linktree QR code" />
            <div>
              <strong>Scan for bookings &amp; mixtapes</strong>
              <p>
                Or open{' '}
                <a href="https://linktr.ee/Rhue_james7" target="_blank" rel="noreferrer">
                  linktr.ee/Rhue_james7
                </a>
              </p>
            </div>
          </div>

          <p className="booking-note">
            Booking fee secures your date (from £50). Balance due 48 hours before
            the event. See <a href="#rates">rates</a> and <a href="#terms">terms</a>.
          </p>
        </motion.div>

        <motion.form
          className="booking-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.08 }}
        >
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="field">
              <label htmlFor="eventType">Event type</label>
              <select id="eventType" name="eventType" required defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="date">Event date</label>
              <input id="date" name="date" type="date" />
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" placeholder="City / venue" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Crowd size, set length, vibe, tech needs…"
              required
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Send booking enquiry
            </button>
            {status === 'ok' && (
              <p className="form-status ok">Opening your email app…</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}
