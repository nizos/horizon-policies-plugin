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
        .module('horizon.dashboard.identity.policy.model.checklist-model')
        .directive('checklistModel', [
            '$parse',
            '$compile',
            function ($parse, $compile) {
                // contains
                function contains(arr, item, comparator) {
                    if (angular.isArray(arr)) {
                        for (let i = arr.length; i--;) {
                            if (comparator(arr[i], item)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                // add
                function add(arr, item, comparator) {
                    arr = angular.isArray(arr) ? arr : [];
                    if (!contains(arr, item, comparator)) {
                        arr.push(item);
                    }
                    return arr;
                }

                // remove
                function remove(arr, item, comparator) {
                    if (angular.isArray(arr)) {
                        for (let i = arr.length; i--;) {
                            if (comparator(arr[i], item)) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    return arr;
                }

                // http://stackoverflow.com/a/19228302/1458162
                function postLinkFn(scope, elem, attrs) {
                    // exclude recursion, but still keep the model
                    let checklistModel = attrs.checklistModel;
                    attrs.$set("checklistModel", null);
                    // compile with `ng-model` pointing to `checked`
                    $compile(elem)(scope);
                    attrs.$set("checklistModel", checklistModel);

                    // getter for original model
                    let checklistModelGetter = $parse(checklistModel);
                    let checklistChange = $parse(attrs.checklistChange);
                    let checklistBeforeChange = $parse(attrs.checklistBeforeChange);
                    let ngModelGetter = $parse(attrs.ngModel);



                    const comparator = function (a, b) {
                        if (!isNaN(a) && !isNaN(b)) {
                            return String(a) === String(b);
                        } else {
                            return angular.equals(a, b);
                        }
                    };

                    if (attrs.hasOwnProperty('checklistComparator')) {
                        if (attrs.checklistComparator[0] == '.') {
                            let comparatorExpression = attrs.checklistComparator.substring(1);
                            comparator = function (a, b) {
                                return a[comparatorExpression] === b[comparatorExpression];
                            };

                        } else {
                            comparator = $parse(attrs.checklistComparator)(scope.$parent);
                        }
                    }

                    // watch UI checked change
                    const unbindModel = scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }

                        if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                            ngModelGetter.assign(scope, contains(checklistModelGetter(scope.$parent), getChecklistValue(), comparator));
                            return;
                        }

                        setValueInChecklistModel(getChecklistValue(), newValue);

                        if (checklistChange) {
                            checklistChange(scope);
                        }
                    });

                    // watches for value change of checklistValue
                    const unbindCheckListValue = scope.$watch(getChecklistValue, function (newValue, oldValue) {
                        if (newValue != oldValue && angular.isDefined(oldValue) && scope[attrs.ngModel] === true) {
                            let current = checklistModelGetter(scope.$parent);
                            checklistModelGetter.assign(scope.$parent, remove(current, oldValue, comparator));
                            checklistModelGetter.assign(scope.$parent, add(current, newValue, comparator));
                        }
                    }, true);

                    let unbindDestroy = scope.$on('$destroy', destroy);

                    function destroy() {
                        unbindModel();
                        unbindCheckListValue();
                        unbindDestroy();
                    }

                    function getChecklistValue() {
                        return attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;
                    }

                    function setValueInChecklistModel(value, checked) {
                        let current = checklistModelGetter(scope.$parent);
                        if (angular.isFunction(checklistModelGetter.assign)) {
                            if (checked === true) {
                                checklistModelGetter.assign(scope.$parent, add(current, value, comparator));
                            } else {
                                checklistModelGetter.assign(scope.$parent, remove(current, value, comparator));
                            }
                        }

                    }

                    // declare one function to be used for both $watch functions
                    function setChecked(newArr, oldArr) {
                        if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                            setValueInChecklistModel(getChecklistValue(), ngModelGetter(scope));
                            return;
                        }
                        ngModelGetter.assign(scope, contains(newArr, getChecklistValue(), comparator));
                    }

                    // watch original model change
                    // use the faster $watchCollection method if it's available
                    if (angular.isFunction(scope.$parent.$watchCollection)) {
                        scope.$parent.$watchCollection(checklistModel, setChecked);
                    } else {
                        scope.$parent.$watch(checklistModel, setChecked, true);
                    }
                }

                return {
                    restrict: 'A',
                    priority: 1000,
                    terminal: true,
                    scope: true,
                    compile: function (tElement, tAttrs) {

                        if (!tAttrs.checklistValue && !tAttrs.value) {
                            throw 'You should provide `value` or `checklist-value`.';
                        }

                        // by default ngModel is 'checked', so we set it if not specified
                        if (!tAttrs.ngModel) {
                            // local scope storing individual checkbox model
                            tAttrs.$set("ngModel", "checked");
                        }

                        return postLinkFn;
                    }
                };
            }
        ])

})();
