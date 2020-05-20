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
        .module('horizon.dashboard.identity.policy.actions.sort')
        .provider('$actionsSort', [
            function () {
                this.$get = [
                    'horizon.dashboard.identity.policy.model.policies-model',
                    '$q',
                    function (PoliciesModel, $q) {
                        // Table sort functions
                        function compare(a, b) {
                            if (typeof a !== 'undefined' && typeof b !== 'undefined') {
                                if (a.toLowerCase() < b.toLowerCase()) {
                                    return -1;
                                }
                                if (a.toLowerCase() > b.toLowerCase()) {
                                    return 1;
                                }
                                return 0;
                            } else if (typeof a !== 'undefined' && typeof b === 'undefined') {
                                return 1;
                            } else if (typeof a === 'undefined' && typeof b !== 'undefined') {
                                return -1;
                            } else {
                                return 0;
                            };
                        };

                        return {
                            sortPolicies: function(column) {
                                let deferred = $q.defer();
                                deferred.notify("Sorting policies");
                                let successful;
                                try {
                                    console.log('$actionsSort -> sortPolicies()');
                                    const sortColumn = PoliciesModel.data.sortColumn;
                                    if (sortColumn === column) {
                                        PoliciesModel.toggleSortOrder(column);
                                    };
                                    if (column === 'scopes' || column === 'operations') {
                                        for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                                            if (PoliciesModel.data.filteredPolicies[i][column].length >= 1) {
                                                PoliciesModel.data.filteredPolicies[i][column].sort(function(a, b) {
                                                    if (!PoliciesModel.data.sortAscending[column]) {
                                                        return compare(a, b);
                                                    } else {
                                                        return compare(b, a);
                                                    };
                                                });
                                            }
                                        };
                                        PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                                            if (!PoliciesModel.data.sortAscending[column]) {
                                                return compare(a[column][0], b[column][0]);
                                            } else {
                                                return compare(b[column][0], a[column][0]);
                                            };
                                        });
                                    } else {
                                        PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                                            if (!PoliciesModel.data.sortAscending[column]) {
                                                return a[column].localeCompare(b[column]);
                                            } else {
                                                return b[column].localeCompare(a[column]);
                                            };
                                        });
                                    };
                                    PoliciesModel.setSortColumn(column);
                                    deferred.resolve(successful);
                                } catch (err) {
                                    deferred.reject(err);
                                }
                                return deferred.promise;
                            },
                            sortPoliciesNoReorder: function(column) {
                                let deferred = $q.defer();
                                deferred.notify("Sorting policies");
                                let successful;
                                try {
                                    console.log('$actionsSort -> sortPolicies()');
                                    if (column === 'scopes' || column === 'operations') {
                                        for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                                            if (PoliciesModel.data.filteredPolicies[i][column].length >= 1) {
                                                PoliciesModel.data.filteredPolicies[i][column].sort(function(a, b) {
                                                    if (!PoliciesModel.data.sortAscending[column]) {
                                                        return compare(a, b);
                                                    } else {
                                                        return compare(b, a);
                                                    };
                                                });
                                            }
                                        };
                                        PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                                            if (!PoliciesModel.data.sortAscending[column]) {
                                                return compare(a[column][0], b[column][0]);
                                            } else {
                                                return compare(b[column][0], a[column][0]);
                                            };
                                        });
                                    } else {
                                        PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                                            if (!PoliciesModel.data.sortAscending[column]) {
                                                return a[column].localeCompare(b[column]);
                                            } else {
                                                return b[column].localeCompare(a[column]);
                                            };
                                        });
                                    };
                                    PoliciesModel.setSortColumn(column);
                                    deferred.resolve(successful);
                                } catch (err) {
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
