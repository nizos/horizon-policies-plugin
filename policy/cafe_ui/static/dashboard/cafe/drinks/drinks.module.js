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
   * @name horizon.dashboard.cafe.drinks
   * @ngModule
   * @description
   * Provides all the services and widgets require to display the Drink
   * panel
   */
  angular
    .module('horizon.dashboard.cafe.drinks', [
      'ngRoute',
      'horizon.dashboard.cafe.drinks.actions',
      'horizon.dashboard.cafe.drinks.details'
    ])
    .constant('horizon.dashboard.cafe.drinks.events', events())
    .constant('horizon.dashboard.cafe.drinks.resourceType', 'OS::Cafe::Drink')
    .run(run)
    .config(config);

  /**
   * @ngdoc constant
   * @name horizon.dashboard.cafe.drinks.events
   * @description A list of events used by Drink
   * @returns {Object} events
   */
  function events() {
    return {
      CREATE_SUCCESS: 'horizon.dashboard.cafe.drinks.CREATE_SUCCESS',
      DELETE_SUCCESS: 'horizon.dashboard.cafe.drinks.DELETE_SUCCESS'
    };
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.dashboard.cafe.drinks.service',
    'horizon.dashboard.cafe.drinks.basePath',
    'horizon.dashboard.cafe.drinks.resourceType'
  ];

  function run(registry, service, basePath, resourceType) {
    registry.getResourceType(resourceType)
    .setNames(gettext('Drink'), gettext('Drinks'))
    // for detail summary view on table row
    .setSummaryTemplateUrl(basePath + 'details/drawer.html')
    // set default url for index view. this will be used for reproducing
    // sidebar and breadcrumb when refreshing or accessing directly
    // details view.
    .setDefaultIndexUrl('/project/drinks/')
    // specify items for table row items, summary view and details view
    .setProperties(properties())
    // get items for table
    .setListFunction(service.getPromise)
    // specify table columns
    .tableColumns
    .append({
      id: 'name',
      priority: 1,
      sortDefault: true,
      filters: ['noName'],
      urlFunction: service.urlFunction
    })
    .append({
      id: 'size',
      priority: 1,
      filters: ['noValue']
    })
    .append({
      id: 'temperature',
      priority: 1,
      filters: ['noValue']
    })
    .append({
      id: 'base',
      priority: 1,
      filters: ['noValue']
    })
    .append({
      id: 'flavor',
      priority: 1,
      filters: ['noValue']
    })
    .append({
      id: 'topping',
      priority: 2,
      filters: ['noValue']
    })
    .append({
      id: 'created_at',
      priority: 2
    })
    .append({
      id: 'updated_at',
      priority: 2
    });
    // for magic-search
    registry.getResourceType(resourceType).filterFacets
    .append({
      'label': gettext('Name'),
      'name': 'name',
      'singleton': true
    })
    .append({
      'label': gettext('Base'),
      'name': 'base',
      'singleton': true
    })
    .append({
      'label': gettext('Flavor'),
      'name': 'flavor',
      'singleton': true
    })
    .append({
      'label': gettext('ID'),
      'name': 'id',
      'singleton': true
    });
  }

  function properties() {
    return {
      id: { label: gettext('ID'), filters: ['noValue'] },
      name: { label: gettext('Name'), filters: ['noName'] },
      description: { label: gettext('Description'), filters: ['noValue'] },
      enabled: { label: gettext('Enabled'), filters: ['yesno'] },
      size: { label: gettext('Size'), filters: ['noValue'] },
      temperature: { label: gettext('Temperature'), filters: ['noValue'] },
      base: { label: gettext('Base'), filters: ['noValue'] },
      flavor: { label: gettext('Flavor'), filters: ['noValue'] },
      topping: { label: gettext('Topping'), filters: ['noValue'] },
      created_at: { label: gettext('Created'), filters: ['simpleDate', 'noValue'] },
      updated_at: { label: gettext('Updated'), filters: ['simpleDate', 'noValue'] }
    };
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
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/cafe/drinks/';
    $provide.constant('horizon.dashboard.cafe.drinks.basePath', path);
    $routeProvider.when('/project/drinks', {
      templateUrl: path + 'panel.html'
    });
  }
})();
