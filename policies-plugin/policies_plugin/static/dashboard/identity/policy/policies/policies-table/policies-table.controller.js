(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.policies-table')
        .controller('TableController', TableController);

    TableController.$inject = [
        '$scope',
        '$uibModal',
        'horizon.dashboard.identity.policy.policies',
        'horizon.dashboard.identity.policy.api',
    ];

    function TableController($scope, $uibModal, Policies, Api) {
        var $ctrl = this;
        $scope.policies = Policies.policies;
        $scope.showEditorModal = false;
        $scope.selectedPolicies = {
            policies: []
        };

        // Table sort scopes
        $scope.column = 'target';
        $scope.reverse = false;
        // Table display scopes
        $scope.expandAll = false;
        // Table item modal scopes
        $scope.showEditorModal = false;
        // Table selected policies scopes
        $scope.visibleCols;
        $scope.colWidths;
        $scope.visibleColumns = {
            project:        true,
            target:         true,
            rule:           true,
            defaultRule:    true,
            scopes:         true,
            operations:     true,
            description:    true
        };

        init();

        // Functions to run on page load
        function init() {
            Api.getRules().success(getRulesSuccess);
        }

        function getRulesSuccess(response) {
            let res = response;
            res.forEach(function(policy) {
                policy.selected=false;
                policy.expanded=false;
            });
            Policies.setAllPolicies(res);
            Policies.setFilteredPolicies(res);
            Policies.setCurrentPage(0);
            Policies.setItemsPerPage(20);
            Policies.setNumberOfPages(Math.ceil(Policies.policies.filteredPolicies.length/Policies.policies.itemsPerPage));
        }

        $scope.itemsPerPageChanged = function(itemsPerPage) {
            Policies.setCurrentPage(0);
            Policies.setItemsPerPage(itemsPerPage);
            Policies.setNumberOfPages(Math.ceil(Policies.policies.filteredPolicies.length/Policies.policies.itemsPerPage));
        }

        // Table sort functions
        $scope.sortColumn = function(col) {
            $scope.column = col;
            if($scope.reverse) {
                $scope.reverse = false;
            } else {
                $scope.reverse = true;
            }
        };

        $scope.selectedPoliciesChanged=function() {
            $scope.selectedPolicies.policies.length > 0 ? $scope.showEditorModal = true : $scope.showEditorModal = false;
        }

        // Details modal
        $scope.OpenDetailsModal = function(policy){
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                templateUrl:            'static/dashboard/identity/policy/policies/policies-details/policies-details.html',
                controller:             'DetailsController',
                controllerAs:           '$ctrl',
                resolve: {
                    $policy: function () {
                        return policy;
                    }
                }
            });
            modalInstance.result.then(function (policy) {
                $scope.setRule(policy);
            });
        }

        // Editor modal
        $scope.openEditorModal = function(){
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                templateUrl:            'static/dashboard/identity/policy/policies/policies-editor/policies-editor.html',
                controller:             'EditorController',
                controllerAs:           '$ctrl',
                resolve: {
                    $policy: function () {
                        return $scope.selectedPolicies.policies;
                    }
                }
            });

            modalInstance.result.then(function (rules) {
                setRules(rules);
            });
        }

        // Info modal
        $scope.openInfoModal = function(){
            let modalInstance =     $uibModal.open({
                ariaLabelledBy:     'modal-title',
                ariaDescribedBy:    'modal-body',
                templateUrl:        'static/dashboard/identity/policy/policies/info/info.html',
                controller:         'InfoController',
                controllerAs:       '$ctrl'
            });

            modalInstance.result.then(function () {});
        }
    }

})();
