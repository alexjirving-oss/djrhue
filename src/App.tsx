import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Sounds } from './components/Sounds'
import { Services } from './components/Services'
import { Rates } from './components/Rates'
import { Why } from './components/Why'
import { Gallery } from './components/Gallery'
import { Booking } from './components/Booking'
import { Terms } from './components/Terms'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Sounds />
        <Services />
        <Rates />
        <Why />
        <Gallery />
        <Booking />
        <Terms />
      </main>
      <Footer />
    </>
  )
}
