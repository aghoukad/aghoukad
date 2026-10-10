#!/usr/bin/env bash
set -eo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# T3 Code terminals may start without Node or NVM on PATH.
if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
  . "${NVM_DIR:-$HOME/.nvm}/nvm.sh" --no-use
  if [ "${1:-}" = "install" ]; then
    nvm install
  else
    nvm use --silent
  fi
fi

exec pnpm "$@"
