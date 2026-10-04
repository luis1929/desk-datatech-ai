#!/usr/bin/env bash
# send-intent.sh — Clasifica un correo DataTech·AI y lo encola vía POST /api/hermes/intent
# Uso: send-intent.sh <base_url> <api_key> [--subject S] [--from F] [--from-name N] [--message M]
set -euo pipefail

BASE_URL="${1:?base_url requerida}"
API_KEY="${2:?api_key requerida}"
shift 2

SUBJECT=""
FROM=""
FROM_NAME=""
MESSAGE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --subject) SUBJECT="${2:-}"; shift 2 ;;
    --from) FROM="${2:-}"; shift 2 ;;
    --from-name) FROM_NAME="${2:-}"; shift 2 ;;
    --message) MESSAGE="${2:-}"; shift 2 ;;
    *) shift ;;
  esac
done

if [[ -z "$MESSAGE" ]]; then
  echo '{"error":"message vacío"}' >&2
  exit 2
fi

PAYLOAD=$(python3 -c '
import json, sys
data = {
  "subject": sys.argv[1] or None,
  "from": sys.argv[2] or None,
  "fromName": sys.argv[3] or None,
  "message": sys.argv[4],
}
print(json.dumps(data))
' "$SUBJECT" "$FROM" "$FROM_NAME" "$MESSAGE")

curl -sS --max-time 300 -X POST "$BASE_URL/api/hermes/intent" \
  -H "Content-Type: application/json" \
  -H "x-internal-key: $API_KEY" \
  -d "$PAYLOAD"
