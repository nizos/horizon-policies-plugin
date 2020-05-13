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
        .provider('$actionsCopy', [function () {

            this.$get = [
                'horizon.framework.widgets.toast.service',
                '$q',
                '$window',
                function (toastService, $q, $window) {
                    const body = angular.element($window.document.body);
                    let textarea = angular.element('<textarea/>');
                    textarea.css({
                        position: 'fixed',
                        opacity: '0'
                    });
                    return {
                        copy: function (stringToCopy) {
                            let deferred = $q.defer();
                            deferred.notify("copying the text to clipboard");
                            textarea.val(stringToCopy);
                            body.append(textarea);
                            textarea[0].select();

                            try {
                                var successful = $window.document.execCommand('copy');
                                if (!successful) throw successful;
                                deferred.resolve(successful);
                            } catch (err) {
                                deferred.reject(err);
                                toastService.add('info', gettext('Use Ctrl+C to copy to clipboard'));
                            } finally {
                                textarea.remove();
                            }
                            return deferred.promise;
                        }
                    };
                }
            ];
        }]);
})();
