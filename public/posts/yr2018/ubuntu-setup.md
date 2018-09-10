Setting up a dev machine on Ubuntu 18.04

## Software to install

```bash
# Add Google Chrome apt-key
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/chrome.list'

# Add VSCode apt-key
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'

# Add docker apt-key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

# Get updates
sudo apt update
sudo apt-get update

# Install pre-requisites

# Required for nvm
sudo apt-get install curl

# snap package manager - used for Slack installation
sudo apt install snapd

# required for vscode
sudo apt-get install apt-transport-https

# required for docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Re-update
sudo apt update
sudo apt-get update

# Install applications
sudo apt-get install vim
sudo apt-get install git-core
sudo apt-get install terminator
sudo apt install gnome-tweak-tool
sudo apt install keepassxc
sudo apt install google-chrome-stable
sudo apt install docker-ce
sudo apt install docker-compose

# This allows you to run docker commands from your user account without prefixing every command with `sudo`
sudo usermod -aG docker ${USER}

# Visual Studio Code
sudo apt-get install code

# Slack chat app
sudo snap install slack --classic

# nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
curl https://gist.githubusercontent.com/josh-egan/0aacba3090e7d523f68859fefccb6d51/raw/718072e42edf4b6fbd231447b48468837324bdc1/bash_automatically_run_nvm.sh >> ~/.bashrc

# bash-git-prompt
cd ~
git clone https://github.com/magicmonty/bash-git-prompt.git .bash-git-prompt --depth=1
echo "" >> ~/.bashrc
echo "# bash-git-prompt configuration" >> ~/.bashrc
echo "GIT_PROMPT_ONLY_IN_REPO=1" >> ~/.bashrc
echo "GIT_PROMPT_THEME=Solarized_Ubuntu" >> ~/.bashrc
echo "source ~/.bash-git-prompt/gitprompt.sh" >> ~/.bashrc

# replace ubuntu screensaver with xscreensaver
sudo apt-get install xscreensaver xscreensaver-data-extra xscreensaver-gl-extra
sudo apt-get remove gnome-screensaver
sudo ln -sf /usr/bin/xscreensaver-command /usr/bin/gnome-screensaver-command
```

### From Ubuntu Software Center

- GNOME Tweaks

## Configuration

### GNOME Tweaks

- Keyboard & Mouse
    - Overview Shortcut - set to Right Super
- Startup Applications
    - Google Chrome
    - KeepassXC
    - Visual Studio Code
    - Terminator
    - Slack

### Screensaver

https://askubuntu.com/questions/292995/configure-screensaver-in-ubuntu

### Git

```bash
# Update the email address to the company email address
git config --global user.name "Josh Egan"
git config --global user.email "josh.egan@example.com"
```

Get aliases from http://tech.joshegan.com/posts/yr2016/git-cheatsheet

## Lambda School Specific

```bash
# PGAdmin
sudo apt-get update
sudo apt-get install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install pgadmin4
```

**Zoom**
https://zoom.us/download?os=linux


```bash
cd ~
mkdir repos

cd ~/repos
git clone git@github.com:LambdaSchool/auth.git
cd auth
nvm install
npm install

cd ~/repos
git clone git@github.com:LambdaSchool/infrastructure.git
nvm install
npm install

cd ~/repos
git clone git@github.com:LambdaSchool/airtable-to-postgres-migrations.git
nvm install
npm install
```


