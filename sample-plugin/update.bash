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

# DIRECTORIS
# PLUGIN_PIP_PACKAGE_NAME=sample-dashboard
# PLUGIN_PIP_PACKAGE_DIST=dist/sample-dashboard-0.0.0.tar.gz

# PLUGIN_GIT_DIR=.git/
# PLUGIN_DIST_DIR=dist/
# PLUGIN_EGG_DIR=sample_dashboard.egg-info/

# PLUGIN_ENABLED_FILE_SOURCE=sample_dashboard/enabled/_1485_project_network_sample_enabled.py
# PLUGIN_ENABLED_FILE_DISTINATION=/opt/stack/horizon/openstack_dashboard/enabled/

# PLUGIN_STATIC_DASHBOARD_SOURCE=sample_dashboard/static/dashboard/project/
# PLUGIN_STATIC_DASHBOARD_DESTINATION=/opt/stack/horizon/static/dashboard/project/

# PLUGIN_STATIC_API_SOURCE=sample_dashboard/static/app/core/openstack-service-api/sample-network.service.js
# PLUGIN_STATIC_API_DESTINATION=/opt/stack/horizon/static/app/core/openstack-service-api/


# Get the user's confirmation to intitiate the plugin's installation process before proceeding

# Plugin update
function startUpdate
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
  removeApiStaticFile
  removeDashboardStaticFiles
}

# Install new files
function install
{
  addPipPackage
  addEnabledFiles
  addApiStaticFile
  addDashboardStaticFiles
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
  python3 -m pip install dist/sample-dashboard-0.0.0.tar.gz

  echo -e "${GREEN}Plugin pip package installed successfully.${DEFAULT}"
}

## Add the enabled file to horizon dashboard
function addEnabledFiles
{
  sudo cp -vf sample_dashboard/enabled/_90_project_policy_panel_group_enabled.py /opt/stack/horizon/openstack_dashboard/enabled/
  echo -e "${GREEN}Enabled file _90_project_policy_panel_group_enabled.py added to Horizon dashboard successfully.${DEFAULT}"

  sudo cp -vf sample_dashboard/enabled/_91_project_policy_policies_panel_enabled.py /opt/stack/horizon/openstack_dashboard/enabled/
  echo -e "${GREEN}Enabled file _91_project_policy_policies_panel_enabled.py added to Horizon dashboard successfully.${DEFAULT}"
}

## Add the API static files to horizon dashboard
function addApiStaticFile
{
  sudo cp -vf sample_dashboard/static/app/core/openstack-service-api/sample-network.service.js /opt/stack/horizon/static/app/core/openstack-service-api/
  sudo chmod -vR 777 /opt/stack/horizon/static/app/core/openstack-service-api/sample-network.service.js
  echo -e "${GREEN}API static files added to Horizon dashboard successfully.${DEFAULT}"
}

## Add the dashboard static files to horizon dashboard
function addDashboardStaticFiles
{
  sudo cp -vrf sample_dashboard/static/dashboard/project/. /opt/stack/horizon/static/dashboard/project/
  sudo chmod -vR 777 /opt/stack/horizon/static/dashboard/project/policy/
  echo -e "${GREEN}Dashboard static files added to Horizon dashboard successfully.${DEFAULT}"
}


# REMOVE FUNCTIONS
## Remove dist file
function removePipPackage
{
  # Check for existing installation of the plugin
  echo -e "${GREEN}Checking for existing installations of the plugin.${DEFAULT}"
  PackageAlreadyInstalled="$(pip show sample-dashboard)"

  if ["$PackageAlreadyInstalled" == ""]; then
    # No installation was found.
    echo -e "${DEFAULT}No previous installations of the plugin were found.${DEFAULT}"
  else
    # Existing installation found.
    echo -e "${YELLOW}Found an existing plugin installation!${DEFAULT}"
    python3 -m pip uninstall sample-dashboard --yes
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
  echo -e "${GREEN}Checking for existing plugin sample_dashboard.egg-info/ directory.${DEFAULT}"
  # File names to look for
  EGG_INFO_DIR=sample_dashboard.egg-info/

  # Get user confirmation before deleting static files
  if [ -d "$EGG_INFO_DIR" ]; then
      echo -e "${YELLOW}Found existing plugin sample_dashboard.egg-info/ directory.${DEFAULT}"
      sudo rm -r sample_dashboard.egg-info/
      echo -e "${GREEN}sample_dashboard.egg-info/ directory removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find an existing plugin sample_dashboard.egg-info/ directory.${DEFAULT}"
  fi
}


## Remove  plugin api static file
function removeApiStaticFile
{
  # Deleting existing api static file.
  API_STATIC=/opt/stack/horizon/static/app/core/openstack-service-api/sample-network.service.js
  if [ -f "$API_STATIC" ]; then
      echo -e "${YELLOW}Found existing plugin API static files!${DEFAULT}"
      sudo rm -v /opt/stack/horizon/static/app/core/openstack-service-api/sample-network.service.js
      echo -e "${DEFAULT}Plugin API static files removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find any existing plugin API static files.${DEFAULT}"
  fi
}


## Remove plugin dashboard static files
function removeDashboardStaticFiles
{
  # Deleting existing api static file.
  DASHBOARD_STATIC=/opt/stack/horizon/static/dashboard/project/policy/
  if [ -f "$DASHBOARD_STATIC" ]; then
      echo -e "${YELLOW}Found existing plugin dashboard static files!${DEFAULT}"
      sudo rm -vr /opt/stack/horizon/static/dashboard/project/policy/
      echo -e "${DEFAULT}Plugin dashboard static files removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find any existing plugin dashboard static files.${DEFAULT}"
  fi
}

## Remove the enabled file
function removeEnabledFiles
{
  # Deleting existing _90_project_policy_panel_group_enabled.py file.
  ENABLED_FILE_90=/opt/stack/horizon/openstack_dashboard/enabled/_90_project_policy_panel_group_enabled.py
  if [ -f "$ENABLED_FILE_90" ]; then
      echo -e "${YELLOW}Found existing _90_project_policy_panel_group_enabled.py enabled file!${DEFAULT}"
      sudo rm -v /opt/stack/horizon/openstack_dashboard/enabled/_90_project_policy_panel_group_enabled.py
      echo -e "${DEFAULT}Plugin _90_project_policy_panel_group_enabled.py file removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find any existing plugin _90_project_policy_panel_group_enabled.py file.${DEFAULT}"
  fi


  # Deleting existing _91_project_policy_policies_panel_enabled.py file.
  ENABLED_FILE_91=/opt/stack/horizon/openstack_dashboard/enabled/_91_project_policy_policies_panel_enabled.py
  if [ -f "$ENABLED_FILE_91" ]; then
      echo -e "${YELLOW}Found existing plugin _91_project_policy_policies_panel_enabled.py file!${DEFAULT}"
      sudo rm -v /opt/stack/horizon/openstack_dashboard/enabled/_91_project_policy_policies_panel_enabled.py
      echo -e "${DEFAULT}Plugin _91_project_policy_policies_panel_enabled.py file removed successfully.${DEFAULT}"
  else
      echo -e "${DEFAULT}Did not find any existing plugin _91_project_policy_policies_panel_enabled.py files.${DEFAULT}"
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

startUpdate
