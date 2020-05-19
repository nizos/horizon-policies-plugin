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
        .module('horizon.dashboard.identity.policy.actions.filter')
        .provider('$actionsFilter', [
            function () {
                this.$get = [
                    'horizon.dashboard.identity.policy.model.policies-model',
                    '$q',
                    function (PoliciesModel, $q) {
                        return {
                            filterPolicies: function(query) {
                                let deferred = $q.defer();
                                deferred.notify("Filtering policies");
                                let successful;
                                try {
                                    console.log('$actionsFilter -> filterPolicies()');
                                    if (!query || query === '' || query === undefined) {
                                        // Include all policies in the filtered policies list
                                        PoliciesModel.setFilteredPolicies(PoliciesModel.data.allPolicies);
                                        // Update the current page and number
                                        // of pages for the table and pagination
                                        PoliciesModel.setCurrentPage(0);
                                        PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
                                        deferred.resolve(successful);
                                    } else {
                                        let filtered = [];
                                        // Loop through all the policies in the all policies list of policies
                                        for (let i = 0; i < PoliciesModel.data.allPolicies.length; i++) {
                                            // convert to lower case for case insensitive searching effect
                                            const queryLC = query.toLowerCase();
                                            let policy = PoliciesModel.data.allPolicies[i];
                                            let added = false;

                                            // Search for user input in policies Project parameter
                                            // if search in Project checkbox is checked
                                            if (PoliciesModel.data.searchColumns.project) {
                                                if (policy['project'].toLowerCase().indexOf(queryLC) !== -1) {
                                                    // Add the policy to the filtered policies list
                                                    // and proceed to the next policy in the loop
                                                    filtered.push(policy);
                                                    // Skip searching in the remaining policy parameters
                                                    // and proceed to the next policy in the loop
                                                    added = true;
                                                };
                                            };
                                            // Search for user input in policies Target parameter
                                            // if search in Target checkbox is checked
                                            if (PoliciesModel.data.searchColumns.target && !added) {
                                                if (policy['target'].toLowerCase().indexOf(queryLC) !== -1) {
                                                    // Add the policy to the filtered policies list
                                                    // and proceed to the next policy in the loop
                                                    filtered.push(policy);
                                                    // Skip searching in the remaining policy parameters
                                                    // and proceed to the next policy in the loop
                                                    added = true;
                                                };
                                            };
                                            // Search for user input in policies Rule parameter
                                            // if search in Rule checkbox is checked
                                            if (PoliciesModel.data.searchColumns.rule && !added) {
                                                if (policy['rule'].toLowerCase().indexOf(queryLC) !== -1) {
                                                    // Add the policy to the filtered policies list
                                                    // and proceed to the next policy in the loop
                                                    filtered.push(policy);
                                                    // Skip searching in the remaining policy parameters
                                                    // and proceed to the next policy in the loop
                                                    added = true;
                                                };
                                            };
                                            // Search for user input in policies Default parameter
                                            // if search in Default checkbox is checked
                                            if (PoliciesModel.data.searchColumns.defaultRule && !added) {
                                                if (policy['defaultRule'].toLowerCase().indexOf(queryLC) !== -1) {
                                                    // Add the policy to the filtered policies list
                                                    // and proceed to the next policy in the loop
                                                    filtered.push(policy);
                                                    // Skip searching in the remaining policy parameters
                                                    // and proceed to the next policy in the loop
                                                    added = true;
                                                };
                                            };
                                            // Search for user input in policies Scopes parameter
                                            // if search in Scopes checkbox is checked
                                            if (PoliciesModel.data.searchColumns.scopes && !added) {
                                                // Loop through all the scopes in the policy
                                                for (let j = 0; j < policy['scopes'].length; j++) {
                                                    // Check if the current scope contains the search query and that the policy
                                                    // hasn't already been added to the filtered policies list
                                                    if (policy['scopes'][j].toLowerCase().indexOf(queryLC) !== -1 && !added) {
                                                        // Add the policy to the filtered policies list
                                                        filtered.push(policy);
                                                        // Skip searching in the remaining policy scopes and other
                                                        // parameters and proceed to the next policy in the loop
                                                        added = true;
                                                    };
                                                };
                                            };
                                            // Search for user input in policies Operations parameter
                                            // if search in Operations checkbox is checked
                                            if (PoliciesModel.data.searchColumns.operations && !added) {
                                                // Loop through all the operations in the policy
                                                for (let j = 0; j < policy['operations'].length; j++) {
                                                    if (policy['operations'][j].toLowerCase().indexOf(queryLC) !== -1 && !added) {
                                                        // Add the policy to the filtered policies list
                                                        // and proceed to the next policy in the loop
                                                        filtered.push(policy);
                                                        // Skip searching in the remaining policy operation and other
                                                        // parameters and proceed to the next policy in the loop
                                                        added = true;
                                                    };
                                                };
                                            };
                                            // Search for user input in policies Description parameter
                                            // if search in Description checkbox is checked
                                            if (PoliciesModel.data.searchColumns.description && !added) {
                                                if (policy['description'].toLowerCase().indexOf(queryLC) !== -1) {
                                                    // Add the policy to the filtered policies list
                                                    // and proceed to the next policy in the loop
                                                    filtered.push(policy);
                                                    // Skip searching in the remaining policy parameters
                                                    // and proceed to the next policy in the loop
                                                    added = true;
                                                };
                                            };
                                        };
                                        // Set the list of matched policies as the filtered
                                        // policies list in the policies data provider
                                        PoliciesModel.setFilteredPolicies(filtered);
                                        // Update the current page and number
                                        // of pages for the table and pagination
                                        PoliciesModel.setCurrentPage(0);
                                        PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
                                        deferred.resolve(successful);
                                    };
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
