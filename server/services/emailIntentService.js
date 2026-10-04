const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const EMAIL_MODEL = process.env.EMAIL_MODEL || 'hermes3'

const EMAIL_PROMPT = `
Eres el clasificador de intención de correos de DataTech·AI, empresa de desarrollo de software empresarial a medida en Colombia.
Analizas el contenido de un correo entrante y extraes su propósito en formato JSON.

Intenciones y módulos posibles:
- "landing": El correo consulta sobre el sitio web, contenido, secciones, SEO, precios de servicios o la propia página (ej: "quiero revisar mi página web", "actualiza el texto del hero").
- "contacto": El correo es por el formulario de contacto, un mensaje de prueba, o una falla reportada en el envío (ej: "no llega el correo del formulario").
- "proyecto": El correo solicita una cotización, propuesta o información para un nuevo proyecto de desarrollo de software (ej: "necesito un sistema de facturación", "cotiza un ERP").
- "soporte": El correo es una queja, consulta técnica, incidencia o garantía sobre software existente (ej: "el sistema está caído", "tengo un error en el módulo X").
- "infra": El correo menciona servidor, dominio, DNS, túnel, despliegue, correo corporativo o infraestructura.
- "marketing": El correo pide contenido, campañas, redes sociales o material de ventas.
- "otros": Cualquier otra cosa (marketing externo, spam, saludo, tema ajeno).

Responde SIEMPRE en JSON puro, sin markdown:
{
  "intent": "landing" | "contacto" | "proyecto" | "soporte" | "infra" | "marketing" | "otros",
  "confidence": numero entre 0 y 1,
  "entities": {
    "company": "nombre de la empresa si aparece, si no vacío",
    "email": "email de contacto si aparece, si no vacío",
    "service": "servicio/producto si aparece, si no vacío",
    "module": "módulo del software si aparece, si no vacío",
    "amount": numero de monto si se menciona, si no null,
    "date": "fecha si aparece, si no vacío"
  },
  "priority": "alta" | "media" | "baja"
}
`

export async function classifyEmailIntent(mensaje) {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: EMAIL_MODEL,
        messages: [
          { role: 'system', content: EMAIL_PROMPT },
          { role: 'user', content: mensaje },
        ],
        stream: false,
      }),
    })

    if (!response.ok) throw new Error(`Email intent classifier responded with status ${response.status}`)

    const result = await response.json()
    const raw = (result.message?.content || '').trim()
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) return { intent: 'otros', confidence: 0, entities: {}, priority: 'baja', error: 'respuesta no-JSON' }

    const parsed = JSON.parse(match[0])
    return {
      intent: parsed.intent || 'otros',
      confidence: Number(parsed.confidence) || 0,
      entities: parsed.entities || {},
      priority: parsed.priority || 'baja',
    }
  } catch (error) {
    console.error('[EmailIntent] classify error:', error.message)
    return { intent: 'otros', confidence: 0, entities: {}, priority: 'baja', error: error.message }
  }
}
