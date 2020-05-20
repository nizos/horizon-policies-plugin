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
        .provider('$actionsPrint', [
            function() {
                this.$get = [
                    'horizon.framework.widgets.toast.service',
                    '$q',
                    '$window',
                    function(toastService, $q, $window) {
                        const body = document.getElementsByTagName("BODY")[0];
                        return {

                            // Instantiate a print dialog for a document containing parameter passed string
                            printContents: function(contents) {
                                let deferred = $q.defer();
                                deferred.notify("Printing contents");
                                try {
                                    // Create a dynamic IFRAME
                                    const frame1 = document.createElement("IFRAME");
                                    frame1.name = "frame1";
                                    frame1.setAttribute("style", "position:absolute;top:-1000000px");
                                    body.appendChild(frame1);

                                    // Create a Frame Document
                                    const frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
                                    frameDoc.document.open();
                                    // Create a new HTML document
                                    frameDoc.document.write('<html><head><title>Policies</title>');
                                    frameDoc.document.write('</head><body>');
                                    // Append the DIV contents
                                    frameDoc.document.write(contents);
                                    frameDoc.document.write('</body></html>');
                                    frameDoc.document.close();
                                    $window.setTimeout(function () {
                                        $window.frames["frame1"].focus();
                                        const successful = $window.frames["frame1"].print();
                                        body.removeChild(frame1);
                                        if (!successful) {
                                            throw successful;
                                        } else {
                                            deferred.resolve(successful);
                                        };
                                    }, 500);
                                } catch (err) {
                                    deferred.reject(err);
                                    toastService.add('error', gettext('Could not print document!'));
                                };
                                return deferred.promise;
                            },

                            // Instantiate a print dialog for a document containing parameter passed policy
                            printPolicy: function(policy) {
                                let deferred = $q.defer();
                                deferred.notify("Printing policy");
                                try {
                                    // Create a dynamic IFRAME
                                    const frame1 = document.createElement("IFRAME");
                                    frame1.name = "frame1";
                                    frame1.setAttribute("style", "position:absolute;top:-1000000px");
                                    body.appendChild(frame1);

                                    // Create a Frame Document
                                    const frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
                                    frameDoc.document.open();
                                    // Create a new HTML document
                                    frameDoc.document.write('<html><head><title>Policies</title>');
                                    frameDoc.document.write('</head><body>');

                                    // Get the policy contents
                                    let contents = '{' + '\n' + '    ';
                                    if (policy.project != 'global') {
                                        contents += '"' + policy.project + ':' + policy.target + '": "' + policy.rule + '"' + '\n' + '}';
                                    } else {
                                        contents += '"' + policy.target + '": "' + policy.rule + '"' + '\n' + '}';
                                    };
                                    // Append the DIV contents
                                    frameDoc.document.write(contents);
                                    frameDoc.document.write('</body></html>');
                                    frameDoc.document.close();
                                    $window.setTimeout(function () {
                                        $window.frames["frame1"].focus();
                                        let successful = $window.frames["frame1"].print();
                                        body.removeChild(frame1);
                                        if (!successful) {
                                            throw successful;
                                        } else {
                                            toastService.add('success', gettext('Policy print document created'));
                                            deferred.resolve(successful);
                                        };
                                    }, 500);
                                } catch (err) {
                                    deferred.reject(err);
                                    toastService.add('error', gettext('Could not create policy print document!'));
                                };
                                return deferred.promise;
                            },

                            // Instantiate a print dialog for a document containing parameter passed list of policies
                            printPolicies: function(policies) {
                                let deferred = $q.defer();
                                deferred.notify("Printing policies");
                                try {
                                    // Create a dynamic IFRAME
                                    const frame1 = document.createElement("IFRAME");
                                    frame1.name = "frame1";
                                    frame1.setAttribute("style", "position:absolute;top:-1000000px");
                                    body.appendChild(frame1);

                                    // Create a Frame Document
                                    const frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
                                    frameDoc.document.open();
                                    // Create a new HTML document
                                    frameDoc.document.write('<html><head><title>Policies</title>');
                                    frameDoc.document.write('</head><body>');

                                    // Get the policies contents
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

                                    // Append the DIV contents
                                    frameDoc.document.write(contents);
                                    frameDoc.document.write('</body></html>');
                                    frameDoc.document.close();
                                    $window.setTimeout(function () {
                                        $window.frames["frame1"].focus();
                                        const successful = $window.frames["frame1"].print();
                                        body.removeChild(frame1);
                                        if (!successful) {
                                            throw successful;
                                        } else {
                                            toastService.add('success', gettext('Policies print document created'));
                                            deferred.resolve(successful);
                                        };
                                    }, 500);
                                } catch (err) {
                                    deferred.reject(err);
                                    toastService.add('error', gettext('Could not print document!'));
                                };
                                return deferred.promise;
                            }
                        };
                    }
                ];
            }
        ]);

})();
