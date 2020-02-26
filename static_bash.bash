#!/usr/bin/env bash
#
#
# Assuming that you have the plugin under the Horizon directory you will be able to use this script.
# copy static from the plugin to Horizon/static
rsync -av policy/cafe_ui/static/dashboard/cafe ../../../static/dashboard
