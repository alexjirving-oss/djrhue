import { motion } from 'framer-motion'

const services = [
  {
    n: '01',
    title: 'Club Nights',
    copy: 'High-energy urban sets for bars, clubs and nightlife venues.',
    img: '/photos/hero-black-gold.jpg',
  },
  {
    n: '02',
    title: 'Festivals & Outdoor',
    copy: 'Carnival energy and festival stages built for large crowds.',
    img: '/photos/perf-bunjy.jpg',
  },
  {
    n: '03',
    title: 'Private Events',
    copy: 'Birthdays, celebrations and parties with customised playlists.',
    img: '/photos/perf-cdj.jpg',
  },
  {
    n: '04',
    title: 'Corporate & Brand',
    copy: 'Reliable sets for brand activations, staff events and functions.',
    img: '/photos/perf-white-close.jpg',
  },
  {
    n: '05',
    title: 'International',
    copy: 'UK bookings plus Malta stages — Manoel Island to Valletta views.',
    img: '/photos/perf-manoel.jpg',
  },
]

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Services</p>
          <h2 className="section-title">Book for any room</h2>
          <p className="section-copy">
            Intimate venues, packed clubs, outdoor stages — professional sets that
            keep the floor moving.
          </p>
        </motion.div>

        <div className="services-visual">
          {services.map((service, i) => (
            <motion.article
              className="service-shot"
              key={service.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
            >
              <div className="service-shot-media">
                <img src={service.img} alt="" loading="lazy" />
              </div>
              <div className="service-shot-copy">
                <span>{service.n}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
