/*
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.sample-network', networkAPI);

  networkAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service'
  ];

  /**
   * @ngdoc service
   * @name horizon.app.core.openstack-service-api.sample-network
   * @description Provides direct pass through to neutron API NO abstraction.
   * @param apiService The horizon core API service.
   * @param toastService The horizon toast service.
   * @returns The sample network service API.
   */

  function networkAPI(apiService, toastService) {
    var service = {
      getNetworks: getNetworks,
      stopNetwork: stopNetwork,
      startNetwork: startNetwork
    };

    return service;

    ///////////////

    // Networks

    /**
     * @name horizon.app.core.openstack-service-api.sample-network.getNetworks
     * @description
     * Get a list of networks
     * The listing result is an object with property "items". Each item is
     * a network.
     */

    function getNetworks() {
      return apiService.get('/api/sample-network/networks/')
        .error(function () {
          toastService.add('error', gettext('Unable to retrieve Networks.'));
        });
    }

    function stopNetwork(network) {
      network.admin_state_up = false;
      return apiService.put('/api/sample-network/networks/', network)
        .error(function () {
          toastService.add('error', gettext('Unable to stop Network.'));
        });
    }

    function startNetwork(network) {
      network.admin_state_up = true;
      return apiService.put('/api/sample-network/networks/', network)
        .error(function () {
          toastService.add('error', gettext('Unable to start network.'));
        });
    }
  }
})();
