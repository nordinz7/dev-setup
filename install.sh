#!/bin/bash

echo -e "\e[32mInstall script started...\e[0m"

sudo apt install update -y
sudo apt install upgrade -y
sudo apt install build-essential


source ./src/detectOs.sh

if ! which bun > /dev/null; then
    echo "Bun not found. Installing..."
    curl -fsSL https://bun.sh/install | bash
       # Add bun to PATH for the current session
    export PATH="$HOME/.bun/bin:$PATH"
    exec /usr/bin/zsh
else
    echo "Bun is already installed."
fi

bun ./src/index.ts