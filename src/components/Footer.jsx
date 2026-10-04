import { useTranslation } from 'react-i18next'
import { Mail, Share2, Globe2 } from 'lucide-react'
import { Container } from './ui/Section.jsx'
import { Logo } from './Navbar.jsx'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const nav = [
    { href: '#services', label: t('nav.services') },
    { href: '#industries', label: t('nav.industries') },
    { href: '#pillars', label: t('nav.pillars') },
    { href: '#methodology', label: t('nav.methodology') },
    { href: '#stack', label: t('nav.stack') },
    { href: '#careers', label: t('nav.careers') },
  ]

  return (
    <footer className="bg-primary-950 text-white">
      <Container>
        <div className="py-14 grid md:grid-cols-3 gap-10">
          <div>
            <Logo dark />
            <p className="mt-5 text-white/60 leading-relaxed text-sm max-w-xs">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-gold-400">{t('footer.links')}</h4>
            <ul className="space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/70 hover:text-gold-300 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-gold-400">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contacto@datatech-ai.org" className="flex items-center gap-2.5 text-white/70 hover:text-gold-300 text-sm transition-colors">
                  <Mail className="w-4 h-4 text-gold-400" /> {t('footer.domain')}
                </a>
              </li>
              <li>
                <a href="mailto:hr@datatech.ai" className="flex items-center gap-2.5 text-white/70 hover:text-gold-300 text-sm transition-colors">
                  <Mail className="w-4 h-4 text-gold-400" /> hr@datatech.ai
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/70 text-sm">
                <Globe2 className="w-4 h-4 text-gold-400" /> datatech-ai.org
              </li>
              <li className="flex items-center gap-2.5 text-white/70 text-sm">
                <Share2 className="w-4 h-4 text-gold-400" /> /company/datatech-ai
              </li>
            </ul>
          </div>
        </div>
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
            © {year} DataTech·AI. {t('footer.rights')}
          </p>
          <p className="text-xs text-white/30">Arquitectura · Seguridad · DevOps · Calidad</p>
        </div>
      </Container>
    </footer>
  )
}