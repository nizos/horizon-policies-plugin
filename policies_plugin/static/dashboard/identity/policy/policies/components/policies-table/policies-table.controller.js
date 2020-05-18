(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-table')
        .controller('TableController', TableController);

    TableController.$inject = [
        '$scope',
        '$uibModal',
        'horizon.dashboard.identity.policy.model.policies-model',
        'horizon.dashboard.identity.policy.api',
        '$actionsReload',
        '$actionsCopy',
        '$actionsDownload',
        '$actionsPrint',
    ];

    function TableController($scope, $uibModal, PoliciesModel, Api, $actionsReload, $actionsCopy, $actionsDownload, $actionsPrint) {
        var $ctrl = this;
        $scope.policies = PoliciesModel.data;
        $scope.actionsBarVisible = false;
        $scope.expandAll = false;
        $scope.selectAll = false;
        $scope.selectedPolicies = [];

        // Table sort scopes
        $scope.sortColumn = 'target';
        $scope.sortReverse = true;
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
        $scope.menuOptions = [
            ['Toggle expand', function ($itemScope) {
                toggleExpand($itemScope.policy);
            }],
            null,
            ['Toggle select', function ($itemScope) {
                $scope.selectPolicy($itemScope.policy);
            }],
            null,
            ['Edit', function ($itemScope) {
                $scope.OpenDetailsModal($itemScope.policy);
            }],
            null,
            ['More...', [
                ['Copy', function ($itemScope) {
                    $actionsCopy.copyPolicy($itemScope.policy);
                }],
                ['Print', function ($itemScope) {
                    $actionsPrint.printPolicy($itemScope.policy);
                }],
                ['Download', function ($itemScope) {
                    $actionsDownload.downloadPolicy($itemScope.policy);
                }],
                ['Edit using form', function ($itemScope) {
                    $scope.OpenDetailsModal($itemScope.policy);
                }],
                ['Edit using editor', function ($itemScope) {
                    openInEditor($itemScope.policy);
                }],
                ['Reset to default', function ($itemScope) {

                }]
            ]]
        ];

        init();

        // Functions to run on page load
        function init() {
            $actionsReload.loadPolicies().then(function() {
                $scope.sortPolicies($scope.sortColumn);
            });
        };

        $scope.setRule = function(rule) {
            Api.setRule(rule).success(updateRules);
        };

        function setRules(rules) {
            Api.setRules(rules).success(updateRules);
        };

        // Table getters
        function getTablePageStart() {
            return ((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage)-PoliciesModel.data.itemsPerPage;
        };

        function getTablePageEnd() {
            return Math.min(((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage), PoliciesModel.data.filteredPolicies.length);
        };

        // Table updaters
        $scope.itemsPerPageChanged = function(itemsPerPage) {
            PoliciesModel.setCurrentPage(0);
            PoliciesModel.setItemsPerPage(itemsPerPage);
            PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
        };

        function updateSelected() {
            $scope.selectedPolicies.splice(0, $scope.selectedPolicies.length);
            PoliciesModel.data.filteredPolicies.forEach(function(policy) {
                if (policy.selected == true) {
                    $scope.selectedPolicies.push(policy);
                };
            });
            if ($scope.actionsBarVisible && $scope.selectedPolicies.length <= 0) {
                selectionsChanged();
            } else if (!$scope.actionsBarVisible && $scope.selectedPolicies.length > 0) {
                selectionsChanged();
            };
        };

        function selectionsChanged() {
            // Show the policy actions toolbar if any policies are selected
            $scope.selectedPolicies.length > 0 ? $scope.actionsBarVisible = true : $scope.actionsBarVisible = false;
        };

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

        $scope.sortPolicies = function(column) {
            if ($scope.sortColumn == column) {
                $scope.sortReverse =! $scope.sortReverse;
            };
            if (!$scope.sortReverse) {
                if (column == 'scopes' || column == 'operations') {
                    for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                        if (PoliciesModel.data.filteredPolicies[i][column].length >= 1) {
                            PoliciesModel.data.filteredPolicies[i][column].sort(function(a, b) {
                                return compare(a, b);
                            });
                        }
                    };
                    PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                        return compare(a[column][0], b[column][0]);
                    });
                } else {
                    PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                        return a[column].localeCompare(b[column]);
                    });
                };
            } else {
                if (column == 'scopes' || column == 'operations') {
                    for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                        if (PoliciesModel.data.filteredPolicies[i][column].length >= 1) {
                            PoliciesModel.data.filteredPolicies[i][column].sort(function(a, b) {
                                return compare(b, a);
                            });
                        };
                    };
                    PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                        return compare(b[column][0], a[column][0]);
                    });
                } else {
                    PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                        return b[column].localeCompare(a[column]);
                    });
                };
            };
            $scope.sortColumn = column;
        };

        // Table expand functions
        function toggleExpand(policy) {
            policy.expanded =! policy.expanded;
        };

        $scope.toggleExpandAll = function() {
            $scope.expandAll = !$scope.expandAll;
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            // Loop through the policies shown in the table
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].expanded = $scope.expandAll;
            };
        };

        // Table select functions
        $scope.toggleSelect = function() {
            updateSelected();
        };

        $scope.selectPolicy = function(policy) {
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = 0; rangeStart < rangeEnd; i++) {
                let filteredPolicy = PoliciesModel.data.filteredPolicies[i];
                if (filteredPolicy.target == policy.target) {
                    if (filteredPolicy.rule == policy.rule) {
                        PoliciesModel.data.filteredPolicies[i].selected =! PoliciesModel.data.filteredPolicies[i].selected;
                        break;
                    };
                };
            };
            updateSelected();
        };

        // Policy select all functions
        $scope.toggleSelectAll = function() {
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = $scope.selectAll;
            };
            updateSelected();
        };

        $scope.clearAllSelected = function() {
            for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = false;
            };
            updateSelected();
        };

        // Download policy as file context menu action
        $scope.downloadSelected = function() {
            $actionsDownload.downloadPolicies($scope.selectedPolicies);
        };

        // Editor functions
        function openInEditor(policy) {
            $scope.clearAllSelected();
            $scope.selectPolicy(policy);
            $scope.openEditorModal();
        };

        // Details modal
        $scope.OpenDetailsModal = function(policy){
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                templateUrl:            'static/dashboard/identity/policy/policies/components/policies-details/policies-details.html',
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
        };

        // Editor modal
        $scope.openEditorModal = function(){
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                templateUrl:            'static/dashboard/identity/policy/policies/components/policies-editor/policies-editor.html',
                controller:             'EditorController',
                controllerAs:           '$ctrl',
                resolve: {
                    $policy: function () {
                        return $scope.selectedPolicies;
                    }
                }
            });

            modalInstance.result.then(function (rules) {
                setRules(rules);
                $scope.clearAllSelected();
            });
        };
    };

})();
