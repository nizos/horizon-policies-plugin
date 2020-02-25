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

  angular.module('horizon.dashboard.cafe.drinks')
    .factory('horizon.dashboard.cafe.drinks.service',
      service);

  service.$inject = [
    '$filter',
    'horizon.app.core.detailRoute',
    'horizon.app.core.openstack-service-api.cafe'
  ];

  /*
   * @ngdoc factory
   * @name horizon.dashboard.cafe.drinks.service
   *
   * @description
   * This service provides functions that are used through the Drinks
   * features.  These are primarily used in the module registrations
   * but do not need to be restricted to such use.  Each exposed function
   * is documented below.
   */
  function service($filter, detailRoute, api) {
    return {
      getPromise: getPromise,
      urlFunction: urlFunction
    };

    function getPromise(params) {
      return api.getDrinks(params).then(modifyResponse);
    }

    function modifyResponse(response) {
      return {data: {items: response.data.items.map(modifyItem)}};

      function modifyItem(item) {
        var timestamp = item.updated_at ? item.updated_at : item.created_at;
        item.trackBy = item.id.concat(timestamp);
        return item;
      }
    }

    function urlFunction(item) {
      return detailRoute + 'OS::Cafe::Drink/' + item.id;
    }
  }
})();

