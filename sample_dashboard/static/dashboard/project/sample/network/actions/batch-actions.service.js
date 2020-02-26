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
    .factory('horizon.dashboard.project.sample.networks.actions.batchActions',
      tableBatchActions);

  tableBatchActions.$inject = [
    '$location',
    'horizon.dashboard.project.sample.basePath',
    'horizon.framework.util.i18n.gettext'
  ];

  /**
   * @ngdoc service
   * @ngname horizon.dashboard.project.sample.networks.actions.batchActions
   *
   * @description
   * Provides the service for the Sample table batch actions.
   *
   * @param $location The angular $location service.
   * @param basePath The sample module base path.
   * @param gettext The horizon gettext function for translation.
   * @returns Sample table batch actions service object.

   */

  function tableBatchActions($location, basePath, gettext) {

    var service = {
      actions: actions
    };

    return service;

    ///////////////

    function actions() {
      return [];
    }
  }

})();
