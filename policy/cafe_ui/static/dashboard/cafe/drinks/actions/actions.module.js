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
   * @ngname horizon.dashboard.cafe.drinks.actions
   *
   * @description
   * Provides all of the actions for Drinks.
   */
  angular
    .module('horizon.dashboard.cafe.drinks.actions', [
      'horizon.framework',
      'horizon.dashboard.cafe'
    ])
    .run(registerDrinkActions);

  registerDrinkActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.cafe.drinks.create.service',
    'horizon.dashboard.cafe.drinks.update.service',
    'horizon.dashboard.cafe.drinks.delete.service',
    'horizon.dashboard.cafe.drinks.resourceType'
  ];

  function registerDrinkActions (
    registry,
    gettext,
    createDrinkService,
    updateDrinkService,
    deleteDrinkService,
    resourceType
  ) {
    var drinksResourceType = registry.getResourceType(resourceType);
    drinksResourceType.globalActions
      .append({
        id: 'createDrinkAction',
        service: createDrinkService,
        template: {
          type: 'create',
          text: gettext('Create Drink')
        }
      });

    drinksResourceType.batchActions
      .append({
        id: 'batchDeleteDrinkAction',
        service: deleteDrinkService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete Drinks')
        }
      });

    drinksResourceType.itemActions
      .append({
        id: 'updateDrinkAction',
        service: updateDrinkService,
        template: {
          text: gettext('Update Drink')
        }
      })
      .append({
        id: 'deleteDrinkAction',
        service: deleteDrinkService,
        template: {
          type: 'delete',
          text: gettext('Delete Drink')
        }
      });
  }
})();
