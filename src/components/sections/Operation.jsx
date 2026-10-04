import { useTranslation } from 'react-i18next'
import { Blocks, Workflow, FileSpreadsheet, MonitorSmartphone } from 'lucide-react'
import { Container, Section, SectionTitle } from '../ui/Section.jsx'
import { motion } from 'framer-motion'

const icons = [Blocks, Workflow, FileSpreadsheet]

export default function Operation() {
  const { t } = useTranslation()
  const features = t('operation.features', { returnObjects: true })

  return (
    <Section id="operation" className="bg-primary-950 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-500/15 blur-3xl" />

      <Container className="relative">
        <SectionTitle kicker={t('operation.kicker')} title={t('operation.title')} subtitle={t('operation.subtitle')} dark />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => {
            const Icon = icons[i] || MonitorSmartphone
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl bg-white/[0.05] ring-1 ring-white/10 p-8 hover:ring-gold-400/40 hover:bg-white/[0.08] transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 ring-1 ring-gold-400/30 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-3 text-white/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}