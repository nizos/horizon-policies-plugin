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
        .module('horizon.dashboard.identity.policy.actions.print')
        .provider('$actionsPrint', [function () {

            this.$get = [
                'horizon.framework.widgets.toast.service',
                '$q',
                '$window',
                function (toastService, $q, $window) {
                    const body = document.getElementsByTagName("BODY")[0];
                    return {
                        print: function (contents) {
                            let deferred = $q.defer();
                            deferred.notify("Printing text");

                            try {
                                //Create a dynamic IFRAME.
                                const frame1 = document.createElement("IFRAME");
                                frame1.name = "frame1";
                                frame1.setAttribute("style", "position:absolute;top:-1000000px");
                                body.appendChild(frame1);

                                //Create a Frame Document.
                                const frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
                                frameDoc.document.open();
                                //Create a new HTML document.
                                frameDoc.document.write('<html><head><title>Policies</title>');
                                frameDoc.document.write('</head><body>');
                                //Append the DIV contents.
                                frameDoc.document.write(contents);
                                frameDoc.document.write('</body></html>');
                                frameDoc.document.close();
                                $window.setTimeout(function () {
                                    $window.frames["frame1"].focus();
                                    var successful = $window.frames["frame1"].print();
                                    body.removeChild(frame1);
                                    if (!successful) {
                                        throw successful;
                                    } else {
                                        deferred.resolve(successful);
                                    }
                                }, 500);
                            } catch (err) {
                                deferred.reject(err);
                                toastService.add('error', gettext('Could not print document!'));
                            }
                            return deferred.promise;
                        }
                    };
                }
            ];
        }]);
})();
