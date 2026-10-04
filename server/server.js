import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { sendContactEmail } from './mailer.js'
import { createOrcaDispatch, listIntents, claimIntent, markDone, INTENT_TO_MODULE } from './services/orcaTaskBridge.js'
import { start as startEmailPoller } from './services/emailPollerService.js'

const app = express()
const PORT = process.env.PORT || 3010
const HERMES_KEY = process.env.HERMES_INTERNAL_KEY || ''

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'datatech-ai-contact' })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, company, industry, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email y message son obligatorios' })
  }
  if (typeof name !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'email inválido' })
  }

  try {
    await sendContactEmail({ name, email, company, industry, message })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] error enviando email:', err.message)
    res.status(500).json({ ok: false, error: 'no se pudo enviar el email' })
  }
})

function requireInternalKey(req, res, next) {
  const key = req.get('x-internal-key')
  if (!HERMES_KEY || key !== HERMES_KEY) {
    return res.status(401).json({ ok: false, error: 'x-internal-key inválida' })
  }
  next()
}

app.get('/api/hermes/intents', requireInternalKey, (req, res) => {
  const { status, intent, limit } = req.query
  res.json({ ok: true, intents: listIntents({ status, intent, limit }) })
})

app.post('/api/hermes/intent', requireInternalKey, async (req, res) => {
  const { message, subject, from, fromName } = req.body || {}
  if (!message) {
    return res.status(400).json({ ok: false, error: 'message es obligatorio' })
  }
  try {
    const row = await createOrcaDispatch({ from_email: from, from_name: fromName, subject, body: message })
    res.json({
      ok: true,
      id: row.id,
      intent: row.intent,
      confidence: row.confidence,
      entities: row.entities,
      priority: row.priority,
      status: row.status,
      orca_dispatched: row.status === 'dispatched',
      orca_task_id: row.orca_task_id,
    })
  } catch (err) {
    console.error('[hermes] error creando intent:', err.message)
    res.status(500).json({ ok: false, error: 'no se pudo clasificar el correo' })
  }
})

app.post('/api/hermes/intents/:id/claim', requireInternalKey, (req, res) => {
  const row = claimIntent(req.params.id)
  if (!row) return res.status(404).json({ ok: false, error: 'no encontrado o ya no está pending' })
  res.json({ ok: true, intent: row })
})

app.post('/api/hermes/intents/:id/complete', requireInternalKey, (req, res) => {
  const { processedBy, notes } = req.body || {}
  const row = markDone(req.params.id, { processedBy, notes })
  if (!row) return res.status(404).json({ ok: false, error: 'no encontrado' })
  res.json({ ok: true, intent: row })
})

app.get('/api/hermes/modules', requireInternalKey, (_req, res) => {
  res.json({ ok: true, modules: INTENT_TO_MODULE })
})

app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'not found' })
})

app.listen(PORT, () => {
  console.log(`[datatech-ai-server] listening on :${PORT}`)
  startEmailPoller()
})