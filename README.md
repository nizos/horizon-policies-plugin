# horizon-policies-plugin
Plugin for OpenStack's dashboard Horizon for accessing and managing policies

# Installation

## Configuring the environment

### Update & upgrade OS repo
```Bash
sudo apt update
```

```Bash
sudo apt upgrade
```

### Install python3 and python3-pip
```Bash
sudo apt install python3
```

```Bash
sudo apt install python3-pip
```

### Install Django
```Bash
python3 -m pip install Django==2.2
```

### Check versions

```Bash
python3 --version
# Python 3.6.9
```

```Bash
python3 -m pip --version
# pip 20.0.2 from /home/<user>/.local/lib/python3.6/site-packages/pip (python 3.6)
```

```Bash
python3 -m django --version
# 2.2
```

## Install DevStack
The full guide for installing DevStack can be found [here](https://docs.openstack.org/devstack/train/) but bellow are the quick steps to get up and running.

### Download DevStack

```Bash
git clone https://opendev.org/openstack/devstack
cd devstack
```
The devstack repo contains a script that installs OpenStack and templates for configuration files.

Create a local.conf file with four passwords preset at the root of the devstack git repo.


### Create a local.conf
```Conf
[[local|localrc]]
ADMIN_PASSWORD=secret
DATABASE_PASSWORD=$ADMIN_PASSWORD
RABBIT_PASSWORD=$ADMIN_PASSWORD
SERVICE_PASSWORD=$ADMIN_PASSWORD
```
This is the minimum required config to get started with DevStack.


### Start the install

```Bash
./stack.sh
```
This will take a 15 - 20 minutes, largely depending on the speed of your internet connection. Many git trees and packages will be installed during this process.

Your devstack will have installed keystone, glance, nova, placement, cinder, neutron, and horizon. Floating IPs will be available, guests have access to the external world.

## Install the plugin

### Clone the repo
Navigate to `/opt/stack/horizon/` and clone the repo.

```Bash
cd /opt/stack/horizon/
git clone https://github.com/nizos/horizon-policies-plugin
```

### Install the plugin
Run the commands to install the plugin

```Bash
cd horizon-policies-plugin/
python3 -m pip install -r requirements.txt
python3 setup.py sdist
python3 -m pip install dist/sample-dashboard-0.0.1.dev24.tar.gz
```

### Enable the plugin
Add the plugin's enabled files to Horizon

```Bash
cd ..
cp horizon-policies-plugin/sample_dashboard/enabled/_1485_project_network_sample_enabled.py openstack_dashboard/enabled/
```

### Copy static files to Horizon/static
Copy the static files to Horizon's `static` directory

#### Copy the files through script
Run the following command

```Bash
cd horizon-policies-plugin/misc_goodies/
chmod u+x copy_static_files.sh
./copy_static_files.sh
```
#### Copy files manually
Copy the following files
```Bash
cd /opt/stack/horizon/

# static/app/core/openstack-service-api/sample-network.service.js
cp sample-horizon-angular-plugin/sample_dashboard/static/app/core/openstack-service-api/sample-network.service.js static/app/core/openstack-service-api/

# static/dashboard/project/sample/sample.module.js
mkdir static/dashboard/project/sample

cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/sample.module.js static/dashboard/project/sample/

# static/dashboard/project/sample/network/table.html
mkdir static/dashboard/project/sample/network

cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/table.html static/dashboard/project/sample/network/

# static/dashboard/project/sample/network/networks.module.js
cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/networks.module.js static/dashboard/project/sample/network/

# static/dashboard/project/sample/network/networks.controller.js
cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/networks.controller.js static/dashboard/project/sample/network/

# static/dashboard/project/sample/network/actions/row-actions.service.js
mkdir static/dashboard/project/sample/network/actions

cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/row-actions.service.js static/dashboard/project/sample/network/actions/

# static/dashboard/project/sample/network/actions/batch-actions.service.js
cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/batch-actions.service.js static/dashboard/project/sample/network/actions/

# static/dashboard/project/sample/network/actions/start_network/modal.service.js
mkdir static/dashboard/project/sample/network/actions/start_network

cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/start_network/modal.service.js static/dashboard/project/sample/network/actions/start_network/

# static/dashboard/project/sample/network/actions/stop_network/modal.service.js
mkdir static/dashboard/project/sample/network/actions/stop_network

cp sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/stop_network/modal.service.js static/dashboard/project/sample/network/actions/stop_network/

```

### Restart Horizon
```Bash
sudo service apache2 restart
```

# Contributors
Andreas, Nizar, Rickard, Joel & Wissam.
