import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Languages, ChevronRight } from 'lucide-react'
import { Container } from './ui/Section.jsx'
import { Button } from './ui/Button.jsx'

export const Logo = ({ dark = true }) => (
  <a href="#top" className="flex items-center gap-2.5">
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg shadow-primary-900/30">
      <span className="font-display font-bold text-gold-400 text-sm">D</span>
    </div>
    <div className="leading-tight">
      <span className={`font-display font-bold text-lg tracking-tight ${dark ? 'text-white' : 'text-primary-900'}`}>
        DataTech<span className="text-gold-500">·AI</span>
      </span>
      <p className={`text-[10px] uppercase tracking-widest ${dark ? 'text-white/50' : 'text-gray-400'}`}>
        Enterprise Software
      </p>
    </div>
  </a>
)

const DesktopNav = () => {
  const { t } = useTranslation()
  const links = [
    { href: '#services', label: t('nav.services') },
    { href: '#industries', label: t('nav.industries') },
    { href: '#pillars', label: t('nav.pillars') },
    { href: '#methodology', label: t('nav.methodology') },
    { href: '#stack', label: t('nav.stack') },
    { href: '#careers', label: t('nav.careers') },
  ]
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {links.map((l) => (
        <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 hover:text-gold-300 transition-colors">
          {l.label}
        </a>
      ))}
    </nav>
  )
}

export const LanguageSwitcher = ({ light = false }) => {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)
  const toggle = () => {
    const next = lang === 'es' ? 'en' : 'es'
    localStorage.setItem('datatech-lang', next)
    i18n.changeLanguage(next)
    setLang(next)
    document.documentElement.lang = next
  }
  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
        light
          ? 'text-primary-800 hover:bg-primary-900/5 ring-1 ring-primary-900/10'
          : 'text-white/80 hover:bg-white/10 ring-1 ring-white/15'
      }`}
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  )
}

export default function Navbar({ transparent = false }) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || !transparent || open

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-primary-950/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'}`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <Logo />
          <div className="hidden lg:flex items-center gap-6">
            <DesktopNav />
            <LanguageSwitcher />
            <a href="#contact" className="flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300">
              {t('nav.cta')} <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setOpen(!open)} className="p-2 text-white" aria-label="Menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>
      {open && (
        <div className="lg:hidden bg-primary-950 border-t border-white/10">
          <div className="px-4 py-6 space-y-1">
            {[
              { href: '#services', label: t('nav.services') },
              { href: '#industries', label: t('nav.industries') },
              { href: '#pillars', label: t('nav.pillars') },
              { href: '#methodology', label: t('nav.methodology') },
              { href: '#stack', label: t('nav.stack') },
              { href: '#careers', label: t('nav.careers') },
              { href: '#contact', label: t('nav.cta') },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-white/90 hover:text-gold-300 font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3">
              <Button href="#contact" variant="gold" className="w-full" onClick={() => setOpen(false)}>
                {t('nav.cta')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}