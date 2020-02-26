#!/usr/bin/env bash
#
#

# USE this if you installed the plugin under horizon/openstack_dashboard/dashboards/.

rsync -av policy/cafe_ui/static/dashboard/cafe ../../../static/dashboard
