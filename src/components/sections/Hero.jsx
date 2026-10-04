import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Rocket, Wrench } from 'lucide-react'
import { Container } from '../ui/Section.jsx'
import { Button } from '../ui/Button.jsx'

const pillarIcons = [Cpu, ShieldCheck, Rocket, Wrench]

export default function Hero() {
  const { t } = useTranslation()

  const stats = [
    { value: '40+', label: t('hero.stats.projects') },
    { value: '15', label: t('hero.stats.sprints') },
    { value: '5', label: t('hero.stats.golive') },
    { value: '6', label: t('hero.stats.industries') },
  ]

  return (
    <section id="top" className="hero-gradient relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 ring-1 ring-white/15 text-gold-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mt-6"
            >
              {t('hero.title1')} <span className="text-primary-200">{t('hero.title2')}</span>
              <br />
              <span className="text-gradient-gold">{t('hero.title3')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="#contact" variant="gold" size="lg" type="link">
                {t('hero.ctaPrimary')} <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="#methodology" variant="outline" size="lg" type="link">
                {t('hero.ctaSecondary')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-bold text-gold-400">{s.value}</p>
                  <p className="text-sm text-white/60 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold-500/40 to-primary-500/40 blur-lg opacity-60" />
              <div className="relative rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-white/70 text-sm font-medium">Arquitectura</p>
                  <CheckCircle2 className="w-5 h-5 text-gold-400" />
                </div>

                <div className="space-y-4">
                  {t('hero.pillars', { returnObjects: true }).map((p, i) => {
                    const Icon = pillarIcons[i] || Cpu
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.12 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.05] ring-1 ring-white/10 hover:ring-gold-400/40 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-gold-400" />
                        </div>
                        <span className="text-white/85 font-medium">{p}</span>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['#c99a42', '#3a74a9', '#5f92c2'].map((c) => (
                      <div key={c} className="w-8 h-8 rounded-full ring-2 ring-primary-950" style={{ background: c }} />
                    ))}
                  </div>
                  <p className="text-sm text-white/60">Equipo senior, entrega continua</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}