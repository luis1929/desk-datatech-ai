import { execFile } from 'node:child_process'
import { insertIntent, listIntents, claimIntent, markDone } from './intentStore.js'
import { classifyEmailIntent } from './emailIntentService.js'

const ORCA_BIN = process.env.ORCA_BIN || 'orca-ide'
const ORCA_ENABLED = process.env.ORCA_DISPATCH_ENABLED !== 'false'
const ORCA_TASK_PREFIX = 'DataTech·AI'

const INTENT_TO_MODULE = {
  landing: 'Landing / Contenido',
  contacto: 'Formulario de contacto / Email',
  proyecto: 'Nuevo proyecto / Cotización',
  soporte: 'Atención al Cliente',
  infra: 'Infraestructura / Deploy',
  marketing: 'Marketing / Contenido',
  otros: 'Revisión manual',
}

function orcaTaskTitle(intent, subject) {
  const module = INTENT_TO_MODULE[intent] || intent
  return `${ORCA_TASK_PREFIX} — ${module}: ${(subject || 'correo entrante').slice(0, 60)}`
}

function dispatchToOrca({ intent, subject }) {
  return new Promise((resolve) => {
    if (!ORCA_ENABLED) return resolve({ sent: false, reason: 'ORCA_DISPATCH_ENABLED=false' })

    const title = orcaTaskTitle(intent, subject)
    const spec = `Task generado por intent de email clasificado con hermes. Module: ${INTENT_TO_MODULE[intent] || intent}. Procesar según .context del módulo.`
    const args = ['orchestration', 'task-create', '--task-title', title, '--display-name', title.split(':')[0], '--spec', spec, '--json']

    execFile(ORCA_BIN, args, { timeout: 20000 }, (err, stdout) => {
      if (err) {
        console.warn('[OrcaBridge] orca-ide no disponible, tarea queda como pending en store', { error: err.message })
        return resolve({ sent: false, reason: 'orca unavailable', detail: err.message })
      }
      try {
        const parsed = JSON.parse(stdout.trim().split('\n').pop())
        if (parsed && parsed.ok === false) {
          const reason = parsed.error?.message || 'orca runtime unavailable'
          console.warn('[OrcaBridge] orca-ide responde ok=false, tarea queda como pending', { reason })
          return resolve({ sent: false, reason: 'orca unavailable', detail: reason, raw: parsed })
        }
        return resolve({ sent: true, task_id: parsed.id || parsed.task_id || null, raw: parsed })
      } catch (e) {
        console.warn('[OrcaBridge] respuesta orca-ide no parseable', { stdout })
        return resolve({ sent: false, reason: 'parse fail', stdout })
      }
    })
  })
}

export async function createOrcaDispatch({ from_email, from_name, subject, body }) {
  const payload = body || ''
  const classification = await classifyEmailIntent(payload)
  const r = classification || { intent: 'otros', confidence: 0, entities: {}, priority: 'baja' }
  const orca = await dispatchToOrca({ intent: r.intent, subject })

  const row = insertIntent({
    source: 'inbox-email',
    from_email: from_email || null,
    from_name: from_name || null,
    subject: subject || null,
    body: payload,
    intent: r.intent,
    confidence: r.confidence || 0,
    priority: r.priority || 'baja',
    entities: r.entities || {},
    orca_task_id: orca.sent ? String(orca.task_id || '') : null,
    status: orca.sent ? 'dispatched' : 'pending',
    notes: orca.sent ? 'Despachado a Orca orchestration' : `Orca no disponible: ${orca.reason || ''}`,
  })

  console.log('[OrcaBridge] inbox intent procesado', { id: row.id, intent: r.intent, dispatched: orca.sent })
  return { ...row, classification: r, orca }
}

export const orcaTaskBridge = {
  createOrcaDispatch,
  listIntents,
  claimIntent,
  markDone,
  INTENT_TO_MODULE,
}

export { listIntents, claimIntent, markDone, INTENT_TO_MODULE }
