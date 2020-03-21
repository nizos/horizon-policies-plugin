MESSAGE="$(pip show policy-ui)"
COMPARISON=""
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NOCOL='\033[0m'

if ["$MESSAGE" == "$COMPARISON"]; then
    echo -e "${GREEN}Plugin not installed.${NOCOL}"
else
    echo -e "${RED}Uninstalling the old version of the plugin...${NOCOL}"
    pip uninstall policy-ui
fi

echo -e "${GREEN}Installing the plugin...${NOCOL}"

# Ensure requirements are met
python3 -m pip install -r requirements.txt
echo -e "${CYAN}STEP 1 DONE${NOCOL}"

# Create the package
python3 setup.py sdist
echo -e "${CYAN}STEP 2 DONE${NOCOL}"

# This command will always install the latest version of the package in the directory
pip install policy-ui --no-index --find-links ./dist/
echo -e "${CYAN}STEP 3 DONE${NOCOL}"


# Copy the dashboard files to the correct folder
# The -r trigger is there for recursively getting everything in our /dashboard/ folder.
# The -f trigger is there to force an overwrite in case there already exists older files.
# The -v flag is there to give a feeling of progress.
sudo cp -vrf ./policy_ui/static/dashboard/. /opt/stack/horizon/static/dashboard/
echo -e "${CYAN}Copied the dashboard!${NOCOL}"

# Copy the static files to the correct folder.
# The -f trigger is there to force an overwrite in case the file already exists.
# The -v flag is there to give a feeling of progress.
sudo cp -vf ./policy_ui/enabled/_90_project_policy_panelgroup.py /opt/stack/horizon/openstack_dashboard/enabled/
sudo cp -vf ./policy_ui/enabled/_91_project_policy_policies_panel.py /opt/stack/horizon/openstack_dashboard/enabled/
echo -e "${CYAN}Copied the static files!${NOCOL}"

# Restart Apache2 service
sudo service apache2 restart
echo -e "${CYAN}Restarted Apache2 service${NOCOL}"