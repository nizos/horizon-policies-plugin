#!/usr/bin/env bash
#
#
# Assuming that you have the plugin under the Horizon directory you will be able to use this script.

# copy static from the plugin to Horizon/static. Use this if you installed the plugin under /Horizion ***NOT DASHBOARDS"
#rsync -av policy/cafe_ui/static/dashboard/cafe ../../../static/dashboard


# USE this if you installed the plugin under this  horizon/openstack_dashboard/dashboards/.

rsync -av policy/cafe_ui/static/dashboard/cafe ../../../../../static/dashboard
