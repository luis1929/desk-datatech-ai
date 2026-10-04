import { useTranslation } from 'react-i18next'
import { Search, DraftingCompass, GitBranch, FileCheck2 } from 'lucide-react'
import { Container, Section, SectionTitle } from '../ui/Section.jsx'
import { motion } from 'framer-motion'

const icons = [Search, DraftingCompass, GitBranch, FileCheck2]

export default function Methodology() {
  const { t } = useTranslation()
  const items = t('methodology.items', { returnObjects: true })

  return (
    <Section id="methodology" className="bg-grid-pattern">
      <Container>
        <SectionTitle kicker={t('methodology.kicker')} title={t('methodology.title')} subtitle={t('methodology.subtitle')} />

        <div className="relative">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400 via-primary-400 to-primary-200 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {items.map((item, i) => {
              const Icon = icons[i] || Search
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5 }}
                  className={`relative md:flex md:items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'} pl-20 md:pl-0`}
                >
                  <div className="absolute left-0 md:left-1/2 top-1 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-950 ring-2 ring-gold-400/60 shadow-lg shadow-black/30 flex items-center justify-center z-10">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>

                  <div className={`md:w-[calc(50%-48px)] rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-900/8 transition-all p-7 md:p-8`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-display text-sm font-bold text-gold-600">FASE {item.num}</span>
                      <span className="h-px flex-1 bg-slate-100" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-900">{item.title}</h3>
                    <p className="mt-3 text-gray-500 leading-relaxed">{item.desc}</p>
                    <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary-900/5 ring-1 ring-primary-900/10 text-primary-800 text-sm font-semibold">
                      <FileCheck2 className="w-4 h-4 text-gold-600" />
                      {item.deliverable}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}