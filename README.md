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

## Install the plugin

### Clone the repo
Now its time to install the plugin, we start by navigating  to `/opt/stack/horizon/` and cloning the repo.

```Bash
#Clone the repository anywhere in your file structure.
git clone https://github.com/nizos/horizon-policies-plugin
```

#### Further tips
If you want to be able to view .git/ directories in vscode do the following:

1. Open the settings window by clicking on File -> Preferences -> Settings or by hitting `ctrl+,` on your keyboard.
2. type `files.exclude` in the search bar.
3. Highlight the row with .git by hovering over it with your mouse and clicking on the `x` button to remove it from the list files and folder patterns that vscode will automatically hide.

### Install the plugin

Make sure your CWD is _/path/to/repository_/horizon-policies-plugin/policy-ui/

```Bash
bash install.bash
```

Wait for the command to finish, make sure to follow any prompts that may occur.

### Offline Compression
If you run into the error _You have offline compression enabled but key is missing from offline manifest._:

```Bash
cd /opt/stack/horizon/openstack_dashboard/local/
```

Open local_settings.py and change
```Bash
COMPRESS_OFFLINE = True
```

to
```Bash
COMPRESS_OFFLINE = False
```

### Restart Horizon
```Bash
sudo service apache2 restart
```

## Uninstalling the plugin

To remove a specific package
```Bash
python3 -m pip uninstall <package-name>
```
For example, to remove policy-ui:
```Bash
python3 -m pip uninstall policy-ui
```

**WARNING**: The uninstallation may fail if your CWD is */path/to/repository/horizon-policies-plugin/policy-ui* with the message

```Bash
Found existing installation: policy-ui 0.0...
# Extra text that you get with the --verbose trigger:
Not sure how to uninstall: policy-ui 0.0... - Check: /path/to/repository/horizon-policies-plugin/policy-ui
Can't uninstall 'policy-ui'. No files were found to uninstall.
```

The solution is to change directory and try the same command again.

#### Further tips
If you want to view a list of all package types:
```Bash
python3 -m pip list
```

To view details about a specific package type:
```Bash
python3 -m pip show policy-ui
```

These commands can help you verify that the plugin has been uninstalled.

# Contributors
Andreas, Nizar, Rickard, Joel & Wissam.
