#!/bin/bash

echo -e "\e[32mInstall script started...\e[0m"

source detectOs.sh

if [ "$DISTRO" != "ubuntu" ] && [ "$DISTRO" != "debian" ]; then
    echo "This script only supports Ubuntu/Debian distributions."
    exit 1
fi

sudo $PKG_MANAGER $PKG_INSTALL_CMD update -y
sudo $PKG_MANAGER $PKG_INSTALL_CMD upgrade -y
sudo $PKG_MANAGER $PKG_INSTALL_CMD build-essential


if ! which bun > /dev/null; then
    echo "Bun not found. Installing..."
    curl -fsSL https://bun.sh/install | bash
       # Add bun to PATH for the current session
    export PATH="$HOME/.bun/bin:$PATH"
    exec $SHELL
else
    echo "Bun is already installed."
fi

bun ./src/index.ts