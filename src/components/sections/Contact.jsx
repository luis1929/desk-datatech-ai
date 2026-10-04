import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Building2, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Container, Section, SectionTitle } from '../ui/Section.jsx'
import { Button } from '../ui/Button.jsx'
import axios from 'axios'

const inputClass =
  'w-full px-4 py-3.5 rounded-xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-600 focus:outline-none transition-all text-gray-800 placeholder:text-gray-400'

export default function Contact() {
  const { t } = useTranslation()
  const industries = t('industries.items', { returnObjects: true })
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', industry: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', company: '', industry: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" className="bg-grid-pattern relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-100/50 rounded-full blur-3xl" />
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionTitle kicker={t('contact.kicker')} title={t('contact.title')} subtitle={t('contact.subtitle')} align="left" />
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary-900 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-400" />
                </div>
                <a href="mailto:contacto@datatech-ai.org" className="text-primary-800 font-semibold hover:text-gold-600 transition-colors">
                  contacto@datatech-ai.org
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary-900 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-gold-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  Respuesta garantizada en <span className="text-primary-800 font-semibold">24 horas hábiles</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-slate-100 shadow-xl shadow-primary-900/10 p-6 md:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <CheckCircle2 className="w-16 h-16 text-gold-500 mb-4" />
                <h3 className="font-display text-2xl font-bold text-primary-900">{t('contact.success')}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">{t('contact.name')} *</label>
                    <input required name="name" value={form.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">{t('contact.company')}</label>
                    <input name="company" value={form.company} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">{t('contact.email')} *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">{t('contact.industry')}</label>
                  <select name="industry" value={form.industry} onChange={handleChange} className={inputClass}>
                    <option value="">{t('contact.placeholderIndustry')}</option>
                    {industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">{t('contact.message')} *</label>
                  <textarea required name="message" value={form.message} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} />
                </div>
                {status === 'error' && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 ring-1 ring-red-200 text-red-700 text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {t('contact.error')}
                  </div>
                )}
                <Button type="button" variant="primary" size="lg" className="w-full" onClick={handleSubmit}>
                  {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {t('contact.submit')}
                </Button>
                <p className="text-xs text-gray-400 text-center">{t('contact.note')}</p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}