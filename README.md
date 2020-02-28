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

### Remove previous plugin installation
Make sure to remove any previously installed plugins using the similar name and any other previously installed and unwanted plugins.

To remove a specific package
```Bash
python3 -m pip uninstall <package-name>
```
For example, to remove policy-ui:
```Bash
python3 -m pip uninstall policy-ui
```

#### Further tips
To view a list of all packages type:
```Bash
python3 -m pip list
```

To view details about a specific package type:
```Bash
python3 -m pip show policy-ui
```

### Clone the repo
Now its time to install the plugin, we start by navigating  to `/opt/stack/horizon/` and cloning the repo.

```Bash
cd /opt/stack/horizon/
git clone https://github.com/nizos/horizon-policies-plugin
```

### Initialize policy-ui repo
In order for the setup packager to work properly, we will need to initialize a repo in the `/horizon-policies-plugin/policy-ui/` directory. If you already have .git folder in this directory and are having trouble with the installation, you can safely remove it before starting with the next step. If you are not sure if there is such a folder, check your vscode settings according to the next section or type `ls -all` while you are in the `/horizon-policies-plugin/policy-ui/` directory.

We do this by navigating into the directory and running the following commands
```Bash
cd /horizon-policies-plugin/policy-ui/
git init
git add .
git commit -a
```
Type a commit message in editor window above all the # lines. Hit `ctrl+o` then `Enter` followed by `ctrl+x` if you are using nano and you will be done.

#### Further tips
If you want to be able to view .git/ directories in vscode do the following:

1. Open the settings window by clicking on File -> Preferences -> Settings or by hitting `ctrl+,` on your keyboard.
2. type `files.exclude` in the search bar.
3. Highlight the row with .git by hovering over it with your mouse and clicking on the `x` button to remove it from the list files and folder patterns that vscode will automatically hide.

### Install the plugin
Before proceeding and in order to insure a clean install, make sure that:
* Your `/horizon-policies-plugin/policy-ui/dist` is empty or doesn't contain a `policy-ui-X.X.X.tar.gz` file.
* You don't have a `policy_ui.egg-info` folder in your `/horizon-policies-plugin/policy-ui/` directory.

You can safely delete those files/folders.

Now it is time to install the plugin. Run the following commands and in the following order:

```Bash
# /opt/stack/horizon/horizon-policies-plugin/policy-ui/
python3 -m pip install -r requirements.txt
python3 setup.py sdist
python3 -m pip install dist/policy-ui-0.0.0.tar.gz
```

### Enable the plugin
Add the plugin's enabled files to Horizon

```Bash
cd /opt/stack/horizon/
cp horizon-policies-plugin/policy-ui/policy_ui/enabled/_90_project_policy_panelgroup.py openstack_dashboard/enabled/
cp horizon-policies-plugin/policy-ui/policy_ui/enabled/_91_project_policy_drinks_panel.py openstack_dashboard/enabled/
```

### Copy static files
Copy the static files to Horizon's `static` directory
```Bash
cd /opt/stack/horizon/
cp -r horizon-policies-plugin/policy-ui/policy_ui/static/dashboard/. static/dashboard/
```

### Restart Horizon
```Bash
sudo service apache2 restart
```

# Contributors
Andreas, Nizar, Rickard, Joel & Wissam.
