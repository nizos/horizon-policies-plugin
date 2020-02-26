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
    .controller('SampleNetworkTableController', SampleNetworkTableController);

  SampleNetworkTableController.$inject = [
    'horizon.app.core.openstack-service-api.sample-network',
    'horizon.dashboard.project.sample.networks.actions.batchActions',
    'horizon.dashboard.project.sample.networks.actions.rowActions'
  ];

  /**
   * @ngdoc controller
   * @name SampleNetworkTableController
   *
   * @description
   * Controller for the Sample table. Serves as the focal point for table actions.
   *
   * @param api The Sample Network service API.
   * @param batchActions The sample batch actions service.
   * @param rowActions The sample row actions service.
   * @returns undefined
   */

  function SampleNetworkTableController(api, batchActions, rowActions) {

    var ctrl = this;
    ctrl.items = [];
    ctrl.src = [];
    ctrl.checked = {};
    ctrl.batchActions = batchActions;
    ctrl.rowActions = rowActions;

    ctrl.admin_state = {
        'true': gettext('Up'),
        'false': gettext('Down')
    };


    init();

    ////////////////////////////////

    function init() {
      api.getNetworks().success(success);
    }

    function success(response) {
      ctrl.src = response.items;
    }

  }

})();
