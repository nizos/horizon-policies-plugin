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
  'use strict';

  /**
   * @ngdoc overview
   * @name horizon.dashboard.policy.policies
   * @ngModule
   * @description
   * Provides all the services and widgets require to display the policy
   * panel
   */
  angular
    .module('horizon.dashboard.policy.policies', [
      'ngRoute'
    ])
    .constant('horizon.dashboard.policy.policies.resourceType', 'OS::Policy::Policy')
    .run(run)
    .config(config);

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.dashboard.policy.policies.service',
    'horizon.dashboard.policy.policies.basePath',
    'horizon.dashboard.policy.policies.resourceType'
  ];

  function run(registry, service, basePath, resourceType) {
    registry.getResourceType(resourceType)
    .setNames(gettext('Policy'), gettext('Policies'))
    // set default url for index view. this will be used for reproducing
    // sidebar and breadcrumb when refreshing or accessing directly
    // details view.
    .setDefaultIndexUrl('/project/policies/')
    // get items for table
    .setListFunction(service.getPromise)
  }

  config.$inject = [
    '$provide',
    '$windowProvider',
    '$routeProvider'
  ];

  /**
   * @name config
   * @param {Object} $provide
   * @param {Object} $windowProvider
   * @param {Object} $routeProvider
   * @description Routes used by this module.
   * @returns {undefined} Returns nothing
   */
  function config($provide, $windowProvider, $routeProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/policy/policies/';
    $provide.constant('horizon.dashboard.policy.policies.basePath', path);
    $routeProvider.when('/project/policies', {
      templateUrl: path + 'panel.html'
    });
  }
})();
