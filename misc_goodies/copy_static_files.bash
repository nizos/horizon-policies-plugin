#!/usr/bin/env bash
#
#

# Create necessary directiories
mkdir /opt/stack/horizon/static/dashboard/project/sample
mkdir /opt/stack/horizon/static/dashboard/project/sample/network
mkdir /opt/stack/horizon/static/dashboard/project/sample/network/actions
mkdir /opt/stack/horizon/static/dashboard/project/sample/network/actions/start_network
mkdir /opt/stack/horizon/static/dashboard/project/sample/network/actions/stop_network

# Copy static files
## sample-network.service.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/app/core/openstack-service-api/sample-network.service.js /opt/stack/horizon/static/app/core/openstack-service-api/

## sample/sample.module.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/sample.module.js /opt/stack/horizon/static/dashboard/project/sample/

## sample/network/table.html
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/table.html /opt/stack/horizon/static/dashboard/project/sample/network/

## sample/network/networks.module.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/networks.module.js /opt/stack/horizon/static/dashboard/project/sample/network/

## sample/network/networks.controller.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/networks.controller.js /opt/stack/horizon/static/dashboard/project/sample/network/

## sample/network/actions/row-actions.service.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/row-actions.service.js /opt/stack/horizon/static/dashboard/project/sample/network/actions/

## sample/network/actions/batch-actions.service.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/batch-actions.service.js /opt/stack/horizon/static/dashboard/project/sample/network/actions/


## sample/network/actions/start_network/modal.service.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/start_network/modal.service.js /opt/stack/horizon/static/dashboard/project/sample/network/actions/start_network/

## sample/network/actions/stop_network/modal.service.js
cp /opt/stack/horizon/sample-horizon-angular-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/stop_network/modal.service.js /opt/stack/horizon/static/dashboard/project/sample/network/actions/actions/stop_network/

