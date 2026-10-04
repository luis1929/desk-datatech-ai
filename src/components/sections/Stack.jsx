import { useTranslation } from 'react-i18next'
import { Boxes } from 'lucide-react'
import { Container, Section, SectionTitle } from '../ui/Section.jsx'
import { motion } from 'framer-motion'

const groupColors = ['from-primary-800 to-primary-950', 'from-gold-600 to-gold-400', 'from-primary-700 to-primary-900', 'from-slate-700 to-slate-900', 'from-primary-500 to-primary-700']

export default function Stack() {
  const { t } = useTranslation()
  const groups = t('stack.groups', { returnObjects: true })

  return (
    <Section id="stack" className="bg-white">
      <Container>
        <SectionTitle kicker={t('stack.kicker')} title={t('stack.title')} subtitle={t('stack.subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {groups.map((g, gi) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: gi * 0.07 }}
              className="rounded-2xl bg-slate-50 ring-1 ring-slate-100 p-6 hover:ring-primary-300 hover:shadow-lg hover:shadow-primary-900/5 transition-all"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${groupColors[gi % groupColors.length]} flex items-center justify-center mb-4`}>
                <Boxes className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="font-display font-bold text-primary-900">{g.title}</h3>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="text-sm font-medium text-gray-600 bg-white rounded-lg px-3 py-2 ring-1 ring-slate-100">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}