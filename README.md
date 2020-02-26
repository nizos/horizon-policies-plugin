# Horizon-policies-plugin
Plugin for OpenStack's dashboard Horizon for accessing and managing policies

# Installation

## Configuring the environment

### Update & upgrade OS repo
```Bash
$ sudo apt update
```

```Bash
$ sudo apt upgrade
```

### Install python3 and python3-pip
```Bash
$ sudo apt install python3
```

```Bash
$ sudo apt install python3-pip
```

### Install Django
```Bash
$ python3 -m pip install Django==2.2
```

### Check versions

```Bash
$ python3 --version
# Python 3.6.9
```

```Bash
$ python3 -m pip --version
# pip 20.0.2 from /home/<user>/.local/lib/python3.6/site-packages/pip (python 3.6)
```

```Bash
$ python3 -m django --version
# 2.2
```

## Install DevStack
The full guide for installing DevStack can be found [here](https://docs.openstack.org/devstack/train/) but bellow are the quick steps to get up and running.

### Download DevStack

```Bash
$ git clone https://opendev.org/openstack/devstack
$ cd devstack
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
$ ./stack.sh
```
This will take a 15 - 20 minutes, largely depending on the speed of your internet connection. Many git trees and packages will be installed during this process.

Your devstack will have installed keystone, glance, nova, placement, cinder, neutron, and horizon. Floating IPs will be available, guests have access to the external world.

## Install the plugin

### Clone the repo
Navigate to `/opt/stack/horizon/openstack_dashboard/dashboards/` and clone the repo.

```Bash
$ cd /opt/stack/horizon/openstack_dashboard/dashboards/
$ git clone https://github.com/nizos/Horizon-Policies-Plugin
$ cd Horizon-Policies-Plugin/policy/
$ python3 -m pip install -r requirements.txt
$ python3 setup.py sdist
$ python3 -m pip install dist/cafe-ui-0.0.0.tar.gz
```

### Enable the plugin
Add the plugin's enabled files to Horizon:
```Bash
$ Navigate to: /openstack_dashboard/
$ cp dashboards/Horizon-Policies/Plugin/policy/cafe_ui/enabled/_90_project_cafe_panelgroup.py enabled/
$ cp dashboards/Horizon-Policies/Plugin/policy/cafe_ui/enabled/_91_project_cafe_drinks_panel.py enabled/
1. Navigate to openstack_dashboard/dashboards/Horizon-Policies-Plugin/policy/cafe_ui/static/dashboard/ 
2. Copy the 'cafe'-folder
3. Navigate to horizon/static/dashboard
4. Paste the 'cafe'-folder into /dashboard
```

### Restart Horizon
```Bash
$ service apache2 restart
```

# Contributors
Andreas, Nizar, Rickard, Joel & Wissam.
