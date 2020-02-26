#!/usr/bin/env bash
#
#
#
# copy static from the plugin to Horizon/static
rsync -av policy/cafe_ui/static/dashboard/cafe ../../../static/dashboard
