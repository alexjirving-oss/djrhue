import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Listen } from './components/Listen'
import { Proof } from './components/Proof'
import { About } from './components/About'
import { Gallery } from './components/Gallery'
import { Services } from './components/Services'
import { Why } from './components/Why'
import { Rates } from './components/Rates'
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
        <Listen />
        <Proof />
        <About />
        <Gallery />
        <Services />
        <Why />
        <Rates />
        <Booking />
        <Terms />
      </main>
      <Footer />
    </>
  )
}
