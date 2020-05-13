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
        .module('horizon.dashboard.identity.policy.actions.upload')
        .provider('$actionsUpload', [
            function () {
                this.$get = [
                    'horizon.framework.widgets.toast.service',
                    '$q',
                    '$timeout',
                    function (toastService, $q, $timeout) {
                        const extension = ['json',];
                        return {
                            upload: function (file) {
                                let deferred = $q.defer();
                                deferred.notify("Uploading file");
                                let successful;
                                try {
                                    if (file) {
                                        if (extension.indexOf(file.name.split('.')[1]) > -1) {
                                            let reader = new FileReader();
                                            reader.onload = function(e) {
                                                let data = e.target.result;
                                                console.log("data", data);
                                                $timeout(function() {
                                                        successful = data;
                                                        if (!successful) {
                                                            throw successful;
                                                        } else {
                                                            deferred.resolve(successful);
                                                        }
                                                }, 100);
                                            }
                                            reader.readAsBinaryString(file);
                                        } else {
                                            toastService.add('error', gettext('File type is not supported!'));
                                            deferred.reject('File type is not supported!');
                                        }
                                    } else {
                                        toastService.add('error', gettext('File could not be found!'));
                                        deferred.reject('File could not be found!');
                                    }
                                } catch (err) {
                                    deferred.reject(err);
                                    toastService.add('info', gettext('Use Ctrl+C to copy to clipboard'));
                                }
                                return deferred.promise;
                            }
                        };
                    }
                ];
            }
        ]);
})();
