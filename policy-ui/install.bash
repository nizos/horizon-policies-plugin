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
  echo -e "${DEFAULT}Start a new installation of the plugin.${DEFAULT}"
  echo -e "${DEFAULT}Add the plugin's static files to the Horizon dashboard.${DEFAULT}"
  echo -e "${DEFAULT}Add the plugin's enabled files to the Horizon dashboard.${DEFAULT}"
  echo -e "${DEFAULT}Prompt the user to restart the apache2 service for the actions to take effect.${DEFAULT}"

  while true; do
    echo -e "${BLUE}Would you like to proceed? (y/n)${DEFAULT}"
    read installConfirmation
      case $installConfirmation in
        [Yy]* ) startInstallation; break;;
        [Nn]* ) cancelInstallation; break;;
        * ) echo "Please answer Y/y or N/n.";;
      esac
  done
}

function startInstallation
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
  restartApachePrompt

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
    while true; do
      echo -e "${YELLOW}A file named _90_project_policy_panelgroup.py already exists!${DEFAULT}"
      echo -e "${BLUE}Would you like to overwrite it? (y/n)${DEFAULT}"
      read enabled90Confirmation
        case $enabled90Confirmation in
          [Yy]* ) removeEnabled90; addEnabled90; break;;
          [Nn]* ) break;;
          * ) echo "Please answer Y/y or N/n.";;
        esac
    done
  else
    echo -e "${DEFAULT}No proviously existing file named _90_project_policy_panelgroup.py was found.${DEFAULT}"
    addEnabled90;
  fi

  # Get user confirmation before deleting files
  # _91_project_policy_policies_panel.py
  if [ -f "$ENABLED91" ]; then
    while true; do
      echo -e "${YELLOW}A file named _91_project_policy_policies_panel.py already exists!${DEFAULT}"
      echo -e "${BLUE}Would you like to overwrite it? (y/n)${DEFAULT}"
      read enabled91Confirmation
        case $enabled91Confirmation in
          [Yy]* ) removeEnabled91; addEnabled91; break;;
          [Nn]* ) break;;
          * ) echo "Please answer Y/y or N/n.";;
        esac
    done
  else
    echo -e "${DEFAULT}No proviously existing file named _91_project_policy_policies_panel.py was found.${DEFAULT}"
    addEnabled91;
  fi
}

function checkStatic
{
  # Check for existing plugin static files
  echo -e "${GREEN}Checking for existing static files.${DEFAULT}"

  # File names to look for
  STATICDIR=/opt/stack/horizon/static/dashboard/policy/

  # Get user confirmation before deleting static files
  if [ -d "$STATICDIR" ]; then
    while true; do
      echo -e "${YELLOW}The directory /opt/stack/horizon/static/dashboard/policy/ already contains files!${DEFAULT}"
      echo -e "${BLUE}Would you like to overwrite them? (y/n)${DEFAULT}"
      read staticDirConfirmation
        case $staticDirConfirmation in
          [Yy]* ) removeStatic; addStatic; break;;
          [Nn]* ) break;;
          * ) echo "Please answer Y/y or N/n.";;
        esac
    done
  else
    echo -e "${DEFAULT}No proviously existing directory was found at /opt/stack/horizon/static/dashboard/policy/.${DEFAULT}"
    addStatic
  fi
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

# Add the static files to horizon dashboard
function addStatic
{
  # The -r trigger is there for recursively getting everything in our /dashboard/ folder.
  # The -f trigger is there to force an overwrite in case there already exists older files.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vrf ./policy_ui/static/dashboard/. /opt/stack/horizon/static/dashboard/
  echo -e "${GREEN}Static files added to Horizon dashboard successfully.${DEFAULT}"
}

# Add the _90_project_policy_panelgroup.py enable files to horizon dashboard
function addEnabled90
{
  # The -f trigger is there to force an overwrite in case the file already exists.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vf ./policy_ui/enabled/_90_project_policy_panelgroup.py /opt/stack/horizon/openstack_dashboard/enabled/
  echo -e "${GREEN}Enabled file _90_project_policy_panelgroup.py added to Horizon dashboard successfully.${DEFAULT}"
}

# Add the _91_project_policy_policies_panel.py enabled file to horizon dashboard
function addEnabled91
{
  # The -f trigger is there to force an overwrite in case the file already exists.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vf ./policy_ui/enabled/_91_project_policy_policies_panel.py /opt/stack/horizon/openstack_dashboard/enabled/
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

# Ask user whether to restart the Apache2 service
function restartApachePrompt
{
  while true; do
    echo -e "${BLUE}Do you want to restart the apache2 service? (Y/n)${DEFAULT}"
    read restartApacheInput
    case $restartApacheInput in
      [Yy]* ) restartApache; break;;
      [Nn]* ) exit;;
      * ) echo "Please answer Y/y or N/n.";;
    esac
  done
}

# Cancel plugin installation
function cancelInstallation
{
  echo -e "${YELLOW}Cancelling installation.${DEFAULT}"
  echo -e "${GREEN}No changes have been made.${DEFAULT}"
}

# Restart the Apache2 service
function restartApache
{
  sudo service apache2 restart
  echo -e "${GREEN}Restarted Apache2 service${DEFAULT}"
}

# Show the result of the installation
function showResult
{
  # Installation completed successfully
  echo -e "${GREEN}Installation completed successfully.${DEFAULT}"
}

getConfirmation
