# Testing

## Clean up

Uninstall previous plugin

```bash
python3 -m pip uninstall policies-plugin --yes
sudo rm -v /opt/stack/horizon/openstack_dashboard/enabled/_3100_identity_policy_policies_panel_enabled.py
sudo rm -vr /opt/stack/horizon/static/dashboard/identity/policy/
```

Delete directories:

`/opt/stack/horizon-policies-plugin/.tox/`

`/opt/stack/horizon-policies-plugin/node_modules/`

Delete file:

`/opt/stack/horizon-policies-plugin/package-lock.json`

Optional: Clean NPM cache:

```bash
npm cache clean --force
```

## Update dependencies

### Python 3

Install dependencies for virtual environment

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git python3-dev python3-pip python3-venv
```

### Node & NPM

Optional: Remove previous versions

```bash
sudo apt-get remove node
sudo apt-get remove npm
sudo apt-get purge --auto-remove nodejs
```

Install NVM, NPM & Node:

```bash
cd ~
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source .bashrc
nvm --version
nvm install node
source ~/.bashrc
node --version
# v14.2.0
npm --version
# 6.14.5
nvm --version
# 0.35.3
nodejs --version
# Command 'nodejs' not found, but can be installed with:
# sudo apt install nodejs
```

## Install plugin

Clone into `/opt/stack/`

```bash
cd /opt/stack/
git clone https://github.com/nizos/horizon-policies-plugin
```

Install Horizon policies plugin

```bash
cd /opt/stack/horizon-policies-plugin/
bash install.bash
source /opt/stack/horizon/.tox/venv/bin/activate
git init
git add .
git commit -a -m "Initializing temporary repository"
python3 -m pip install -r requirements.txt
python3 setup.py sdist
pip install -e .
deactivate
source ~/.bashrc
```

Install test plugins

```bash
cd /opt/stack/horizon-policies-plugin/
source /opt/stack/horizon/.tox/venv/bin/activate
npm install
npm i -D eslint
npm i -D eslint-config-openstack
npm i -D eslint-plugin-angular
npm i -D eslint-plugin-jasmine
npm i -D jasmine
npm i -D jasmine-core
npm i -D js-yaml
npm i -D json2yaml
npm i -D karma
npm i -D karma-chai
npm i -D karma-chrome-launcher
npm i -D karma-cli
npm i -D karma-coverage
npm i -D karma-firefox-launcher
npm i -D karma-ie-launcher
npm i -D karma-jasmine
npm i -D karma-mocha
npm i -D karma-ng-html2js-preprocessor
npm i -D karma-threshold-reporter
npm i -D mocha
npm i -D puppeteer
npm i -D chrome-launcher
deactivate
source ~/.bashrc
```

Install dependencies for ChromeHeadless:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install libxss1
sudo apt-get install -y libgbm-dev
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
sudo apt-get install -y libxtst6 libnss3 libnspr4 libxss1 libasound2 libatk-bridge2.0-0 libgtk-3-0 libgdk-pixbuf2.0-0
deactivate
source ~/.bashrc
```

## Run tests

### AngularJS

```bash
cd /opt/stack/horizon-policies-plugin/
source /opt/stack/horizon/.tox/venv/bin/activate
tox -e karma
```

### Python

```bash
cd /opt/stack/horizon-policies-plugin/
source /opt/stack/horizon/.tox/venv/bin/activate
tox -e pep8
```
