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
        .module('horizon.dashboard.identity.policy.actions.storage')
        .provider('$actionsStorage', [
            function() {
                this.$get = [
                    'horizon.dashboard.identity.policy.model.policies-model',
                    '$q',
                    function(PoliciesModel, $q) {
                        return {

                            // Store the user configured list of visible
                            // columns in the user's browser local storage
                            storeVisibleColumns: function() {
                                let deferred = $q.defer();
                                deferred.notify("Storing visible columns in local storage");
                                let successful;
                                try {
                                    const columns = {
                                        'project':          PoliciesModel.data.visibleColumns.project,
                                        'target':           PoliciesModel.data.visibleColumns.target,
                                        'rule':             PoliciesModel.data.visibleColumns.rule,
                                        'defaultRule':      PoliciesModel.data.visibleColumns.defaultRule,
                                        'scopes':           PoliciesModel.data.visibleColumns.scopes,
                                        'operations':       PoliciesModel.data.visibleColumns.operations,
                                        'description':      PoliciesModel.data.visibleColumns.description
                                    };
                                    localStorage.setItem("visibleColumns", JSON.stringify(columns));
                                    deferred.resolve(successful);
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Restore the user configured list of visible
                            // columns from the user's browser local storage
                            restoreVisibleColumns: function() {
                                let deferred = $q.defer();
                                deferred.notify("Restoring visible columns from local storage");
                                let successful;
                                try {
                                    if (localStorage.getItem('visibleColumns') !== null) {
                                        const columns = JSON.parse(localStorage.getItem('visibleColumns'));
                                        PoliciesModel.setVisibleColumns(columns);
                                        deferred.resolve(successful);
                                    } else {
                                        const columns = {
                                            project:        true,
                                            target:         true,
                                            rule:           true,
                                            defaultRule:    false,
                                            scopes:         false,
                                            operations:     false,
                                            description:    true
                                        };
                                        try {
                                            localStorage.setItem("visibleColumns", JSON.stringify(columns));
                                            PoliciesModel.setVisibleColumns(columns);
                                            deferred.resolve(successful);
                                        } catch (err) {
                                            deferred.reject(err);
                                        };
                                    };
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Store the user configured list of searchable
                            // columns in the user's browser local storage
                            storeSearchColumns: function() {
                                let deferred = $q.defer();
                                deferred.notify("Storing search columns in local storage");
                                let successful;
                                try {
                                    const columns = {
                                        'project':          PoliciesModel.data.searchColumns.project,
                                        'target':           PoliciesModel.data.searchColumns.target,
                                        'rule':             PoliciesModel.data.searchColumns.rule,
                                        'defaultRule':      PoliciesModel.data.searchColumns.defaultRule,
                                        'scopes':           PoliciesModel.data.searchColumns.scopes,
                                        'operations':       PoliciesModel.data.searchColumns.operations,
                                        'description':      PoliciesModel.data.searchColumns.description
                                    };
                                    localStorage.setItem("searchColumns", JSON.stringify(columns));
                                    deferred.resolve(successful);
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Restore the user configured list of searchable
                            // columns from the user's browser local storage
                            restoreSearchColumns: function() {
                                let deferred = $q.defer();
                                deferred.notify("Restoring search columns from local storage");
                                let successful;
                                try {
                                    if (localStorage.getItem('searchColumns') !== null) {
                                        const columns = JSON.parse(localStorage.getItem('searchColumns'));
                                        PoliciesModel.setSearchColumns(columns);
                                        deferred.resolve(successful);
                                    } else {
                                        const columns = {
                                            project:        true,
                                            target:         true,
                                            rule:           true,
                                            defaultRule:    true,
                                            scopes:         true,
                                            operations:     true,
                                            description:    true
                                        };
                                        try {
                                            localStorage.setItem("searchColumns", JSON.stringify(columns));
                                            PoliciesModel.setSearchColumns(columns);
                                            deferred.resolve(successful);
                                        } catch (err) {
                                            deferred.reject(err);
                                        };
                                    };
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Store the user configured table column
                            // widths in the user's browser local storage
                            storeColumnWidths: function() {
                                let deferred = $q.defer();
                                deferred.notify("Storing column widths in local storage");
                                let successful;
                                try {
                                    const widths = {
                                        'project':          parseInt(document.querySelector('#project-column-header').style.width),
                                        'target':           parseInt(document.querySelector('#target-column-header').style.width),
                                        'rule':             parseInt(document.querySelector('#rule-column-header').style.width),
                                        'defaultRule':      parseInt(document.querySelector('#default-column-header').style.width),
                                        'scopes':           parseInt(document.querySelector('#scopes-column-header').style.width),
                                        'operations':       parseInt(document.querySelector('#operations-column-header').style.width),
                                        'description':      parseInt(document.querySelector('#description-column-header').style.width)
                                    };
                                    localStorage.setItem("columnWidths", JSON.stringify(widths));
                                    deferred.resolve(successful);
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Restore the user configured table column
                            // widths from the user's browser local storage
                            restoreColumnWidths: function() {
                                let deferred = $q.defer();
                                deferred.notify("Restoring column widths from local storage");
                                let successful;
                                try {
                                    if (localStorage.getItem('columnWidths') !== null) {
                                        const widths = JSON.parse(localStorage.getItem('columnWidths'));
                                        document.querySelector('#project-column-header').style.width =      widths['project'] + 'px';
                                        document.querySelector('#target-column-header').style.width =       widths['target'] + 'px';
                                        document.querySelector('#rule-column-header').style.width =         widths['rule'] + 'px';
                                        document.querySelector('#default-column-header').style.width =      widths['defaultRule'] + 'px';
                                        document.querySelector('#scopes-column-header').style.width =       widths['scopes'] + 'px';
                                        document.querySelector('#operations-column-header').style.width =   widths['operations'] + 'px';
                                        document.querySelector('#description-column-header').style.width =  widths['description'] + 'px';
                                        deferred.resolve(successful);
                                    } else {
                                        const widths = {
                                            project:        100,
                                            target:         200,
                                            rule:           200,
                                            defaultRule:    200,
                                            scopes:         100,
                                            operations:     150,
                                            description:    150
                                        };
                                        try {
                                            localStorage.setItem("columnWidths", JSON.stringify(widths));
                                            deferred.resolve(successful);
                                        } catch (err) {
                                            deferred.reject(err);
                                        };
                                    };
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Store the user configured items per page
                            // value from the user's browser local storage
                            storeItemsPerPage: function(itemsPerPage) {
                                let deferred = $q.defer();
                                deferred.notify("Storing items per page in local storage");
                                let successful;
                                try {
                                    PoliciesModel.setItemsPerPage(itemsPerPage);
                                    localStorage.setItem("itemsPerPage", itemsPerPage);
                                    deferred.resolve(successful);
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Restore the user configured items per page
                            // value from the user's browser local storage
                            restoreItemsPerPage: function() {
                                let deferred = $q.defer();
                                deferred.notify("Restoring items per page from local storage");
                                let successful;
                                try {
                                    if (localStorage.getItem('itemsPerPage') !== null) {
                                        PoliciesModel.setItemsPerPage(localStorage.getItem('itemsPerPage'));
                                        deferred.resolve(successful);
                                    } else {
                                        PoliciesModel.setItemsPerPage(20);
                                        localStorage.setItem("itemsPerPage", 20);
                                        deferred.resolve(successful);
                                    };
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Store the user configured editor ruler visibility
                            // configuration in the user's browser local storage
                            storeRulerVisible: function(visible) {
                                let deferred = $q.defer();
                                deferred.notify("Storing ruler visibility in local storage");
                                let successful;
                                try {
                                    if (visible) {
                                        PoliciesModel.showRuler();
                                    } else {
                                        PoliciesModel.hideRuler();
                                    };
                                    localStorage.setItem("rulerVisible", visible);
                                    deferred.resolve(successful);
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Restore the user configured editor ruler visibility
                            // configuration from the user's browser local storage
                            restoreRulerVisible: function() {
                                let deferred = $q.defer();
                                deferred.notify("Restoring ruler visibility from local storage");
                                let successful;
                                try {
                                    if (localStorage.getItem('rulerVisible') !== null) {
                                        const visible = localStorage.getItem('rulerVisible');
                                        if (visible == 'true') {
                                            PoliciesModel.showRuler();
                                        } else {
                                            PoliciesModel.hideRuler();
                                        };
                                        deferred.resolve(successful);
                                    } else {
                                        localStorage.setItem("rulerVisible", true);
                                        PoliciesModel.showRuler();
                                        deferred.resolve(successful);
                                    };
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Store the user configured editor autocomplete suggestions
                            // state configuration in the user's browser local storage
                            storeSuggestionsVisible: function(visible) {
                                let deferred = $q.defer();
                                deferred.notify("Storing suggestions visibility in local storage");
                                let successful;
                                try {
                                    if (visible) {
                                        PoliciesModel.showSuggestions();
                                    } else {
                                        PoliciesModel.hideSuggestions();
                                    };
                                    localStorage.setItem("suggestionsVisible", visible);
                                    deferred.resolve(successful);
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            },

                            // Restore the user configured editor autocomplete suggestions
                            // state configuration from the user's browser local storage
                            restoreSuggestionsVisible: function() {
                                let deferred = $q.defer();
                                deferred.notify("Restoring suggestions visibility from local storage");
                                let successful;
                                try {
                                    if (localStorage.getItem('suggestionsVisible') !== null) {
                                        const visible = localStorage.getItem('suggestionsVisible');
                                        if (visible == 'true') {
                                            PoliciesModel.showSuggestions();
                                        } else {
                                            PoliciesModel.hideSuggestions();
                                        };
                                        deferred.resolve(successful);
                                    } else {
                                        localStorage.setItem("suggestionsVisible", true);
                                        PoliciesModel.showSuggestions();
                                        deferred.resolve(successful);
                                    };
                                } catch (err) {
                                    deferred.reject(err);
                                };
                                return deferred.promise;
                            }
                        };
                    }
                ];
            }
        ]);

})();
