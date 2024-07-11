import path from "path";
import { $ } from "bun";

export const softwares = [
  {
    name: "Visual Studio Code",
    link: "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"
  },
  {
    name: "MongoDB Compass",
    link: "https://downloads.mongodb.com/compass/mongodb-mongosh_2.2.11_amd64.deb"
  },
  {
    name: 'exa',
    link: 'https://github.com/ogham/exa/releases/download/v0.10.0/exa-linux-x86_64-v0.10.0.zip'
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
    command: $`   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl`
  }
]

export const aptPackages = [
// 'build-essential',
'gparted',
'vim',
'nvim',
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