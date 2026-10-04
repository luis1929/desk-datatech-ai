import nodemailer from 'nodemailer'

const useSendGrid = !!process.env.SENDGRID_API_KEY

let sgMail = null
if (useSendGrid) {
  const sg = await import('@sendgrid/mail')
  sgMail = sg.default
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT || 25),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
})

export async function sendContactEmail({ name, email, company, industry, message }) {
  const to = process.env.CONTACT_TO || 'contacto@datatech-ai.org'
  const from = process.env.CONTACT_FROM || 'contacto@datatech-ai.org'
  const subject = `[datatech-ai.org] Nuevo contacto: ${name}${company ? ` (${company})` : ''}`

  const text = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa: ${company || '-'}`,
    `Industria: ${industry || '-'}`,
    '',
    'Mensaje:',
    message,
  ].join('\n')

  if (useSendGrid) {
    await sgMail.send({
      to,
      from,
      subject,
      text,
    })
    return
  }

  await smtpTransport.sendMail({ from, to, subject, text })
}