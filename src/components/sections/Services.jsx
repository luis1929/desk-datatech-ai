import { useTranslation } from 'react-i18next'
import {
  Bot,
  BrainCircuit,
  Radio,
  ScanFace,
  Globe2,
  Package,
  Briefcase,
  LayoutDashboard,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react'
import { Container, Section, SectionTitle } from '../ui/Section.jsx'
import { motion } from 'framer-motion'

const iconMap = {
  chatbot: Bot,
  ai: BrainCircuit,
  'social-listening': Radio,
  'image-processing': ScanFace,
  'portales-b2b': Globe2,
  'a-medida': Package,
  'servicios-b2b': Briefcase,
  'portales-clientes': LayoutDashboard,
}

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) || []

  const aiItems = items.filter((item) => item.category === 'ai')
  const softwareItems = items.filter((item) => item.category === 'software')

  const renderGrid = (groupItems, isAiGroup = false) => (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {groupItems.map((item, i) => {
        const Icon = iconMap[item.id] || Package
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className={`group relative rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 transition-all p-7 md:p-8 overflow-hidden flex flex-col justify-between`}
          >
            <div
              className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${
                isAiGroup ? 'from-gold-400 via-gold-500 to-primary-700' : 'from-primary-600 to-primary-900'
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    isAiGroup
                      ? 'bg-gradient-to-br from-primary-900 to-primary-950 shadow-md shadow-primary-950/20'
                      : 'bg-primary-900'
                  }`}
                >
                  <Icon className="w-7 h-7 text-gold-400" />
                </div>
                {isAiGroup && (
                  <span className="px-3 py-1 rounded-full bg-gold-400/10 text-gold-600 text-xs font-semibold uppercase tracking-wider">
                    AI Capability
                  </span>
                )}
              </div>

              <h3 className="font-display text-xl font-bold text-primary-900 leading-snug mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-800 group-hover:text-gold-600 transition-colors">
              <Check className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{item.highlight || 'Adaptado a tu operación'}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <Section id="services" className="bg-grid-pattern relative">
      <Container>
        <SectionTitle
          kicker={t('services.kicker')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        {/* AI Capabilities Block */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-500" />
            </div>
            <h3 className="font-display text-2xl font-bold text-primary-900">
              {t('services.aiCategory')}
            </h3>
            <div className="h-px flex-1 bg-slate-200 hidden sm:block" />
          </div>
          {renderGrid(aiItems.length > 0 ? aiItems : items.slice(0, 4), true)}
        </div>

        {/* Enterprise Software Block */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-900/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary-800" />
            </div>
            <h3 className="font-display text-2xl font-bold text-primary-900">
              {t('services.softwareCategory')}
            </h3>
            <div className="h-px flex-1 bg-slate-200 hidden sm:block" />
          </div>
          {renderGrid(softwareItems.length > 0 ? softwareItems : items.slice(4), false)}
        </div>
      </Container>
    </Section>
  )
}