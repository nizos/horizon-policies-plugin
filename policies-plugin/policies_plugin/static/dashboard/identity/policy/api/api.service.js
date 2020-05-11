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

    angular
        .module('horizon.dashboard.identity.policy.api')
        .factory('horizon.dashboard.identity.policy.api', Api);

    Api.$inject = [
        'horizon.framework.util.http.service',
        'horizon.framework.widgets.toast.service'
    ];

    function Api(apiService, toastService) {
        const service = {
            getRule: getRule,
            setRule: setRule,
            getRules: getRules,
            setRules: setRules
        };

        return service;

        function getRule(project, target) {
            return apiService.get('/api/rule/'+project+"/"+target)
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve rule.'));
                });
        }

        function setRule(rule) {
            return apiService.post('/api/rule/'+rule.project+'/'+rule.target, rule)
                .error(function () {
                    toastService.add('error', gettext('Unable to set rule.'))
                })
                .success(function () {
                    toastService.add('success', gettext('Rule has been successfully modified!'))
                });

        }

        function getRules() {
            return apiService.get('/api/rules/')
                .error(function () {
                    toastService.add('error', gettext('Unable to retrieve rules.'));
                });
        }

        function setRules(rules) {
            return apiService.post('/api/rules/', rules)
                .error(function () {
                    toastService.add('error', gettext('Unable to set rules.'))
                })
                .success(function () {
                    toastService.add('success', gettext('Rule has been successfully modified!'))
                });

        }
    }
})();
