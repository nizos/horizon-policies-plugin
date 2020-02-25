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
    .factory('horizon.app.core.openstack-service-api.cafe', API);

  API.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.util.i18n.gettext'
  ];

  function API(apiService, toastService, gettext) {
    var service = {
      getDrink: getDrink,
      getDrinks: getDrinks,
      createDrink: createDrink,
      updateDrink: updateDrink,
      deleteDrink: deleteDrink
    };

    return service;

    ///////////////////////////////
    // Drinks

    function getDrink(id) {
      return apiService.get('/api/cafe/drinks/' + id)
        .error(function() {
          var msg = gettext('Unable to retrieve the Drink with id: %(id)s.');
          toastService.add('error', interpolate(msg, {id: id}, true));
        });
    }

    function getDrinks() {
      return apiService.get('/api/cafe/drinks/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Drinks.'));
        });
    }

    function createDrink(params) {
      return apiService.put('/api/cafe/drinks/', params)
        .error(function() {
          var msg = gettext('Unable to create the Drink with name: %(name)s');
          toastService.add('error', interpolate(msg, { name: params.name }, true));
        });
    }

    function updateDrink(id, params) {
      return apiService.post('/api/cafe/drinks/' + id, params)
        .error(function() {
          var msg = gettext('Unable to update the Drink with id: %(id)s');
          toastService.add('error', interpolate(msg, { id: params.id }, true));
        });
    }

    function deleteDrink(id, suppressError) {
      var promise = apiService.delete('/api/cafe/drinks/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Drink with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }
  }
}());
