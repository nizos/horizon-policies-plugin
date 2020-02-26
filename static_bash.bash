#!/usr/bin/env bash
#
#
# Assuming that you have the plugin under the Horizon directory you will be able to use this script.


# USE this if you installed the plugin under horizon/openstack_dashboard/dashboards/.

rsync -av policy/cafe_ui/static/dashboard/cafe ../../../../../static/dashboard
