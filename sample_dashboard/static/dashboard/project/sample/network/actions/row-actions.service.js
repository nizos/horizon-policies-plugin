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
    .factory('horizon.dashboard.project.sample.networks.actions.rowActions',
      tableRowActions);

  tableRowActions.$inject = [
    '$location',
    'horizon.dashboard.project.sample.basePath',
    'horizon.dashboard.project.sample.networks.actions.stop-network',
    'horizon.dashboard.project.sample.networks.actions.start-network',
    'horizon.framework.util.i18n.gettext'
  ];

  /**
   * @ngdoc service
   * @ngname horizon.dashboard.project.sample.networks.actions.rowActions
   *
   * @description
   * Provides the service for the Sample table row actions.
   *
   * @param $location The angular $location service.
   * @param basePath The sample module base path.
   * @param gettext The horizon gettext function for translation.
   * @returns Sample table row actions service object.

   */

  function tableRowActions($location, basePath, stopNetworkService, 
      startNetworkService, gettext) {

    var service = {
      actions: actions
    };

    return service;

    ///////////////

    function actions() {
      return [{
        service: stopNetworkService,
        template: {
          text: gettext('Stop Network')
        }
      }, {
        service: startNetworkService,
        template: {
          text: gettext('Start Network')
        }
      }];
    }
  }
})();
