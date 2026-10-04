import { useTranslation } from 'react-i18next'
import { Mail, Sparkles, Rocket, GraduationCap, Award, ArrowUpRight } from 'lucide-react'
import { Container, Section } from '../ui/Section.jsx'
import { Button } from '../ui/Button.jsx'
import { motion } from 'framer-motion'

const icons = [Rocket, GraduationCap, Award]

export default function Careers() {
  const { t } = useTranslation()
  const perks = t('careers.perks', { returnObjects: true }) || []

  return (
    <Section id="careers" className="bg-primary-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 ring-1 ring-gold-400/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t('careers.kicker')}
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {t('careers.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/40 text-left md:text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gold-400 to-gold-600" />
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed font-sans">
              "{t('careers.quote')}"
            </p>
            <p className="mt-4 text-base md:text-lg text-gold-300 font-medium">
              {t('careers.ctaSubtitle')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="mailto:hr@datatech.ai"
                variant="gold"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-gold-500/20"
              >
                <Mail className="w-5 h-5" />
                {t('careers.cta')}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <a
                href="mailto:hr@datatech.ai"
                className="text-sm font-semibold text-white/70 hover:text-white transition-colors underline underline-offset-4"
              >
                hr@datatech.ai
              </a>
            </div>
          </motion.div>
        </div>

        {/* Perks Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Array.isArray(perks) &&
            perks.map((perk, i) => {
              const Icon = icons[i] || Rocket
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-gold-400/40 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{perk.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{perk.desc}</p>
                </motion.div>
              )
            })}
        </div>
      </Container>
    </Section>
  )
}
