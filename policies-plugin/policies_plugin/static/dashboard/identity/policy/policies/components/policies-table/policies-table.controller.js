(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-table')
        .controller('TableController', TableController);

    TableController.$inject = [
        '$scope',
        '$uibModal',
        'horizon.dashboard.identity.policy.model.policies-model',
        'horizon.framework.widgets.toast.service',
        'horizon.dashboard.identity.policy.api',
        '$actionsCopy',
        '$actionsDownload',
        '$actionsPrint',
    ];

    function TableController($scope, $uibModal, PoliciesModel, toastService, Api, $actionsCopy, $actionsDownload, $actionsPrint) {
        var $ctrl = this;
        $scope.policies = PoliciesModel.data;
        $scope.showEditorModal = false;
        $scope.selectAllCheckBox = false;
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
        $scope.menuOptions = [
            ['Toggle expand', function ($itemScope) {
                toggleExpand($itemScope.policy);
            }],
            null,
            ['Toggle select', function ($itemScope) {
                toggleSelect($itemScope.policy);
            }],
            null,
            ['Edit', function ($itemScope) {
                $scope.OpenDetailsModal($itemScope.policy);
            }],
            null,
            ['More...', [
                ['Copy', function ($itemScope) {
                    copy($itemScope.policy);
                }],
                ['Print', function ($itemScope) {
                    print($itemScope.policy);
                }],
                ['Download', function ($itemScope) {
                    download($itemScope.policy);
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
            updateRules();
        }

        function updateRules() {
            Api.getRules().success(updateView);
        }

        function updateView(response) {
            response.forEach(function(policy) {
                policy.expanded=false;
            });
            PoliciesModel.setAllPolicies(response);
            PoliciesModel.setFilteredPolicies(response);
            PoliciesModel.setCurrentPage(0);
            PoliciesModel.setItemsPerPage("20");
            PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
        }

        $scope.setRule = function(rule) {
            Api.setRule(rule).success(updateRules);
        }

        function setRules(rules) {
            Api.setRules(rules).success(updateRules);
        }

        $scope.itemsPerPageChanged = function(itemsPerPage) {
            PoliciesModel.setCurrentPage(0);
            PoliciesModel.setItemsPerPage(itemsPerPage);
            PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
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

        function toggleExpand(policy) {
            if (policy.expanded) {
                policy.expanded = false;
            } else {
                policy.expanded = true;
            }
        }

        function toggleSelect(policy) {
            const index = checkIfSelected(policy);
            if (index != -1) {
                deselectPolicy(index);
            } else {
                selectPolicy(policy);
            }
        }

        $scope.clearAllSelections = function() {
            $scope.selectedPolicies.policies.splice(0, $scope.selectedPolicies.policies.length);
            $scope.selectAllCheckBox = false;
        }

        function selectPolicy(policy) {
            $scope.selectedPolicies.policies.push(policy);
        }

        function deselectPolicy(index) {
            if (index != -1) {
                $scope.selectedPolicies.policies.splice(index,1);
            } else {
                toastService.add('error', gettext("Couldn't perform deselection task!"));
            }
        }

        $scope.toggleSelectAll = function() {
            let filteredPoliciesCopy = [];
            const sortReverse = $scope.reverse;
            const sortByColumn = $scope.column;
            const rangeStart = ((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage)-PoliciesModel.data.itemsPerPage;
            const rangeEnd = Math.min(((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage), PoliciesModel.data.filteredPolicies.length);
            angular.copy(PoliciesModel.data.filteredPolicies, filteredPoliciesCopy);

            if (!sortReverse) {
                filteredPoliciesCopy.sort(function(a, b) {
                    return a[sortByColumn].localeCompare(b[sortByColumn]);
                });
            } else {
                filteredPoliciesCopy.sort(function(a, b) {
                    return b[sortByColumn].localeCompare(a[sortByColumn]);
                });
            };

            if (!$scope.selectAllCheckBox) {
                for (let i = rangeStart; i < rangeEnd; i++) {
                    const policy = filteredPoliciesCopy[i];
                    const index = checkIfSelected(policy);
                    if (index != -1) {
                        deselectPolicy(index);
                    };
                };
            } else {
                for (let i = rangeStart; i < rangeEnd; i++) {
                    const policy = filteredPoliciesCopy[i];
                    const index = checkIfSelected(policy);
                    if (index == -1) {
                        selectPolicy(policy);
                    };
                };
            }
        };

        function checkIfSelected(policy) {
            let index = -1;
            for (let i = 0; i < $scope.selectedPolicies.policies.length; i++) {
                if ($scope.selectedPolicies.policies[i].target == policy.target) {
                    if ($scope.selectedPolicies.policies[i].project == policy.project) {
                        index = i;
                    }
                }
            }
            return index;
        }

        function openInEditor(policy) {
            $scope.clearAllSelections();
            $scope.selectedPolicies.policies.push(policy);
            $scope.openEditorModal();
        }

        // Download policy as file context menu action
        function download(policy) {
            $actionsDownload.download(policy).then(function () {
                toastService.add('success', gettext('File downloaded successfully'));
            });
        };

        // Download policy as file context menu action
        $scope.downloadSelected = function() {
            const range = $scope.selectedPolicies.policies.length;
            let contents = '{' + '\n' + '    ';
            for (let i = 0; i < range; i++) {
                const policy = $scope.selectedPolicies.policies[i];
                if (policy.project != 'global') {
                    contents += '"' + policy.project + ':' + policy.target + '": "' + policy.rule + '"';
                } else {
                    contents += '"' + policy.target + '": "' + policy.rule + '"';
                }
                if (i+1 < range) {
                    contents += ',' + '\n' + '    ';
                } else {
                    contents += '\n' + '}';
                }
            }
            $actionsDownload.download(contents).then(function () {
                toastService.add('success', gettext('File downloaded successfully'));
            });
        };

        // Copy policy to clipboard context menu action
        function copy(policy) {
            $actionsCopy.copy(policy).then(function () {
                toastService.add('success', gettext('Text successfully copied to clipboard'));
            });
        };

        // Print policy context menu action
        function print(policy) {
            let contents = '{' + '\n' + '    ';
            if (policy.project != 'global') {
                contents += '"' + policy.project + ':' + policy.target + '": "' + policy.rule + '"' + '\n' + '}';
            } else {
                contents += '"' + policy.target + '": "' + policy.rule + '"' + '\n' + '}';;
            }
            $actionsPrint.print(contents).then(function () {
                toastService.add('success', gettext('Print document successfully created'));
            });
        }


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
        }

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
                templateUrl:        'static/dashboard/identity/policy/policies/components/plugin-info/plugin-info.html',
                controller:         'InfoController',
                controllerAs:       '$ctrl'
            });

            modalInstance.result.then(function () {});
        }
    }

})();
