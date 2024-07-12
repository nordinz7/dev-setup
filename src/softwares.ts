import path from "path";
import { $ } from "bun";

export const softwares = [
  {
    name: "Visual Studio Code",
    link: "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64",
    fileName: "vscode",
    fileExt: "deb",
    bin: "code"
  },
  {
    name: "MongoDB Compass",
    link: "https://downloads.mongodb.com/compass/mongodb-compass_1.43.4_amd64.deb",
    fileName: "mongodb-compass",
    fileExt: "deb",
    bin: "mongodb-compass"
  },
  {
    name: 'exa',
    link: 'https://github.com/ogham/exa/releases/download/v0.10.0/exa-linux-x86_64-v0.10.0.zip',
    installCommand: $`sudo unzip exa.zip -d /usr/local/bin`,
    fileName: 'exa',
    fileExt: 'zip',
    bin: 'exa'
  },
  {
    name: 'nvim',
    link: 'https://github.com/neovim/neovim/releases/latest/download/nvim.appimage',
    installCommand: $`sudo chmod +x .temp/nvim.appimage && sudo mv .temp/nvim.appimage /usr/local/bin/nvim`,
    fileName: 'nvim',
    fileExt: 'appimage',
    bin: 'nvim'
  }
]

const zshrc = await Bun.file(path.join(__dirname, 'zshrc.txt')).text();

export const commands = [
  {
    name: "zshrc",
    contentPath: '~/.zshrc',
    command: $`echo ${zshrc} > ~/.zshrc`
  },
  {
    name: "antigen",
    contentPath: '~/antigen.zsh',
    command: $`curl -L git.io/antigen > ~/antigen.zsh`
  },
  {
    name: "nvm",
    contentPath: '~/.nvm/nvm.sh',
    command: $`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && nvm install node`
  },
  {
    name: 'starship theme',
    contentPath: '/usr/local/bin/starship',
    command: $`curl -sS https://starship.rs/install.sh | sh`
  },
  {
    name:'kubectl',
    contentPath: '/usr/local/bin/kubectl',
    command: $`curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl`
  }
]

export const aptPackages = [
'gparted',
'vim',
'neofetch',
'stacer',
'htop',
'terminator',
'gnome-tweaks',
'git',
'gcc',
'git-flow',
'zsh',
'curl',
'wget',
]