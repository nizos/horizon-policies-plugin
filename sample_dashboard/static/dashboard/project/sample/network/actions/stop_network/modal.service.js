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
(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.sample.networks')
    .factory('horizon.dashboard.project.sample.networks.actions.stop-network', stopNetworkService);

  stopNetworkService.$inject = [
    '$q',
    '$route',
    'horizon.app.core.openstack-service-api.policy',
    'horizon.app.core.openstack-service-api.sample-network',
    'horizon.framework.widgets.modal.simple-modal.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.framework.util.q.extensions'
  ];

  function stopNetworkService($q, $route, policy, api, simpleModal, gettext, qExtensions) {

    var labels = {
      title: gettext('Stop Network'),
      body: gettext('Are you sure you want to stop this network?'),
      submit: gettext('Yes'),
      cancel: gettext('No')
    }

    var service = {
      perform: open,
      allowed: allowed,
    };

    return service;

    //////////////

    function open(network) {
      return simpleModal.modal(labels).result.then(function do_stop() {
        api.stopNetwork(network);
        $route.reload();
      });
    }

    function allowed(network) {
      return $q.all([
        qExtensions.booleanAsPromise(network.admin_state_up),
        policy.ifAllowed({ rules: [['neutron', 'update_network']] })
      ]);
    }
  }
})();
