(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-table')
        .controller('TableController', TableController);

    TableController.$inject = [
        '$uibModal',
        'horizon.dashboard.identity.policy.model.policies-model',
        'horizon.dashboard.identity.policy.api',
        '$actionsReload',
        '$actionsCopy',
        '$actionsDownload',
        '$actionsPrint',
        '$scope'
    ];

    function TableController($uibModal, PoliciesModel, Api, $actionsReload, $actionsCopy, $actionsDownload, $actionsPrint, $scope) {
        var $ctrl = this;
        $ctrl.policies = PoliciesModel.data;
        $ctrl.actionsBarVisible = false;
        $ctrl.expandAll = false;
        $ctrl.selectAll = false;
        $ctrl.selectedPolicies = [];
        // Table sort scopes
        $ctrl.sortColumn = 'target';
        $ctrl.sortReverse = true;
        // Table selected policies scopes
        $ctrl.visibleColumns = {
            project:        true,
            target:         true,
            rule:           true,
            defaultRule:    true,
            scopes:         true,
            operations:     true,
            description:    true
        };
        $ctrl.menuOptions = [
            {
                text: 'Expand',
                click: function($itemScope) {
                    toggleExpand($itemScope.policy);
                },
                displayed: function($itemScope) {
                    if ($itemScope.policy.expanded) {
                        return false;
                    } else {
                        return true;
                    };
                }
            },
            {
                text: 'Collapse',
                click: function($itemScope) {
                    toggleExpand($itemScope.policy);
                },
                displayed: function($itemScope) {
                    if ($itemScope.policy.expanded) {
                        return true;
                    } else {
                        return false;
                    };
                }
            },
            {
                text: 'Select',
                click: function($itemScope) {
                    $ctrl.selectPolicy($itemScope.policy);
                },
                displayed: function($itemScope) {
                    if ($itemScope.policy.selected) {
                        return false;
                    } else {
                        return true;
                    };
                }
            },
            {
                text: 'Deselect',
                click: function($itemScope) {
                    $ctrl.selectPolicy($itemScope.policy);
                },
                displayed: function($itemScope) {
                    if ($itemScope.policy.selected) {
                        return true;
                    } else {
                        return false;
                    };
                }
            },
            {
                text: 'Open in Quick Editor',
                click: function($itemScope) {
                    $ctrl.OpenDetailsModal($itemScope.policy);
                }
            },
            {
                text: 'Open in Text Editor',
                click: function($itemScope) {
                    openInEditor($itemScope.policy);
                }
            },
            {
                text: 'Copy',
                click: function($itemScope) {
                    $actionsCopy.copyPolicy($itemScope.policy);
                }
            },
            {
                text: 'Print',
                click: function($itemScope) {
                    $actionsPrint.printPolicy($itemScope.policy);
                }
            },
            {
                text: 'Download',
                click: function($itemScope) {
                    $actionsDownload.downloadPolicy($itemScope.policy);
                }
            },
            {
                text: 'Restore default rule',
                click: function($itemScope) {
                    confirmRestorePolicy($itemScope.policy);
                }
            }
        ];

        init();

        // Functions to run on page load
        function init() {
            $actionsReload.loadPolicies().then(function() {
                $ctrl.sortPolicies($ctrl.sortColumn);
            });
            restoreItemsPerPage();
            restoreVisibleColumns();
            restoreColumnWidths();
        };

        // Table column functions
        $scope.$watch(function () {
            return parseInt(document.querySelector('#project-column-header').style.width);
        }, function(newVal, oldVal) {
            storeColumnWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#target-column-header').style.width);
        }, function(newVal, oldVal) {
            storeColumnWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#rule-column-header').style.width);
        }, function(newVal, oldVal) {
            storeColumnWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#default-column-header').style.width);
        }, function(newVal, oldVal) {
            storeColumnWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#scopes-column-header').style.width);
        }, function(newVal, oldVal) {
            storeColumnWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#operations-column-header').style.width);
        }, function(newVal, oldVal) {
            storeColumnWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#description-column-header').style.width);
        }, function(newVal, oldVal) {
            storeColumnWidths();
        });

        // Visible column functions
        $ctrl.storeVisibleColumns = function() {
            localStorage.setItem("visibleColumns", JSON.stringify($ctrl.visibleColumns));
        };

        function restoreVisibleColumns() {
            if (localStorage.getItem('visibleColumns') !== null) {
                $ctrl.visibleColumns = JSON.parse(localStorage.getItem('visibleColumns'));
            };
        };

        // Items per page functions
        $ctrl.storeItemsPerPage = function(itemsPerPage) {
            console.log("store itemsPerPage: ", itemsPerPage);
            localStorage.setItem("itemsPerPage", itemsPerPage);
        };

        function restoreItemsPerPage() {
            if (localStorage.getItem('itemsPerPage') !== null) {
                console.log("restore itemsPerPage: ", localStorage.getItem('itemsPerPage'));
                PoliciesModel.setItemsPerPage(localStorage.getItem('itemsPerPage'));
            } else {
                PoliciesModel.setItemsPerPage(20);
            };
        };

        $ctrl.itemsPerPageChanged = function(itemsPerPage) {
            PoliciesModel.setCurrentPage(0);
            PoliciesModel.setItemsPerPage(itemsPerPage);
            PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
            $ctrl.storeItemsPerPage(itemsPerPage);
        };

        // Column width functions
        function storeColumnWidths() {
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
        };

        function restoreColumnWidths() {
            if (localStorage.getItem('columnWidths') !== null){
                const widths = JSON.parse(localStorage.getItem('columnWidths'));
                document.querySelector('#project-column-header').style.width =      widths['project'] + 'px';
                document.querySelector('#target-column-header').style.width =       widths['target'] + 'px';
                document.querySelector('#rule-column-header').style.width =         widths['rule'] + 'px';
                document.querySelector('#default-column-header').style.width =      widths['default'] + 'px';
                document.querySelector('#scopes-column-header').style.width =       widths['scopes'] + 'px';
                document.querySelector('#operations-column-header').style.width =   widths['operations'] + 'px';
                document.querySelector('#description-column-header').style.width =  widths['description'] + 'px';
            };
        };

        $ctrl.setRule = function(rule) {
            Api.setRule(rule);
        };

        function setRules(rules) {
            Api.setRules(rules);
        };

        // Table getters
        function getTablePageStart() {
            return ((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage)-PoliciesModel.data.itemsPerPage;
        };

        function getTablePageEnd() {
            return Math.min(((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage), PoliciesModel.data.filteredPolicies.length);
        };

        // Table updaters
        function updateSelected() {
            $ctrl.selectedPolicies.splice(0, $ctrl.selectedPolicies.length);
            PoliciesModel.data.filteredPolicies.forEach(function(policy) {
                if (policy.selected === true) {
                    $ctrl.selectedPolicies.push(policy);
                };
            });
            selectionsChanged();
        };

        function selectionsChanged() {
            // Show the policy actions toolbar if any policies are selected
            $ctrl.selectedPolicies.length > 0 ? $ctrl.actionsBarVisible = true : $ctrl.actionsBarVisible = false;
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

        $ctrl.sortPolicies = function(column) {
            if ($ctrl.sortColumn === column) {
                $ctrl.sortReverse =! $ctrl.sortReverse;
            };
            if (column === 'scopes' || column === 'operations') {
                for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                    if (PoliciesModel.data.filteredPolicies[i][column].length >= 1) {
                        PoliciesModel.data.filteredPolicies[i][column].sort(function(a, b) {
                            if (!$ctrl.sortReverse) {
                                return compare(a, b);
                            } else {
                                return compare(b, a);
                            };
                        });
                    }
                };
                PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                    if (!$ctrl.sortReverse) {
                        return compare(a[column][0], b[column][0]);
                    } else {
                        return compare(b[column][0], a[column][0]);
                    };
                });
            } else {
                PoliciesModel.data.filteredPolicies.sort(function(a, b) {
                    if (!$ctrl.sortReverse) {
                        return a[column].localeCompare(b[column]);
                    } else {
                        return b[column].localeCompare(a[column]);
                    };
                });
            };
            $ctrl.sortColumn = column;
        };

        // Table expand functions
        function toggleExpand(policy) {
            policy.expanded =! policy.expanded;
        };

        $ctrl.toggleExpandAll = function() {
            $ctrl.expandAll = !$ctrl.expandAll;
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].expanded = $ctrl.expandAll;
            };
        };

        // Table select functions
        $ctrl.toggleSelect = function() {
            updateSelected();
        };

        $ctrl.selectPolicy = function(policy) {
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                let filteredPolicy = PoliciesModel.data.filteredPolicies[i];
                if (filteredPolicy.target === policy.target) {
                    if (filteredPolicy.rule === policy.rule) {
                        PoliciesModel.data.filteredPolicies[i].selected =! PoliciesModel.data.filteredPolicies[i].selected;
                        break;
                    };
                };
            };
            updateSelected();
        };

        // Policy select all functions
        $ctrl.toggleSelectAll = function() {
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = $ctrl.selectAll;
            };
            updateSelected();
        };

        $ctrl.clearAllSelected = function() {
            for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = false;
            };
            updateSelected();
        };

        // Download policy as file context menu action
        $ctrl.downloadSelected = function() {
            $actionsDownload.downloadPolicies($ctrl.selectedPolicies);
        };

        // Restore policy functions
        function confirmRestorePolicy(policy) {
            const dialog = "Are you sure you want to restore the policy's rule to its default value?";
            openRestorePolicyModal(dialog, policy);
        };

        function restorePolicy(policy) {
            for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                let filteredPolicy = PoliciesModel.data.filteredPolicies[i];
                if (filteredPolicy.target === policy.target) {
                    if (filteredPolicy.rule === policy.rule) {
                        PoliciesModel.data.filteredPolicies[i].rule = PoliciesModel.data.filteredPolicies[i].defaultRule;
                        $ctrl.setRule(PoliciesModel.data.filteredPolicies[i]);
                        break;
                    };
                };
            };
        };


        // Restore policies functions
        $ctrl.confirmRestorePolicies = function() {
            const dialog = "Are you sure you want to restore the select policies' rules to their default values?";
            openRestorePoliciesModal(dialog, $ctrl.selectedPolicies);
        };

        function restorePolicies(policies) {
            let requests = [];
            for (let i = 0; i < policies.length; i++) {
                const request = {
                    'project': policies[i].project,
                    'target': policies[i].target,
                    'rule': policies[i].defaultRule
                };
                requests.push(request);
            };
            setRules(requests);
        };

        // Editor functions
        function openInEditor(policy) {
            $ctrl.clearAllSelected();
            $ctrl.selectPolicy(policy);
            $ctrl.openEditorModal();
        };

        // Details modal
        $ctrl.OpenDetailsModal = function(policy){
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

            // User saved modifications to policy
            modalInstance.result.then(function (policy) {
                $ctrl.setRule(policy);
            });
        };

        // Editor modal
        $ctrl.openEditorModal = function(){
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                templateUrl:            'static/dashboard/identity/policy/policies/components/policies-editor/policies-editor.html',
                controller:             'EditorController',
                controllerAs:           '$ctrl',
                resolve: {
                    $policy: function () {
                        return $ctrl.selectedPolicies;
                    }
                }
            });

            // User saved modifications to policies
            modalInstance.result.then(function (rules) {
                setRules(rules);
                $ctrl.clearAllSelected();
            });

            // User discarded modifications to policies
            modalInstance.closed.then(function () {
                $ctrl.clearAllSelected();
            });
        };

        // Restore policy modal
        function openRestorePolicyModal(dialog, policy) {
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                animation:              false,
                templateUrl:            'static/dashboard/identity/policy/policies/components/confirm-dialog/confirm-dialog.html',
                controller:             'ConfirmController',
                controllerAs:           '$ctrl',
                resolve: {
                    dialog: function () {
                        return dialog;
                    }
                }
            });

            // User confirmed restore policy action
            modalInstance.result.then(function () {
                restorePolicy(policy);
                $ctrl.clearAllSelected();
            });

            // User canceled restore policy action
            modalInstance.closed.then(function () {
                $ctrl.clearAllSelected();
            });
        };

        // Restore policies modal
        function openRestorePoliciesModal(dialog, policies){
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                animation:              false,
                templateUrl:            'static/dashboard/identity/policy/policies/components/confirm-dialog/confirm-dialog.html',
                controller:             'ConfirmController',
                controllerAs:           '$ctrl',
                resolve: {
                    dialog: function () {
                        return dialog;
                    }
                }
            });

            // User confirmed restore policies action
            modalInstance.result.then(function () {
                restorePolicies(policies);
                $ctrl.clearAllSelected();
            });

            // User canceled restore policies action
            modalInstance.closed.then(function () {
                $ctrl.clearAllSelected();
            });
        };
    };

})();
