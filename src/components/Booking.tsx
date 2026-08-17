import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'
import { SocialLinks } from './SocialLinks'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/booking.djrhue@gmail.com'
const WHATSAPP = '447305940902'

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
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [eventType, setEventType] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setErrorMsg('')

    const name = String(data.get('name') || '').trim()
    const event = String(data.get('eventType') || '').trim()
    data.append('_subject', `DJ RHUE Booking — ${event || 'Enquiry'} — ${name}`)
    data.append('_template', 'table')
    data.append('_captcha', 'false')

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      const json = (await res.json().catch(() => null)) as {
        success?: boolean | string
        message?: string
      } | null
      if (
        res.ok &&
        (json?.success === true || json?.success === 'true')
      ) {
        setStatus('ok')
        form.reset()
        setEventType('')
        return
      }
      throw new Error(json?.message || `Submission failed (${res.status})`)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try WhatsApp or email.')
    }
  }

  return (
    <section className="section booking" id="book">
      <div className="booking-banner">
        <img src="/photos/setup-outdoor-day.jpg" alt="" />
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
          viewport={viewportOnce(0.3)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <p className="section-copy">
            Clubs, festivals, private parties, corporate and equipment hire —
            across the UK and Malta.
          </p>

          <div className="booking-contact">
            <a
              className="btn btn-primary booking-whatsapp"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi DJ RHUE — I would like to enquire about a booking.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 07305 940 902
            </a>
            <a href="tel:+447305940902">07305 940 902</a>
            <a href="mailto:booking.djrhue@gmail.com">booking.djrhue@gmail.com</a>
            <SocialLinks className="booking-social" />
            <span>Bristol, UK &amp; Malta</span>
          </div>

          <div className="booking-qr">
            <img src="/brand/qr.png" alt="QR code — scan to open djrhue.com booking" />
            <div>
              <strong>Scan to book online</strong>
              <p>
                Opens{' '}
                <a href="https://djrhue.com/#book">djrhue.com/#book</a>
              </p>
            </div>
          </div>

          <p className="booking-note">
            Booking fee secures your date (£50 standard / £70 guest / £100 headline).
            Remaining balance due no later than 48 hours before the event. See{' '}
            <a href="#rates">rates</a> and <a href="#terms">terms</a>.
          </p>
        </motion.div>

        <motion.form
          className="booking-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.2)}
          transition={motionTransition({ duration: 0.75, delay: 0.08 })}
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
              <input id="phone" name="phone" type="tel" required autoComplete="tel" />
            </div>
            <div className="field">
              <label htmlFor="eventType">Event type</label>
              <select
                id="eventType"
                name="eventType"
                required
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {eventType === 'Equipment hire' && (
                <p className="form-hint">
                  Equipment hire is subject to separate terms — see{' '}
                  <a
                    href="/docs/DJ_RHUE_Equipment_Hire_Terms.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Equipment Hire Terms
                  </a>
                  .
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="date">Event date</label>
              <input id="date" name="date" type="date" required />
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

          <div className="field field-checkbox">
            <label className="checkbox-label">
              <input type="checkbox" name="termsAccepted" required />
              <span>
                I agree to the{' '}
                <a
                  href="/docs/DJ_RHUE_Terms_2026.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms &amp; Conditions
                </a>
              </span>
            </label>
          </div>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send booking enquiry'}
            </button>
            {status === 'ok' && (
              <p className="form-status ok" role="status">
                Enquiry sent — DJ RHUE will reply shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status error" role="alert">
                {errorMsg || 'Could not send. Try WhatsApp or email instead.'}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}
