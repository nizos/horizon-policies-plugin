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
        .module('horizon.dashboard.identity.policy.actions.copy')
        .provider('$actionsCopy', [
            function() {
                this.$get = [
                    'horizon.framework.widgets.toast.service',
                    '$q',
                    '$window',
                    function(toastService, $q, $window) {

                        const body = angular.element($window.document.body);
                        let textarea = angular.element('<textarea/>');
                        textarea.css({ position: 'fixed', opacity: '0' });
                        return {

                            // Copy parameter passed string to clipboard
                            copyContents: function(stringToCopy) {
                                let deferred = $q.defer();
                                deferred.notify("copying contents to clipboard");
                                textarea.val(stringToCopy);
                                body.append(textarea);
                                textarea[0].select();
                                try {
                                    $window.document.execCommand('copy');
                                    toastService.add('success', gettext('Content successfully copied to clipboard'));
                                    deferred.resolve();
                                } catch (err) {
                                    deferred.reject(err);
                                    toastService.add('info', gettext('Use Ctrl+C to copy to clipboard'));
                                } finally {
                                    textarea.remove();
                                };
                                return deferred.promise;
                            },

                            // Copy parameter policy to clipboard
                            copyPolicy: function(policy) {
                                let deferred = $q.defer();
                                deferred.notify("copying policy to clipboard");
                                try {
                                    let contents = '{' + '\n' + '    ';
                                    if (policy.project != 'global') {
                                        contents += '"' + policy.project + ':' + policy.target + '": "' + policy.rule + '"' + '\n' + '}';
                                    } else {
                                        contents += '"' + policy.target + '": "' + policy.rule + '"' + '\n' + '}';
                                    };
                                    textarea.val(contents);
                                    body.append(textarea);
                                    textarea[0].select();
                                    $window.document.execCommand('copy');
                                    toastService.add('success', gettext('Policy successfully copied to clipboard'));
                                    deferred.resolve();
                                } catch (err) {
                                    deferred.reject(err);
                                    toastService.add('error', gettext('Unable to copy policy to clipboard!'));
                                } finally {
                                    textarea.remove();
                                };
                                return deferred.promise;
                            },

                            // Copy parameter passed policies to clipboard
                            copyPolicies: function(policies) {
                                let deferred = $q.defer();
                                deferred.notify("copying policies to clipboard");
                                try {
                                    let contents = '{' + '\n' + '    ';
                                    for (let i = 0; i < policies.length; i++) {
                                        if (policies[i].project != 'global') {
                                            contents += '"' + policies[i].project + ':' + policies[i].target + '": "' + policies[i].rule + '"';
                                        } else {
                                            policies[i] += '"' + policies[i].target + '": "' + policies[i].rule + '"';
                                        };
                                        if (i+1 < policies.length) {
                                            contents += ',' + '\n' + '    ';
                                        } else {
                                            contents += '\n' + '}';
                                        };
                                    };
                                    textarea.val(contents);
                                    body.append(textarea);
                                    textarea[0].select();
                                    $window.document.execCommand('copy');
                                    toastService.add('success', gettext('Policies successfully copied to clipboard'));
                                    deferred.resolve();
                                } catch (err) {
                                    deferred.reject(err);
                                    toastService.add('error', gettext('Unable to copy policies to clipboard!'));
                                } finally {
                                    textarea.remove();
                                };
                                return deferred.promise;
                            }
                        };
                    }
                ];
            }
        ]);

})();
