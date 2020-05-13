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

    /**
     * @ngdoc overview
     * @name horizon.dashboard.identity.policy
     * @description
     * The plugin's top level module.
     */

    angular
        .module('horizon.dashboard.identity.policy', [
            'ngRoute',
            'ngSanitize',
            'ui.bootstrap',
            'horizon.dashboard.identity.policy.actions',
            'horizon.dashboard.identity.policy.actions.copy',
            'horizon.dashboard.identity.policy.actions.context-menu',
            'horizon.dashboard.identity.policy.actions.download',
            'horizon.dashboard.identity.policy.actions.history',
            'horizon.dashboard.identity.policy.actions.paste',
            'horizon.dashboard.identity.policy.actions.print',
            'horizon.dashboard.identity.policy.actions.reload',
            'horizon.dashboard.identity.policy.actions.upload',
            'horizon.dashboard.identity.policy.api',
            'horizon.dashboard.identity.policy.model',
            'horizon.dashboard.identity.policy.model.checklist-model',
            'horizon.dashboard.identity.policy.model.policies-model',
            'horizon.dashboard.identity.policy.svg-icons',
            'horizon.dashboard.identity.policy.policies.components',
            'horizon.dashboard.identity.policy.policies.components.plugin-info',
            'horizon.dashboard.identity.policy.policies.components.policies-details',
            'horizon.dashboard.identity.policy.policies.components.policies-editor.editor-autocomplete',
            'horizon.dashboard.identity.policy.policies.components.policies-editor.editor-autocomplete.autocomplete-item',
            'horizon.dashboard.identity.policy.policies.components.policies-editor',
            'horizon.dashboard.identity.policy.policies.components.policies-pagination',
            'horizon.dashboard.identity.policy.policies.components.policies-search',
            'horizon.dashboard.identity.policy.policies.components.policies-table',
            'horizon.dashboard.identity.policy.policies.components.scroll-up',
            'horizon.dashboard.identity.policy.policies'
        ])
        .config(config);

        config.$inject = [
            '$provide',
            '$windowProvider',
            '$routeProvider'
        ];

        function config($provide, $windowProvider, $routeProvider) {
            const basePath = $windowProvider.$get().STATIC_URL + 'dashboard/identity/policy/';
            $provide.constant('horizon.dashboard.identity.policy.basePath', basePath);

            const policies = '/identity/policies';

            $routeProvider.when(policies, {
                templateUrl: basePath + 'policies/policies.html'
            });
        }

}());
