I'm working on getting a node server up and running in aws and figured I would document the steps I'm taking.

## Front Matter

### Prerequisites

- Have a node.js app that is ready to launch on a server
- Have an aws account.
- If on a windows machine, have [putty](http://www.putty.org/) installed

### Goals

- Launch a `t2.micro` linux server (free tier)
- Run a `node.js` web app on the server
- Run a `node.js` RESTful api on the server
- Launch a `db.t2.micro` mysql rds instance

Services will be launched manually, as opposed to programatically.

### Resources

[AWS free tier details](https://aws.amazon.com/free/)
[AWS RDS mysql instance pricing](https://aws.amazon.com/rds/mysql/pricing/)
[AWS ec2 instance pricing](https://aws.amazon.com/ec2/pricing/)

## Launch the Services

### Launch an EC2 instance

1. Ensure that you're in the region you want to be in. Currently, the dropdown is in the top-right of the UI. Current options include `US East` and `US West`. I'm using `US West (Oregon)`.
1. From the AWS dashboard, click on EC2
1. On the EC2 dashboard, locate and click on the `Launch Instance` button.
1. Select an image. I'm going to use Red Hat Linux.
1. Choose your instance type then click next. I'm going with `t2.micro`, which is free tier eligible.
1. Configure Instance details
  - Set Auto-assign Public IP to `Enable` - we want this to have a pubic IP.
  - Leave all other settings as default and click next
1. Add 10 GB of storage and click next
1. Add tags. For example, give the server a name.
1. Configure Security Group
  - Create a new security group for this server.
  - Give the security group a meaningful name and description.
  - If it doesn't already have it, add the `SSH` group.
  - Add the `HTTP` group, which exposes `TCP` traffic on port 80. This will be for the web app.
  - Add a `Custom TCP Rule` to expose `TCP` traffic on a specified port. Choose a port to expose. This port will be for the api.
1. Click Review and Launch
1. Click Launch
1. Create a new key pair
  1. Choose `Create a new key pair` from the dropdown
  1. Give the key pair a name.
  1. Click the download button and save the key to a secure location. Keys should be stored and handled with great care.
1. Click Launch

The instance is now launched! Click on it to check it out.

#### Setup SSH Access

##### puTTY

If using putty on windows:
1. Use the puttyGen program to convert the `.pem` private key that was downloaded earlier into a `.ppk` key that putty can use.
1. In putty, create a profile for accessing this aws server.
  1. For the `Host Name`, put `ec2-user@DNS`, where DNS is the public DNS of the server that was just created. To locate the `Public DNS` for the ec2 instance that was just created, search for it on the details of that instance.
  1. Under `Connection.SSH.Auth`, find the field for 'Private key file for authention:'. Click the `Browse` button and select the `.ppk` file that was just created.
  1. Go back to the main options screen (Session) and give the session a name and save it.
  1. Double click on your saved session to give it a try.

**PRO TIP** -
If you're using portable putty and you want to create a shortcut to start the session that you just created, create a short cut, then open up the properties for the shortcut and set the 'Target' to the following:
`%windir%\system32\cmd.exe /c start "CUSTOM_WINDOW_TITLE - PuTTY" "%cd%\Programs\PuTTYPortable\PuTTYPortable.exe" -load my_putty_session`
Where `my_putty_session` is the name of the session that you just created and saved. Be sure to check the other params and update them to your particular situation.

##### bash SSH

If using linux, or if you have access to the bash ssh, use the `.pem` key and use the following command:
`ssh -i $PRIVATE_KEY_PATH $SERVER`

### Deploy the Apps

I created a `deploy-stage` npm script so that I can deploy using `npm run deploy-stage`. Here are all of the scripts:

```json
"scripts": {
  "start": "node app.js",
  "test": "./node_modules/.bin/mocha application/**/*.specs.js domain/**/*.specs.js --reporter mocha-minimalist-reporter",
  "tw": "npm test -- --watch",
  "test-watch": "npm test -- --watch",
  "ti": "./node_modules/.bin/mocha domain/**/*.ispecs.js --reporter progress || true",
  "ti-watch": "npm run test-integration -- -watch",
  "test-integration": "./node_modules/.bin/mocha domain/**/*.ispecs.js --reporter progress",
  "ta": "./node_modules/.bin/mocha test/acceptance/**/*.specs.js --reporter progress || true",
  "test-acceptance": "./node_modules/.bin/mocha test/acceptance/**/*.specs.js --reporter progress",
  "test-coverage": "./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha",
  "test-all": "npm test && npm run test-integration && npm run test-acceptance",
  "ensure-all-files-are-committed": "git diff --exit-code && git diff --cached --exit-code",
  "version-bump": "npm version patch && git push && git push --tags",
  "predeploy-stage": "npm run ensure-all-files-are-committed && npm run test-all && npm run version-bump",
  "deploy-stage": "node ./scripts/run-shell-script.js deploy-stage.sh"
},
```

`run-shell-script.js` is as follows:

```js
var path = require('path')

var shellCommand = process.platform === 'win32' ? 'C:\\Program Files\\Git\\bin\\sh.exe' : 'sh'
var fullFilePath = path.join(__dirname, process.argv[2])
require('child_process').spawn(shellCommand,
  ['-login', '-i', '--', fullFilePath],
  { stdio: 'inherit' })
```

The job of the `deploy-stage.sh` script is to transfer the deploy script to the server and then run it. This script contains the following:

```bash
#!/usr/bin/env bash

#Exit immediately if a simple command exits with a non-zero status
set -e

SERVER=*******@***********.us-west-2.compute.amazonaws.com
SSH_KEY_PATH=*********

LOCAL_SCRIPT_PATH=./scripts/api-stage-serverside-deploy.sh
REMOTE_SCRIPT_PATH=*******/api-stage-serverside-deploy.sh

#Print a trace of simple commands and their arguments after they are expanded and before they are executed.
set -x

# Transfer files and then execute deploy script
scp -i $SSH_KEY_PATH $LOCAL_SCRIPT_PATH $SERVER:$REMOTE_SCRIPT_PATH
ssh -i $SSH_KEY_PATH -t $SERVER sudo bash $REMOTE_SCRIPT_PATH
```

The `api-stage-serverside-deploy.sh` script does the deploy work. I used to have smaller scripts, but I've recently started using this script which does more. This script accomplishes server bootstrapping, server updates, and code deploys all in one. I've liked it this way as of late because it is self-contained and can get a new server up and going from scratch.

One manual step still of necessity exists, which is transferring the .env file to the server manually. See [12 Factor Apps](http://12factor.net/) to learn about the value of a .env file. The `ENV_SRC` variable points to the location of this manually transferred file.

A few notes:
  - the usage of `nvm` in this script assumes that you have a `.nvmrc` file in the root of the project.
  - the usage of `forever` in this script assumes that you have a `forever.json` file in the root of the project.

```bash
#!/usr/bin/env bash

GIT_URL=*******

ENV_SRC=*******
APP_DIR=*******

SERVICE_NAME=*******

#Print a trace of simple commands and their arguments after they are expanded and before they are executed.
set -x

# ensure packages on the server are up to date
yum update -y

# ensure git is installed
yum install git -y

# Pull the latest code.
if [ -d "$APP_DIR" ]; then
  cd $APP_DIR
  git pull
else
  git clone $GIT_URL $APP_DIR
  cd $APP_DIR
fi

# Copy the .env file
cp -pf $ENV_SRC $APP_DIR/.env

# install nvm if necessary
if [ -d "$HOME/.nvm" ]; then
  echo nvm is already installed
else
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
fi

# Load nvm into the shell
set +x
source $HOME/.bashrc

# Ensure the correct version of node is installed
nvm install
nvm use
set -x

# add a symbolic link of the installed node version to the path
ln -sf "$(which node)" /usr/bin/node

# Install dependencies
npm install --production
npm prune --production

# install forever and forever-service if needed - used for turning node.js apps into services
which forever
if [ $? -ne 0 ]; then
  npm install -g forever
fi

which forever-service
if [ $? -ne 0 ]; then
  npm install -g forever-service
fi

# If the service exists restart it. Create the service if it does not exist.
if service --status-all | grep -F "$SERVICE_NAME"; then
  service $SERVICE_NAME restart
else
  forever-service install $SERVICE_NAME --script forever.json --start
fi
```
