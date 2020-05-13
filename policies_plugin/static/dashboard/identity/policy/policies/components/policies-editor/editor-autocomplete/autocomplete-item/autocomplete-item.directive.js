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
        .module('horizon.dashboard.identity.policy.policies.components.policies-editor.editor-autocomplete.autocomplete-item')
        .directive('autocompleteItem',
            function () {
                return {
                    restrict: 'A',
                    require: [
                        '^editorAutocomplete',
                        'ngModel'
                    ],
                    scope: {
                        'autocompleteItem': '&'
                    },
                    link: function (scope, element, attrs, required) {
                        // Prevent html5/browser auto completion.
                        attrs.$set('autocomplete', 'off');

                        let acContainer = required[0];
                        let ngModel = required[1];

                        element.bind('focus', function () {
                            let options = scope.autocompleteItem();
                            if (!options) {
                                throw new Error('Invalid options');
                            }
                            acContainer.attach(ngModel, element, options);
                        });
                    }
                }
            }
        )

})();
