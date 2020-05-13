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
        .module('horizon.dashboard.identity.policy.actions.download')
        .provider('$actionsDownload', [
            function () {
                this.$get = [
                    'horizon.framework.widgets.toast.service',
                    '$q',
                    function (toastService, $q) {
                        return {
                            download: function (text) {
                                let deferred = $q.defer();
                                deferred.notify("Downloading file");

                                try {
                                    const fileName = 'policy.json';
                                    let newLink = document.createElement("a");
                                    newLink.download = fileName;
                                    const textToBLOB = new Blob([text], {type: 'application/json'});

                                    if (window.webkitURL != null) {
                                        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
                                    } else {
                                        newLink.href = window.URL.createObjectURL(textToBLOB);
                                        newLink.style.display = "none";
                                        document.body.appendChild(newLink);
                                    }
                                    newLink.click();
                                    deferred.resolve();
                                } catch (err) {
                                    toastService.add('error', gettext('Could not print content'));
                                    deferred.reject(err);
                                }
                                return deferred.promise;
                            }
                        };
                    }
                ];
            }
        ]);
})();
