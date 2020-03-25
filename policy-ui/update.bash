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

# Get the user's confirmation to intitiate the plugin's installation process before proceeding
function getConfirmation
{
  echo -e "${GREEN}This script will perform the following:${DEFAULT}"
  echo -e "${DEFAULT}Check for existing installations for the plugin and remove them.${DEFAULT}"
  echo -e "${DEFAULT}Start a development installation of the plugin, taking your changes in the code.${DEFAULT}"
  echo -e "${DEFAULT}Add the plugin's static files to the Horizon dashboard.${DEFAULT}"
  echo -e "${DEFAULT}Add the plugin's enabled files to the Horizon dashboard.${DEFAULT}"
  echo -e "${DEFAULT}Prompt the user to restart the apache2 service for the actions to take effect.${DEFAULT}"
  startUpdate
}

function startUpdate
{
  # Check for existing installations of the plugin
  checkPlugin

  # Install the plugin package
  installPlugin

  # Add the static files to horizon dashboard
  checkStatic

  # Add the enabled files to horizon dashboard
  checkEnabled

  # Restart the Apache2 service
  restartApache

  # Show the result of the installation
  showResult
}

# Check for existing installations of the plugin
function checkPlugin
{
  # Check for existing installation of the plugin
  echo -e "${GREEN}Checking for existing installations of the plugin.${DEFAULT}"
  PackageAlreadyInstalled="$(pip show policy-ui)"

  if ["$PackageAlreadyInstalled" == ""]; then
    # No installation was found.
    echo -e "${DEFAULT}No previous installations of the plugin were found.${DEFAULT}"
    echo -e "${GREEN}Proceeding with installation.${DEFAULT}"
  else
    # Existing installation found.
    echo -e "${YELLOW}Uninstalling found installations of the plugin.${DEFAULT}"

    # Uninstall existing installation
    sudo rm -r .git/
    sudo rm -r ./policy_ui.egg-info
    sudo rm -r ./dist/
    pip uninstall policy-ui --yes
    echo -e "${YELLOW}Uninstallation complete.${DEFAULT}"
    echo -e "${GREEN}Proceeding with new installation.${DEFAULT}"
  fi
}


function checkEnabled
{
  # Check for existing plugin enabled files
  echo -e "${GREEN}Checking for existing enabled files.${DEFAULT}"

  # File names to look for
  ENABLED90=/opt/stack/horizon/openstack_dashboard/enabled/_90_project_policy_panelgroup.py
  ENABLED91=/opt/stack/horizon/openstack_dashboard/enabled/_91_project_policy_policies_panel.py

  # Get user confirmation before deleting files
  # _90_project_policy_panelgroup.py
  if [ -f "$ENABLED90" ]; then
      echo -e "${YELLOW}A file named _90_project_policy_panelgroup.py already exists!${DEFAULT}"
      removeEnabled90
  fi
  addEnabled90

  # Get user confirmation before deleting files
  # _91_project_policy_policies_panel.py
  if [ -f "$ENABLED91" ]; then
      echo -e "${YELLOW}A file named _91_project_policy_policies_panel.py already exists!${DEFAULT}"
      removeEnabled91
  fi
  addEnabled91
}

function checkStatic
{
  # Check for existing plugin static files
  echo -e "${GREEN}Checking for existing static files.${DEFAULT}"

  # File names to look for
  STATICDIR=/opt/stack/horizon/static/dashboard/policy/

  # Get user confirmation before deleting static files
  if [ -d "$STATICDIR" ]; then
      echo -e "${YELLOW}The directory /opt/stack/horizon/static/dashboard/policy/ already contains files!${DEFAULT}"
      removeStatic
  fi
  addStatic
}

# Add the static files to horizon dashboard
function addStatic
{
  # The -r trigger is there for recursively getting everything in our /dashboard/ folder.
  # The -f trigger is there to force an overwrite in case there already exists older files.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vrf ./policy_ui/static/dashboard/. /opt/stack/horizon/static/dashboard/
  # FIXME: Generally a bad practice, remember to change this later.
  sudo chmod -vR 777 /opt/stack/horizon/static/dashboard/policy/
  echo -e "${GREEN}Static files added to Horizon dashboard successfully.${DEFAULT}"
}

# Add the _90_project_policy_panelgroup.py enable files to horizon dashboard
function addEnabled90
{
  # The -f trigger is there to force an overwrite in case the file already exists.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vf ./policy_ui/enabled/_90_project_policy_panelgroup.py /opt/stack/horizon/openstack_dashboard/enabled/
  # FIXME: Generally a bad practice, remember to change this later.
  sudo chmod -v 777 /opt/stack/horizon/openstack_dashboard/enabled/_90_project_policy_panelgroup.py
  echo -e "${GREEN}Enabled file _90_project_policy_panelgroup.py added to Horizon dashboard successfully.${DEFAULT}"
}

# Add the _91_project_policy_policies_panel.py enabled file to horizon dashboard
function addEnabled91
{
  # The -f trigger is there to force an overwrite in case the file already exists.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vf ./policy_ui/enabled/_91_project_policy_policies_panel.py /opt/stack/horizon/openstack_dashboard/enabled/
  # FIXME: Generally a bad practice, remember to change this later.
  sudo chmod -v 777 /opt/stack/horizon/openstack_dashboard/enabled/_91_project_policy_policies_panel.py
  echo -e "${GREEN}Enabled file _91_project_policy_policies_panel.py added to Horizon dashboard successfully.${DEFAULT}"
}

# Delete existing plugin static files
function removeStatic
{
  # Deleting existing static files.
  sudo rm -vr /opt/stack/horizon/static/dashboard/policy/
  echo -e "${GREEN}Previously existing plugin static files removed successfully.${DEFAULT}"
}

# Remove the _90_project_policy_panelgroup.py enabled file
function removeEnabled90
{
  # Delete existing enabled file.
  sudo rm -v /opt/stack/horizon/openstack_dashboard/enabled/_90_project_policy_panelgroup.py
  echo -e "${GREEN}/opt/stack/horizon/openstack_dashboard/enabled/_90_project_policy_panelgroup.py removed successfully.${DEFAULT}"
}

# Remove the _91_project_policy_policies_panel.py enabled file
function removeEnabled91
{
  # Delee existing enabled file.
  sudo rm -v /opt/stack/horizon/openstack_dashboard/enabled/_91_project_policy_policies_panel.py
  echo -e "${GREEN}/opt/stack/horizon/openstack_dashboard/enabled/_91_project_policy_policies_panel.py.${DEFAULT}"
}

# Install the plugin package
function installPlugin
{
  # This is an extremely hack-y way to do this.
  echo -e "${GREEN}Initializing temporary repository for packager.${DEFAULT}"
  git init
  git add .
  git commit -m "Initializing temporary repository"


  # Ensure requirements are met
  echo -e "${GREEN}Installing pip requirements.${DEFAULT}"
  python3 -m pip install -r requirements.txt

  # Create the package from the repository
  echo -e "${GREEN}Creating install package.${DEFAULT}"
  python3 setup.py sdist

  # This command will always install the latest version of the package in the directory
  echo -e "${GREEN}Installing pip package.${DEFAULT}"
  pip install policy-ui --no-index --find-links ./dist/

  echo -e "${GREEN}Removing temporary packager repository.${DEFAULT}"
  sudo rm -r .git/
  sudo rm -r ./policy_ui.egg-info
  sudo rm -r ./dist/
}


# Restart the Apache2 service
function restartApache
{
  sudo service memcached restart
  sudo service apache2 restart
  echo -e "${GREEN}Restarted Apache2 and Memcached services${DEFAULT}"
}

# Show the result of the installation
function showResult
{
  # Installation completed successfully
  echo -e "${GREEN}Installation completed successfully.${DEFAULT}"
}

getConfirmation