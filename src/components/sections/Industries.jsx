import { useTranslation } from 'react-i18next'
import { Factory, Truck, Building2, HeartPulse, Landmark, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { Container, Section, SectionTitle } from '../ui/Section.jsx'
import { motion } from 'framer-motion'

const icons = [Factory, Truck, Building2, HeartPulse, Landmark, ShoppingBag]

export default function Industries() {
  const { t } = useTranslation()
  const items = t('industries.items', { returnObjects: true })

  return (
    <Section id="industries" className="bg-white">
      <Container>
        <SectionTitle kicker={t('industries.kicker')} title={t('industries.title')} subtitle={t('industries.subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i] || Building2
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative p-7 rounded-2xl bg-slate-50 ring-1 ring-slate-100 hover:ring-primary-300 transition-all hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-900 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-800 group-hover:to-gold-600 transition-all">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-gold-500 transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-900">{item.title}</h3>
                <p className="mt-2.5 text-gray-500 leading-relaxed text-[15px]">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}