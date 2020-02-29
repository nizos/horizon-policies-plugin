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
   * @ngname horizon.dashboard.policy.policies.actions
   *
   * @description
   * Provides all of the actions for Policies.
   */
  angular
    .module('horizon.dashboard.policy.policies.actions', [
      'horizon.framework',
      'horizon.dashboard.policy'
    ])
    .run(registerPolicyActions);

  registerPolicyActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.policy.policies.create.service',
    'horizon.dashboard.policy.policies.update.service',
    'horizon.dashboard.policy.policies.delete.service',
    'horizon.dashboard.policy.policies.resourceType'
  ];

  function registerPolicyActions (
    registry,
    gettext,
    createPolicyService,
    updatePolicyService,
    deletePolicyService,
    resourceType
  ) {
    var policiesResourceType = registry.getResourceType(resourceType);
    policiesResourceType.globalActions
      .append({
        id: 'createPolicyAction',
        service: createPolicyService,
        template: {
          type: 'create',
          text: gettext('Create Policy')
        }
      });

    policiesResourceType.batchActions
      .append({
        id: 'batchDeletePolicyAction',
        service: deletePolicyService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete Policies')
        }
      });

    policiesResourceType.itemActions
      .append({
        id: 'updatePolicyAction',
        service: updatePolicyService,
        template: {
          text: gettext('Update Policy')
        }
      })
      .append({
        id: 'deletePolicyAction',
        service: deletePolicyService,
        template: {
          type: 'delete',
          text: gettext('Delete Policy')
        }
      });
  }
})();
