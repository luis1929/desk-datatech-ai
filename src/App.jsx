import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Industries from './components/sections/Industries.jsx'
import Services from './components/sections/Services.jsx'
import Operation from './components/sections/Operation.jsx'
import Pillars from './components/sections/Pillars.jsx'
import Methodology from './components/sections/Methodology.jsx'
import Stack from './components/sections/Stack.jsx'
import Careers from './components/sections/Careers.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar transparent />
      <main>
        <Hero />
        <Services />
        <Industries />
        <Operation />
        <Pillars />
        <Methodology />
        <Stack />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}