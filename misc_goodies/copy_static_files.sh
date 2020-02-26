#!/bin/bash
# @Author: Nizar
# @Date:   2020-02-26 15:59:53
# @Last Modified by:   Nizar
# @Last Modified time: 2020-02-26 17:13:43
cd /opt/stack/horizon/

mkdir static/dashboard/project/sample
mkdir static/dashboard/project/sample/network
mkdir static/dashboard/project/sample/network/actions
mkdir static/dashboard/project/sample/network/actions/start_network
mkdir static/dashboard/project/sample/network/actions/stop_network

echo "Created necessary static directories."


cp horizon-policies-plugin/sample_dashboard/static/app/core/openstack-service-api/sample-network.service.js static/app/core/openstack-service-api/


cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/sample.module.js static/dashboard/project/sample/


cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/network/table.html static/dashboard/project/sample/network/


cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/network/networks.module.js static/dashboard/project/sample/network/


cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/network/networks.controller.js static/dashboard/project/sample/network/


cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/row-actions.service.js static/dashboard/project/sample/network/actions/


cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/batch-actions.service.js static/dashboard/project/sample/network/actions/



cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/start_network/modal.service.js static/dashboard/project/sample/network/actions/start_network/


cp horizon-policies-plugin/sample_dashboard/static/dashboard/project/sample/network/actions/stop_network/modal.service.js static/dashboard/project/sample/network/actions/stop_network/

echo "Finished copying static files."