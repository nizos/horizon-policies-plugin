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
    .module('horizon.dashboard.identity.policy.policies')
    .factory('horizon.dashboard.identity.policy.policies.policy-api', policiesAPI);

  policiesAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service'
  ];

  /**
   * @ngdoc service
   * @name horizon.dashboard.identity.policy.policies.policy-api
   * @description Provides direct pass through to policy-client.
   * @param apiService The horizon core API service.
   * @param toastService The horizon toast service.
   * @returns The sample policies service API.
   */

  function policiesAPI(apiService, toastService) {
    var service = {
      getPolicies: getPolicies,
      getPolicy: getPolicy,
      setPolicy: setPolicy
    };

    return service;

    /**
     * @name horizon.dashboard.identity.policy.policies.policy-api.getPolicies
     * @description
     * Get a list of policies
     * The listing result is an object with property "items". Each item is
     * a policy.
     */

    function getPolicies() {
      return apiService.get('/api/policy-api/policies/')
        .error(function () {
          toastService.add('error', gettext('Unable to retrieve policies.'));
        });
    }

    function getPolicy(project, target) {
        return apiService.get('/api/policy-api/policy/'+project+"/"+target)
          .error(function () {
            toastService.add('error', gettext('Unable to retrieve policy.'));
          });
      }
      function setPolicy(data) {
        return apiService.post('/api/policy-api/policies/', data)
          .error(function () {
            toastService.add('error', gettext('Unable to set policy.'));
          });
      }
  }
})();
