# Reglas de DataTech·AI — Microtareas Atómicas

Este proyecto trabaja exclusivamente con microtareas, replicando el esquema de EquiBetel.

## Estructura

- `.context/` — estado actual de cada módulo con checkboxes `[ ]`/`[x]`
- `.context/audit/` — log de auditoría con formato JSONL (YYYY-MM-DD.jsonl)
- `.opencode/skills/` — skills que activo según el tipo de tarea

## Auditoría Obligatoria (siempre activo)

**Toda tarea debe cargar el skill `audit-trail` como companion** además del skill del módulo correspondiente.

1. Cargar `audit-trail` primero.
2. Luego cargar el skill del módulo según la tabla abajo.
3. Al iniciar la microtarea, escribir entrada en `.context/audit/` con `status: "started"`.
4. Al completar, actualizar con `status: "completed"` y `duration_ms`.
5. Si Orca orchestration tiene un task activo, notificar vía `orca orchestration send`.

### Inicializar Orca al comenzar una sesión

Si Orca está disponible y no hay un task activo:

```bash
orca-ide orchestration task-list --json | grep -q '"status":"ready"' ||
  orca-ide orchestration task-create \
    --task-title "DataTech·AI Audit — $(date +'%b %d')" \
    --display-name "DataTech·AI Audit" \
    --spec "Auditar microtareas del proyecto DataTech·AI" \
    --json
```

El `task_id` resultante se pasa como variable `ORCA_AUDIT_TASK_ID` al entorno.

## Activación de Skills

Antes de ejecutar cualquier instrucción, debo:
1. **Cargar `audit-trail`** (companion obligatorio)
2. Identificar el módulo y **cargar el skill correspondiente** de la tabla:

| Si la solicitud menciona… | Cargo el skill | Y leo el archivo |
|---------------------------|----------------|------------------|
| landing, hero, secciones, contenido, SEO, copy, textos ES/EN | `frontend-page` | `.context/01_landing.md` |
| UI, UX, diseño, paleta, tipografía, componente visual, sistema de diseño, marca, token | `ui-ux` | `.context/01_landing.md` |
| formulario, contacto, email, SendGrid, SMTP, mailer, enviar correo | `backend-endpoint` | `.context/02_contacto.md` |
| deploy, build, producción, PM2, systemd, tunnel, cloudflared, DNS | `deploy-prod` | `.context/03_infra.md` |
| orca, openclaw, hermes, intent, correo entrante, poller IMAP, Ollama, clasificador | `orca-openclaw` | `.context/04_orca_openclaw.md` |
| auditar, registro, audit trail, JSONL, reporte | `audit-trail` | (sin .context) |
| crear skill, nuevo skill, auditar skill, gestionar skills, orquestar, administrar skills | `skill-manager` | (solo .opencode/ — sin .context) |
| investigar en internet, research, búsqueda web, plataformas sociales, leer cualquier URL | `agent-reach` | (skill global — sin .context) |

## Regla de Oro

1. NO leer todo el proyecto ni modificar múltiples archivos a la vez.
2. Identificar el módulo → cargar skill → leer solo su `.context/*.md`.
3. Ejecutar la microtarea requerida.
4. Marcar el checkbox en `.context/*.md` inmediatamente después.
