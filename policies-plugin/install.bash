#!/bin/bash
# A script that executes the plugin's installation commands

# Text formatting colors
RED='\e[31m'
GREEN='\e[32m'
YELLOW='\e[33m'
BLUE='\e[34m'
MAGENTA='\e[35m'
CYAN='\e[36m'
DEFAULT='\e[39m'


# Plugin install
function startInstall
{
  showIntro
  uninstall
  install
  cleanup
  restart
  showResult
}

# Remove previous files
function uninstall
{
  removePipPackage
  removeDistDir
  removeGitDir
  removeEggInfoDir
  removeEnabledFiles
  removeStaticFiles
}

# Install new files
function install
{
  addPipPackage
  addEnabledFiles
  addStaticFiles
}

# Remove left over files
function cleanup
{
  removeDistDir
  removeGitDir
  removeEggInfoDir
}

# Restart services
function restart
{
  restartApache
  restartMemcached
}



# ADD FUNCTIONS
## Add the plugin pip installation
function addPipPackage
{
  # Init and commit repo for pbr
  echo -e "${GREEN}Initializing temporary repository for packager.${DEFAULT}"
  git init
  git add .
  git commit -a -m "Initializing temporary repository"

  # Ensure requirements are met
  echo -e "${GREEN}Installing pip requirements.${DEFAULT}"
  python3 -m pip install -r requirements.txt

  # Create the package from the repository
  echo -e "${GREEN}Creating install package.${DEFAULT}"
  python3 setup.py sdist

  # This command will always install the latest version of the package in the directory
  echo -e "${GREEN}Installing pip package.${DEFAULT}"
  python3 -m pip install dist/policies-plugin-0.0.0.tar.gz

  echo -e "${GREEN}Plugin pip package installed successfully.${DEFAULT}"
}

## Add the enabled file to horizon dashboard
function addEnabledFiles
{
  sudo cp -vf policies_plugin/enabled/_3100_identity_policy_policies_panel_enabled.py /opt/stack/horizon/openstack_dashboard/enabled/
  echo -e "${GREEN}Enabled file _3100_identity_policy_policies_panel_enabled.py added to Horizon dashboard successfully.${DEFAULT}"
}

## Add the dashboard static files to horizon dashboard
function addStaticFiles
{
  sudo cp -vrf policies_plugin/static/dashboard/identity/. /opt/stack/horizon/static/dashboard/identity/
  sudo chmod -vR 777 /opt/stack/horizon/static/dashboard/identity/policy/
  echo -e "${GREEN}Dashboard static files added to Horizon dashboard successfully.${DEFAULT}"
}


# REMOVE FUNCTIONS
## Remove dist file
function removePipPackage
{
  # Check for existing installation of the plugin
  echo -e "${GREEN}Checking for existing installations of the plugin.${DEFAULT}"
  PackageAlreadyInstalled="$(pip show policies-plugin)"

  if ["$PackageAlreadyInstalled" == ""]; then
    # No installation was found.
    echo -e "${DEFAULT}No previous installations of the plugin were found.${DEFAULT}"
  else
    # Existing installation found.
    echo -e "${YELLOW}Found an existing plugin installation!${DEFAULT}"
    python3 -m pip uninstall policies-plugin --yes
    echo -e "${GREEN}Existing plugin installation uninstalled successfully.${DEFAULT}"
  fi
}

## Remove dist files
function removeDistDir
{
  # Check for existing installation of the plugin
  echo -e "${GREEN}Checking for existing plugin dist/ directory.${DEFAULT}"
  # File names to look for
  DIST_DIR=dist/

  # Get user confirmation before deleting static files
  if [ -d "$DIST_DIR" ]; then
      echo -e "${YELLOW}Found existing plugin dist/ directory.${DEFAULT}"
      sudo rm -r dist/
      echo -e "${GREEN}dist/ directory removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find an existing plugin dist/ directory.${DEFAULT}"
  fi
}

## Remove git files
function removeGitDir
{
  # Check for existing installation of the plugin
  echo -e "${GREEN}Checking for existing plugin .git directory.${DEFAULT}"
  # File names to look for
  GIT_DIR=.git/

  # Get user confirmation before deleting static files
  if [ -d "$GIT_DIR" ]; then
      echo -e "${YELLOW}Found existing plugin .git directory.${DEFAULT}"
      sudo rm -r .git/
      echo -e "${GREEN}.git/ directory removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find an existing plugin .git directory.${DEFAULT}"
  fi
}

## Remove egg-info files
function removeEggInfoDir
{
  # Check for existing installation of the plugin
  echo -e "${GREEN}Checking for existing plugin policies_plugin.egg-info/ directory.${DEFAULT}"
  # File names to look for
  EGG_INFO_DIR=policies_plugin.egg-info/

  # Get user confirmation before deleting static files
  if [ -d "$EGG_INFO_DIR" ]; then
      echo -e "${YELLOW}Found existing plugin policies_plugin.egg-info/ directory.${DEFAULT}"
      sudo rm -r policies_plugin.egg-info/
      echo -e "${GREEN}policies_plugin.egg-info/ directory removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find an existing plugin policies_plugin.egg-info/ directory.${DEFAULT}"
  fi
}


## Remove plugin dashboard static files
function removeStaticFiles
{
  # Deleting existing api static file.
  DASHBOARD_STATIC=/opt/stack/horizon/static/dashboard/identity/policy/
  if [ -f "$DASHBOARD_STATIC" ]; then
      echo -e "${YELLOW}Found existing plugin dashboard static files!${DEFAULT}"
      sudo rm -vr /opt/stack/horizon/static/dashboard/identity/policy/
      echo -e "${DEFAULT}Plugin dashboard static files removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find any existing plugin dashboard static files.${DEFAULT}"
  fi
}

## Remove the enabled file
function removeEnabledFiles
{
  # Deleting existing _3100_identity_policy_policies_panel_enabled.py file.
  ENABLED_FILE_3100=/opt/stack/horizon/openstack_dashboard/enabled/_3100_identity_policy_policies_panel_enabled.py
  if [ -f "$ENABLED_FILE_3100" ]; then
      echo -e "${YELLOW}Found existing plugin _3100_identity_policy_policies_panel_enabled.py file!${DEFAULT}"
      sudo rm -v /opt/stack/horizon/openstack_dashboard/enabled/_3100_identity_policy_policies_panel_enabled.py
      echo -e "${DEFAULT}Plugin _3100_identity_policy_policies_panel_enabled.py file removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find any existing plugin _3100_identity_policy_policies_panel_enabled.py files.${DEFAULT}"
  fi
}


# RESTART FUNCTIONS
## Restart the memcached service
function restartMemcached
{
  sudo service memcached restart
  echo -e "${GREEN}Restarted Memcached service${DEFAULT}"
}

## Restart the apache2 service
function restartApache
{
  sudo service apache2 restart
  echo -e "${GREEN}Restarted Apache2 service${DEFAULT}"
}

# RESULTS FUNCTIONS
## Show intro message
function showIntro
{
  echo -e "${GREEN}This script will perform the following:${DEFAULT}"
  echo -e "${DEFAULT}Check for existing installations for the plugin and remove them.${DEFAULT}"
  echo -e "${DEFAULT}Start a development installation of the plugin, taking your changes in the code.${DEFAULT}"
  echo -e "${DEFAULT}Add the plugin's static files to the Horizon dashboard.${DEFAULT}"
  echo -e "${DEFAULT}Add the plugin's enabled files to the Horizon dashboard.${DEFAULT}"
  echo -e "${DEFAULT}Prompt the user to restart the apache2 service for the actions to take effect.${DEFAULT}"
}

## Show the result of the installation
function showResult
{
  # Installation completed successfully
  echo -e "${GREEN}Installation completed successfully.${DEFAULT}"
}

startInstall
