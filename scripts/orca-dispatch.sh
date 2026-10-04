#!/usr/bin/env bash
# Wrapper de `orca-ide` para el host backend.
# El binario oficial es un AppImage Electron que requiere FUSE (la mayoría de servidores no lo permiten).
# Este wrapper usa la extracción manual en /opt/orca/squashfs-root (creada con --appimage-extract),
# ejecutando la CLI con ELECTRON_RUN_AS_NODE y APPDIR apuntando a la extracción.
# Si Orca no está corriendo, devuelve el error runtime_unavailable del propio CLI.
set -euo pipefail

ORCA_APP_DIR="${ORCA_APP_DIR:-/opt/orca/squashfs-root}"

if [ ! -d "$ORCA_APP_DIR" ]; then
  echo "ERROR: extracción de Orca no encontrada en $ORCA_APP_DIR" >&2
  echo "Extrae el AppImage con: /opt/orca/orca-linux.AppImage --appimage-extract" >&2
  exit 1
fi

exec env APPDIR="$ORCA_APP_DIR" ELECTRON_RUN_AS_NODE=1 "$ORCA_APP_DIR/orca-ide" \
  -e '(async()=>{try{const path=require("path");const appDir=process.env.APPDIR;if(!appDir){console.error("Orca AppImage runtime did not set APPDIR.");process.exit(1);}const cli=path.join(appDir,"resources","app.asar.unpacked","out","cli","index.js");await Promise.resolve(require(cli).main(process.argv.slice(1)));}catch(error){console.error(error&&error.stack?error.stack:String(error));process.exit(1);}})();' \
  -- "$@"