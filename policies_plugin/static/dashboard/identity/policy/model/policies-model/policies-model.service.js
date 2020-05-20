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
(function () {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.model.policies-model')
        .factory('horizon.dashboard.identity.policy.model.policies-model', PoliciesModel);

    function PoliciesModel() {
        return {
            data: {
                allPolicies: [],
                filteredPolicies: [],
                visibleColumns: {
                    project:        true,
                    target:         true,
                    rule:           true,
                    defaultRule:    false,
                    scopes:         false,
                    operations:     false,
                    description:    true
                },
                searchColumns: {
                    project:        true,
                    target:         true,
                    rule:           true,
                    defaultRule:    true,
                    scopes:         true,
                    operations:     true,
                    description:    true
                },
                sortAscending: {
                    project:        true,
                    target:         true,
                    rule:           true,
                    defaultRule:    true,
                    scopes:         true,
                    operations:     true,
                    description:    true
                },
                sortColumn: 'target',
                itemsPerPage: 5,
                currentPage: 0,
                numberOfPages: 10,
                suggestionsVisible: true,
                rulerVisible: true
            },
            setAllPolicies: function(policies) {
                this.data.allPolicies = policies;
            },
            setFilteredPolicies: function(policies) {
                this.data.filteredPolicies = policies;
            },
            setVisibleColumns: function(columns) {
                this.data.visibleColumns.project        = columns.project;
                this.data.visibleColumns.target         = columns.target;
                this.data.visibleColumns.rule           = columns.rule;
                this.data.visibleColumns.defaultRule    = columns.defaultRule;
                this.data.visibleColumns.scopes         = columns.scopes;
                this.data.visibleColumns.operations     = columns.operations;
                this.data.visibleColumns.description    = columns.description;
            },
            setVisibleColumnProject: function(visible) {
                this.data.filteredPolicies.project = visible;
            },
            setVisibleColumnTarget: function(visible) {
                this.data.filteredPolicies.target = visible;
            },
            setVisibleColumnRule: function(visible) {
                this.data.filteredPolicies.rule = visible;
            },
            setVisibleColumnDefaultRule: function(visible) {
                this.data.filteredPolicies.defaultRule = visible;
            },
            setVisibleColumnScopes: function(visible) {
                this.data.filteredPolicies.scopes = visible;
            },
            setVisibleColumnOperations: function(visible) {
                this.data.filteredPolicies.operations = visible;
            },
            setVisibleColumnDescription: function(visible) {
                this.data.filteredPolicies.description = visible;
            },
            setSearchColumns: function(columns) {
                this.data.searchColumns.project        = columns.project;
                this.data.searchColumns.target         = columns.target;
                this.data.searchColumns.rule           = columns.rule;
                this.data.searchColumns.defaultRule    = columns.defaultRule;
                this.data.searchColumns.scopes         = columns.scopes;
                this.data.searchColumns.operations     = columns.operations;
                this.data.searchColumns.description    = columns.description;
            },
            setSearchColumnProject: function(searchable) {
                this.data.filteredPolicies.project = searchable;
            },
            setSearchColumnTarget: function(searchable) {
                this.data.filteredPolicies.target = searchable;
            },
            setSearchColumnRule: function(searchable) {
                this.data.filteredPolicies.rule = searchable;
            },
            setSearchColumnDefaultRule: function(searchable) {
                this.data.filteredPolicies.defaultRule = searchable;
            },
            setSearchColumnScopes: function(searchable) {
                this.data.filteredPolicies.scopes = searchable;
            },
            setSearchColumnOperations: function(searchable) {
                this.data.filteredPolicies.operations = searchable;
            },
            setSearchColumnDescription: function(searchable) {
                this.data.filteredPolicies.description = searchable;
            },
            setSortAscending: function(columns) {
                this.data.sortAscending.project        = columns.project;
                this.data.sortAscending.target         = columns.target;
                this.data.sortAscending.rule           = columns.rule;
                this.data.sortAscending.defaultRule    = columns.defaultRule;
                this.data.sortAscending.scopes         = columns.scopes;
                this.data.sortAscending.operations     = columns.operations;
                this.data.sortAscending.description    = columns.description;
            },
            toggleSortOrder: function(sort) {
                this.data.sortAscending[sort] = !this.data.sortAscending[sort];
            },
            setSortColumn: function(column) {
                this.data.sortColumn = column;
            },
            setItemsPerPage: function(itemsPerPage) {
                this.data.itemsPerPage = itemsPerPage;
            },
            setCurrentPage: function(currentPage) {
                this.data.currentPage = currentPage;
            },
            setNumberOfPages: function(numberOfPages) {
                this.data.numberOfPages = numberOfPages;
            },
            showSuggestions: function() {
                this.data.suggestionsVisible = true;
            },
            hideSuggestions: function() {
                this.data.suggestionsVisible = false;
            },
            showRuler: function() {
                this.data.rulerVisible = true;
            },
            hideRuler: function() {
                this.data.rulerVisible = false;
            }
        };
    };

})();
