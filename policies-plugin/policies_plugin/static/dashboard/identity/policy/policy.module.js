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
            'horizon.dashboard.identity.policy.lib',
            'horizon.dashboard.identity.policy.lib.checklist-model',
            'horizon.dashboard.identity.policy.lib.autocomp',
            'horizon.dashboard.identity.policy.policies.svg-icon',
            'horizon.dashboard.identity.policy.policies',
            'horizon.dashboard.identity.policy.policies.editor',
            'horizon.dashboard.identity.policy.policies.details',
            'horizon.dashboard.identity.policy.policies.info',
            'horizon.dashboard.identity.policy.lib.clipboard'
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
