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
    .module('horizon.dashboard.identity.policy.policies')
    .controller('PoliciesController', PoliciesController);

    PoliciesController.$inject = [
    'horizon.dashboard.identity.policy.policies.policy-client'
  ];

  /**
   * @ngdoc controller
   * @name PoliciesController
   *
   * @description
   * Controller for the policies table. Serves as the focal point for table actions.
   *
   * @param api The policies client service API.
   * @returns undefined
   */

  function PoliciesController(api) {

    var ctrl = this;
    ctrl.src = [];

    ctrl.admin_state = {
        'true': gettext('Up'),
        'false': gettext('Down')
    };


    init();

    ////////////////////////////////

    function init() {
      api.getPolicies().success(success);
    }

    function success(response) {
      ctrl.src = response.items;
    }

  }

})();
