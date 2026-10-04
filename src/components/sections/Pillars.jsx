import { useTranslation } from 'react-i18next'
import { Cpu, ShieldCheck, Rocket, Wrench, Check } from 'lucide-react'
import { Container, Section, SectionTitle } from '../ui/Section.jsx'
import { motion } from 'framer-motion'

const icons = [Cpu, ShieldCheck, Rocket, Wrench]

export default function Pillars() {
  const { t } = useTranslation()
  const items = t('pillars.items', { returnObjects: true })

  return (
    <Section id="pillars" className="bg-white">
      <Container>
        <SectionTitle kicker={t('pillars.kicker')} title={t('pillars.title')} subtitle={t('pillars.subtitle')} />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, i) => {
            const Icon = icons[i] || Cpu
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="relative rounded-2xl bg-slate-50 ring-1 ring-slate-100 p-8 hover:ring-primary-300 hover:shadow-xl hover:shadow-primary-900/5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 rounded-xl bg-primary-900 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-gold-400" />
                  </div>
                  <span className="font-display text-5xl font-bold text-primary-100 select-none">{item.num}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary-900">{item.title}</h3>
                <p className="mt-3 text-gray-500 leading-relaxed">{item.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-primary-800">
                      <Check className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}