#!/usr/bin/env bash

NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

currentNodeVersion=$(nvm current)
requiredNodeVersion=$(head -n 1 .nvmrc)

nvm use ${requiredNodeVersion}

npm run deploy

nvm use ${currentNodeVersion}
