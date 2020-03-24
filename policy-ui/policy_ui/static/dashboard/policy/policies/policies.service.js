/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  "use strict";

  angular.module('horizon.dashboard.policy.policies')
    .factory('horizon.dashboard.policy.policies.service',
      service);

  service.$inject = [
    'horizon.app.core.openstack-service-api.policy'
  ];

  /*
   * @ngdoc factory
   * @name horizon.dashboard.policy.policies.service
   *
   * @description
   * This service provides functions that are used through the Policies
   * features.  These are primarily used in the module registrations
   * but do not need to be restricted to such use.  Each exposed function
   * is documented below.
   */
  function service($api) {
    return {
      getPromise: getPromise
    };

    function getPromise(params) {
      return api.getGreeting();
    }
  }
})();

