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
        [Nn]* ) cancelInstallation;;
        * ) echo "Please answer Y/y or N/n.";;
      esac
  done
}

function startInstallation
{
  # Check for existing installations of the plugin
  checkForExistingPlugin

  # Install the plugin package
  installPlugin

  # Add the static files to horizon dashboard
  addStaticFiles

  # Add the enabled files to horizon dashboard
  addEnabledFiles

  # Restart the Apache2 service
  restartApachePrompt

  # Show the result of the installation
  showResult
}

# Check for existing installations of the plugin
function checkForExistingPlugin
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
    pip uninstall policy-ui
    echo -e "${YELLOW}Uninstallation complete.${DEFAULT}"
    echo -e "${GREEN}Proceeding with new installation.${DEFAULT}"
  fi
}

# Install the plugin package
function installPlugin
{
  # Ensure requirements are met
  python3 -m pip install -r requirements.txt

  # Create the package
  python3 setup.py sdist

  # This command will always install the latest version of the package in the directory
  pip install policy-ui --no-index --find-links ./dist/
}

# Add the static files to horizon dashboard
function addStaticFiles
{
  # The -r trigger is there for recursively getting everything in our /dashboard/ folder.
  # The -f trigger is there to force an overwrite in case there already exists older files.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vrf ./policy_ui/static/dashboard/. /opt/stack/horizon/static/dashboard/
  echo -e "${GREEN}Static files added to Horizon dashboard successfully.${DEFAULT}"
}

# Add the enabled files to horizon dashboard
function addEnabledFiles
{
  # The -f trigger is there to force an overwrite in case the file already exists.
  # The -v flag is there to give a feeling of progress.
  sudo cp -vf ./policy_ui/enabled/_90_project_policy_panelgroup.py /opt/stack/horizon/openstack_dashboard/enabled/
  sudo cp -vf ./policy_ui/enabled/_91_project_policy_policies_panel.py /opt/stack/horizon/openstack_dashboard/enabled/
  echo -e "${GREEN}Enabled files added to Horizon dashboard successfully.${DEFAULT}"
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
exit 1