import { randomUUID } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')
const FILE = join(DATA_DIR, 'intents.jsonl')

mkdirSync(DATA_DIR, { recursive: true })

export function loadAll() {
  if (!exists(FILE)) return []
  return readFileSync(FILE, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line)
      } catch {
        return null
      }
    })
    .filter(Boolean)
}

export function listIntents({ status, intent, limit = 50 }) {
  let rows = loadAll()
  if (status) rows = rows.filter((r) => r.status === status)
  if (intent) rows = rows.filter((r) => r.intent === intent)
  return rows.slice(0, parseInt(limit, 10) || 50)
}

export function insertIntent(data) {
  const row = {
    id: randomUUID(),
    source: data.source || 'inbox-email',
    channel: 'email',
    from_email: data.from_email || null,
    from_name: data.from_name || null,
    subject: data.subject || null,
    body: data.body || '',
    intent: data.intent,
    confidence: data.confidence || 0,
    priority: data.priority || 'baja',
    entities: data.entities || {},
    orca_task_id: data.orca_task_id || null,
    status: data.status || 'pending',
    notes: data.notes || null,
    created_at: new Date().toISOString(),
    processed_at: null,
    processed_by: null,
  }
  append(row)
  return row
}

export function findIntent(id) {
  return loadAll().find((r) => r.id === id) || null
}

export function updateIntent(id, patch) {
  const rows = loadAll()
  const idx = rows.findIndex((r) => r.id === id)
  if (idx === -1) return null
  rows[idx] = { ...rows[idx], ...patch }
  writeAll(rows)
  return rows[idx]
}

export function claimIntent(id) {
  const row = findIntent(id)
  if (!row || row.status !== 'pending') return null
  return updateIntent(id, {
    status: 'processing',
    processed_at: new Date().toISOString(),
  })
}

export function markDone(id, { processedBy, notes }) {
  const row = findIntent(id)
  if (!row) return null
  return updateIntent(id, {
    status: 'done',
    processed_at: new Date().toISOString(),
    processed_by: processedBy || null,
    notes: notes || row.notes,
  })
}

function append(row) {
  writeFileSync(FILE, JSON.stringify(row) + '\n', { flag: 'a' })
}

function writeAll(rows) {
  writeFileSync(FILE, rows.map((r) => JSON.stringify(r)).join('\n') + '\n')
}

function exists(p) {
  try {
    readFileSync(p)
    return true
  } catch {
    return false
  }
}
