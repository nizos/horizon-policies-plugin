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
    'horizon.dashboard.identity.policy.policies.policy-client',
    '$timeout',
    '$scope'
  ];

  /**
   * @ngdoc controller
   * @name PoliciesController
   * @description
   * Controller for the policies table. Serves as the focal point for table actions.
   * @param api The policies client service API.
   * @returns undefined
   */
  function PoliciesController(api, $timeout, $scope) {

    var ctrl = this;
    ctrl.src = [];
    $scope.charLimit = 50;
    ctrl.checked = {};

    init();

    function init() {
        api.getPolicies().success(success);
    }

    function success(response) {
        ctrl.src = response.items;
        ctrl.src.forEach(function(item){
            item.expanded=false;
            item.listLimit=1;
        })
    }

    $scope.expandSelected=function(item){
        if(item.expanded==true) {
            ctrl.src.forEach(function(i){
                i.expanded=false;
                i.listLimit=1;
              })
        } else {
            ctrl.src.forEach(function(i){
                i.expanded=false;
                i.listLimit=1;
              })
            item.expanded=true;
            item.listLimit=10000;
        }
    }
  }

})();
