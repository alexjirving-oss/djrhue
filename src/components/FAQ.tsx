import { motion } from 'framer-motion'
import { motionTransition, viewportOnce } from '../lib/motion'

const faqs = [
  {
    q: 'How much does a DJ cost in Bristol?',
    a: 'Performance fees start from £50 per hour for extended multi-hour bookings, from £70 for warm-up and guest sets (up to 1 hour), and from £100 for headline peak-time sets. Equipment hire, PA and travel are quoted separately — see the rates section for full 2026 pricing.',
  },
  {
    q: 'What genres does DJ RHUE play?',
    a: 'Afrobeats, Dancehall, Amapiano, Reggae, Hip Hop and R&B — Caribbean and urban sets tailored for clubs, festivals, carnivals, weddings and private events across Bristol and the UK.',
  },
  {
    q: 'Do you DJ weddings in Bristol with Caribbean music?',
    a: 'Yes. Wedding and celebration bookings are welcome — sets blend Afrobeats, Dancehall and Caribbean favourites with R&B and Hip Hop to keep every generation on the floor. Share your playlist must-haves when you enquire.',
  },
  {
    q: 'Does DJ RHUE travel to Malta?',
    a: 'Yes. International bookings include Malta — filmed sessions at Manoel Island, club nights and private events. Enquire via the booking form or WhatsApp with your date and venue.',
  },
  {
    q: 'How do I book DJ RHUE for a club or corporate event?',
    a: 'Submit the booking form with your event date, location and brief, message on WhatsApp at 07305 940 902, or email booking.djrhue@gmail.com. A booking fee secures your date (£50 standard / £70 guest / £100 headline).',
  },
  {
    q: 'Can you provide DJ equipment and a PA for outdoor events?',
    a: 'Yes — branded booth, Pioneer CDJ setup and PA hire are available for festivals, carnivals and outdoor private events. Equipment is quoted separately from the performance fee.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'Peak summer weekends, carnival season and Malta dates fill quickly — booking 4–8 weeks ahead is ideal. Last-minute enquiries are welcome when the calendar allows.',
  },
  {
    q: 'Where does DJ RHUE perform in the UK?',
    a: 'Based in Bristol with regular bookings across the South West, London and nationwide — St Paul\'s Carnival, SWU.FM and Rinse FM sessions, club residencies and festival stages.',
  },
] as const

export function FAQ() {
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(0.35)}
          transition={motionTransition({ duration: 0.7 })}
        >
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">Booking questions</h2>
          <p className="section-copy">
            Common questions from promoters, couples and event planners booking
            an Afrobeats and Dancehall DJ in Bristol — or Malta.
          </p>
        </motion.div>

        <dl className="faq-list">
          {faqs.map((item, i) => (
            <motion.div
              key={item.q}
              className="faq-item"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce(0.2)}
              transition={motionTransition({ duration: 0.5, delay: i * 0.03 })}
            >
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
