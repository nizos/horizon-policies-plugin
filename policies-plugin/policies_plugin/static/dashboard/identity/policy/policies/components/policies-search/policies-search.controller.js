(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-search')
        .controller('SearchController', SearchController);

    SearchController.$inject = [
        'horizon.dashboard.identity.policy.model.policies-model',
        '$actionsReload',
        '$scope'
    ];

    function SearchController(PoliciesModel, $actionsReload, $scope) {
        var $ctrl = this;
        $scope.policies = PoliciesModel.data;
        $scope.query;
        $scope.showOptions = false;
        $scope.searchProject = true;
        $scope.searchTarget = true;
        $scope.searchRule = true;
        $scope.searchDefault = true;
        $scope.searchScopes = true;
        $scope.searchOperations = true;
        $scope.searchDescription = true;

        // Watch for changes in search bar input
        $scope.$watch('query', function(newValue, oldValue) {
            if(oldValue!=newValue) {
                filterPolicies();
            }
        },true);

        // Watch for changes in policies data
        $scope.$watch('policies.allPolicies', function(newValue, oldValue) {
            if(oldValue!=newValue) {
                filterPolicies();
            }
        },true);

        // Rerun search filter after search option changed
        $scope.searchOptionsChanged = function() {
            filterPolicies();
        }

        // Reload all policies
        $scope.reloadPolicies = function() {
            $actionsReload.reloadPolicies();
        }

        // Filter policies according to user input and chosen options
        function filterPolicies() {
            // Check if search bar input field is empty
            if (!$scope.query || $scope.query == '' || $scope.query == undefined) {
                // Include all policies in the filtered policies list
                PoliciesModel.setFilteredPolicies(PoliciesModel.data.allPolicies);
                // Update the current page and number
                // of pages for the table and pagination
                PoliciesModel.setCurrentPage(0);
                PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
            } else {
                let filtered = [];
                // Loop through all the policies in the all policies list of policies
                for (let i = 0; i < PoliciesModel.data.allPolicies.length; i++) {
                    // convert to lower case for case insensitive searching effect
                    const query = $scope.query.toLowerCase();
                    let policy = PoliciesModel.data.allPolicies[i];
                    let added = false;

                    // Search for user input in policies Project parameter
                    // if search in Project checkbox is checked
                    if ($scope.searchProject) {
                        if (policy['project'].toLowerCase().indexOf(query) != -1) {
                            // Add the policy to the filtered policies list
                            // and proceed to the next policy in the loop
                            filtered.push(policy);
                            // Skip searching in the remaining policy parameters
                            // and proceed to the next policy in the loop
                            added = true;
                        }
                    }
                    // Search for user input in policies Target parameter
                    // if search in Target checkbox is checked
                    if ($scope.searchTarget && !added) {
                        if (policy['target'].toLowerCase().indexOf(query) != -1) {
                            // Add the policy to the filtered policies list
                            // and proceed to the next policy in the loop
                            filtered.push(policy);
                            // Skip searching in the remaining policy parameters
                            // and proceed to the next policy in the loop
                            added = true;
                        }
                    }
                    // Search for user input in policies Rule parameter
                    // if search in Rule checkbox is checked
                    if ($scope.searchRule && !added) {
                        if (policy['rule'].toLowerCase().indexOf(query) != -1) {
                            // Add the policy to the filtered policies list
                            // and proceed to the next policy in the loop
                            filtered.push(policy);
                            // Skip searching in the remaining policy parameters
                            // and proceed to the next policy in the loop
                            added = true;
                        }
                    }
                    // Search for user input in policies Default parameter
                    // if search in Default checkbox is checked
                    if ($scope.searchDefault && !added) {
                        if (policy['default'].toLowerCase().indexOf(query) != -1) {
                            // Add the policy to the filtered policies list
                            // and proceed to the next policy in the loop
                            filtered.push(policy);
                            // Skip searching in the remaining policy parameters
                            // and proceed to the next policy in the loop
                            added = true;
                        }
                    }
                    // Search for user input in policies Scopes parameter
                    // if search in Scopes checkbox is checked
                    if ($scope.searchScopes && !added) {
                        // Loop through all the scopes in the policy
                        for (let i = 0; i < policy['scopes'].length; i++) {
                            // Check if the current scope contains the search query and that the policy
                            // hasn't already been added to the filtered policies list
                            if (policy['scopes'][i].toLowerCase().indexOf(query) != -1 && !added) {
                                // Add the policy to the filtered policies list
                                filtered.push(policy);
                                // Skip searching in the remaining policy scopes and other
                                // parameters and proceed to the next policy in the loop
                                added = true;
                            }
                        }
                    }
                    // Search for user input in policies Operations parameter
                    // if search in Operations checkbox is checked
                    if ($scope.searchOperations && !added) {
                        // Loop through all the operations in the policy
                        for (let i = 0; i < policy['operations'].length; i++) {
                            if (policy['operations'][i].toLowerCase().indexOf(query) != -1 && !added) {
                                // Add the policy to the filtered policies list
                                // and proceed to the next policy in the loop
                                filtered.push(policy);
                                // Skip searching in the remaining policy operation and other
                                // parameters and proceed to the next policy in the loop
                                added = true;
                            }
                        }
                    }
                    // Search for user input in policies Description parameter
                    // if search in Description checkbox is checked
                    if ($scope.searchDescription && !added) {
                        if (policy['description'].toLowerCase().indexOf(query) != -1) {
                            // Add the policy to the filtered policies list
                            // and proceed to the next policy in the loop
                            filtered.push(policy);
                            // Skip searching in the remaining policy parameters
                            // and proceed to the next policy in the loop
                            added = true;
                        }
                    }
                }
                // Set the list of matched policies as the filtered
                // policies list in the policies data provider
                PoliciesModel.setFilteredPolicies(filtered);
                // Update the current page and number
                // of pages for the table and pagination
                PoliciesModel.setCurrentPage(0);
                PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
            }
        }
    }

})();
