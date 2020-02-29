/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.policy', API);

  API.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.util.i18n.gettext'
  ];

  function API(apiService, toastService, gettext) {
    var service = {
      getPolicy: getPolicy,
      getPolicies: getPolicies,
      createPolicy: createPolicy,
      updatePolicy: updatePolicy,
      deletePolicy: deletePolicy
    };

    return service;

    ///////////////////////////////
    // Policies

    function getPolicy(id) {
      return apiService.get('/api/policy/policies/' + id)
        .error(function() {
          var msg = gettext('Unable to retrieve the policy with id: %(id)s.');
          toastService.add('error', interpolate(msg, {id: id}, true));
        });
    }

    function getPolicies() {
      return apiService.get('/api/policy/policies/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the policies.'));
        });
    }

    function createPolicy(params) {
      return apiService.put('/api/policy/policies/', params)
        .error(function() {
          var msg = gettext('Unable to create the policy with name: %(name)s');
          toastService.add('error', interpolate(msg, { name: params.name }, true));
        });
    }

    function updatePolicy(id, params) {
      return apiService.post('/api/policy/policies/' + id, params)
        .error(function() {
          var msg = gettext('Unable to update the policy with id: %(id)s');
          toastService.add('error', interpolate(msg, { id: params.id }, true));
        });
    }

    function deletePolicy(id, suppressError) {
      var promise = apiService.delete('/api/policy/policies/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the policy with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }
  }
}());
