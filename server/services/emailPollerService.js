import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'
import { createOrcaDispatch } from './orcaTaskBridge.js'

const {
  IMAP_HOST = '',
  IMAP_PORT = '993',
  IMAP_SECURE = 'true',
  IMAP_USER = '',
  IMAP_PASS = '',
  IMAP_MAILBOX = 'INBOX',
  EMAIL_POLL_INTERVAL_MINUTES = '5',
  EMAIL_POLL_ENABLED = 'false',
  EMAIL_POLL_MARK_SEEN = 'true',
} = process.env

const INTERVAL_MS = (parseInt(EMAIL_POLL_INTERVAL_MINUTES, 10) || 5) * 60 * 1000

export function isEnabled() {
  return EMAIL_POLL_ENABLED === 'true' && !!IMAP_HOST && !!IMAP_USER && !!IMAP_PASS
}

function client() {
  return new ImapFlow({
    host: IMAP_HOST,
    port: parseInt(IMAP_PORT, 10) || 993,
    secure: IMAP_SECURE !== 'false',
    auth: { user: IMAP_USER, pass: IMAP_PASS },
    logger: false,
    tls: { rejectUnauthorized: false },
  })
}

async function processMessage(msg) {
  try {
    const parsed = await simpleParser(msg.source)
    const subject = parsed.subject || ''
    const from = parsed.from?.value?.[0] || {}
    const body = (parsed.text || parsed.html || '').slice(0, 8000)

    const result = await createOrcaDispatch({
      from_email: from.address || '',
      from_name: from.name || '',
      subject,
      body,
    })

    console.log('[EmailPoller] correo procesado', { id: result.id, intent: result.intent, uid: msg.uid })
    return result
  } catch (err) {
    console.error('[EmailPoller] error procesando correo', { uid: msg.uid, error: err.message })
    return null
  }
}

export async function pollOnce() {
  const mail = client()
  try {
    await mail.connect()
    const lock = await mail.getMailboxLock(IMAP_MAILBOX)
    try {
      const seenUids = new Set()
      if (mail.mailbox && mail.mailbox.exists > 0) {
        for await (const msg of mail.fetch('1:*', { uid: true, source: true }, { uid: true })) {
          const flags = msg.flags || []
          if (flags.includes('\\Seen')) {
            seenUids.add(msg.uid)
            continue
          }
          await processMessage(msg)
          seenUids.add(msg.uid)
          if (EMAIL_POLL_MARK_SEEN === 'true') {
            await mail.messageFlagsAdd(msg.uid, ['\\Seen'], { uid: true })
          }
        }
      }
      console.log('[EmailPoller] ciclo completado', { procesados: seenUids.size, total: mail.mailbox?.exists || 0 })
    } finally {
      lock.release()
    }
    await mail.logout()
  } catch (err) {
    console.error('[EmailPoller] poll error', { error: err.message })
    try {
      await mail.logout()
    } catch (_) { /* noop */ }
  }
}

let timer = null

export function start() {
  if (!isEnabled()) {
    console.warn('[EmailPoller] deshabilitado (EMAIL_POLL_ENABLED, IMAP_HOST/USER/PASS requeridos)')
    return
  }
  console.log('[EmailPoller] iniciado', { intervalMs: INTERVAL_MS, mailbox: IMAP_MAILBOX })
  pollOnce()
  timer = setInterval(pollOnce, INTERVAL_MS)
}

export function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
