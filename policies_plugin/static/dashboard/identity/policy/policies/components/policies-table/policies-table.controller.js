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
        '$actionsSort',
        '$actionsCopy',
        '$actionsDownload',
        '$actionsPrint',
        '$actionsStorage',
        '$rootScope'
    ];

    function TableController($uibModal, PoliciesModel, Api, $actionsReload, $actionsSort, $actionsCopy, $actionsDownload, $actionsPrint, $actionsStorage, $rootScope) {

        let $tblCtrl = this;
        $tblCtrl.policies = PoliciesModel.data;
        $tblCtrl.actionsBarVisible = false;
        $tblCtrl.expandAll = false;
        $tblCtrl.selectAll = false;
        $tblCtrl.selectedPolicies = [];
        // Table selected policies scopes
        $tblCtrl.menuOptions = [
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
                    $tblCtrl.selectPolicy($itemScope.policy);
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
                    $tblCtrl.selectPolicy($itemScope.policy);
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
                    $tblCtrl.OpenDetailsModal($itemScope.policy);
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

        // Functions to run on page load
        $tblCtrl.init = function() {
            $actionsReload.loadPolicies().then(function() {
                $actionsSort.sortPolicies('target');
            });
        };

        $tblCtrl.storeColumnWidths = function() {
            $actionsStorage.storeColumnWidths();
        };

        $tblCtrl.storeVisibleColumns = function() {
            $actionsStorage.storeVisibleColumns();
        };

        $tblCtrl.storeItemsPerPage = function() {
            $actionsStorage.storeItemsPerPage();
        };

        // Items per page functions
        $tblCtrl.itemsPerPageChanged = function(itemsPerPage) {
            PoliciesModel.setCurrentPage(0);
            $actionsStorage.storeItemsPerPage(itemsPerPage);
            PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
        };

        $tblCtrl.setRule = function(rule) {
            Api.setRule(rule).success(policiesUpdated);
        };

        function setRules(rules) {
            Api.setRules(rules).success(policiesUpdated);
        };

        function policiesUpdated() {
            $rootScope.$broadcast('Policies updated');
            $actionsReload.loadPolicies().then(function() {
                $actionsSort.sortPoliciesNoReorder('target');
            });
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
            $tblCtrl.selectedPolicies.splice(0, $tblCtrl.selectedPolicies.length);
            for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                if (PoliciesModel.data.filteredPolicies[i].selected === true) {
                    $tblCtrl.selectedPolicies.push(PoliciesModel.data.filteredPolicies[i]);
                };
            };
            selectionsChanged();
        };

        function selectionsChanged() {
            // Show the policy actions toolbar if any policies are selected
            $tblCtrl.selectedPolicies.length > 0 ? $tblCtrl.actionsBarVisible = true : $tblCtrl.actionsBarVisible = false;
        };


        $tblCtrl.sortPolicies = function(column) {
            $actionsSort.sortPolicies(column);
        };

        // Table expand functions
        function toggleExpand(policy) {
            policy.expanded =! policy.expanded;
        };

        $tblCtrl.toggleExpandAll = function() {
            $tblCtrl.expandAll = !$tblCtrl.expandAll;
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].expanded = $tblCtrl.expandAll;
            };
        };

        // Table select functions
        $tblCtrl.toggleSelect = function() {
            updateSelected();
        };

        $tblCtrl.selectPolicy = function(policy) {
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
        $tblCtrl.toggleSelectAll = function() {
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = $tblCtrl.selectAll;
            };
            updateSelected();
        };

        $tblCtrl.clearAllSelected = function() {
            for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = false;
            };
            updateSelected();
        };

        // Download policy as file context menu action
        $tblCtrl.downloadSelected = function() {
            $actionsDownload.downloadPolicies($tblCtrl.selectedPolicies);
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
                        $tblCtrl.setRule(PoliciesModel.data.filteredPolicies[i]);
                        break;
                    };
                };
            };
        };


        // Restore policies functions
        $tblCtrl.confirmRestorePolicies = function() {
            const dialog = "Are you sure you want to restore the select policies' rules to their default values?";
            openRestorePoliciesModal(dialog, $tblCtrl.selectedPolicies);
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
            $tblCtrl.clearAllSelected();
            $tblCtrl.selectPolicy(policy);
            $tblCtrl.openEditorModal();
        };

        // Details modal
        $tblCtrl.OpenDetailsModal = function(policy) {
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                templateUrl:            'static/dashboard/identity/policy/policies/components/policies-details/policies-details.html',
                controller:             'DetailsController',
                controllerAs:           '$dtlCtrl',
                resolve: {
                    $policy: function () {
                        return policy;
                    }
                }
            });
            // User saved modifications to policy
            modalInstance.result.then(function (policy) {
                $tblCtrl.setRule(policy);
            });
        };

        // Editor modal
        $tblCtrl.openEditorModal = function() {
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                templateUrl:            'static/dashboard/identity/policy/policies/components/policies-editor/policies-editor.html',
                controller:             'EditorController',
                controllerAs:           '$edtCtrl',
                resolve: {
                    $policy: function () {
                        return $tblCtrl.selectedPolicies;
                    }
                }
            });
            // User saved modifications to policies
            modalInstance.result.then(function (rules) {
                setRules(rules);
                $tblCtrl.clearAllSelected();
            });
            // User discarded modifications to policies
            modalInstance.closed.then(function () {
                $tblCtrl.clearAllSelected();
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
                controllerAs:           '$cnfCtrl',
                resolve: {
                    dialog: function () {
                        return dialog;
                    }
                }
            });
            // User confirmed restore policy action
            modalInstance.result.then(function () {
                restorePolicy(policy);
                $tblCtrl.clearAllSelected();
            });
            // User canceled restore policy action
            modalInstance.closed.then(function () {
                $tblCtrl.clearAllSelected();
            });
        };

        // Restore policies modal
        function openRestorePoliciesModal(dialog, policies) {
            let modalInstance =         $uibModal.open({
                ariaLabelledBy:         'modal-title',
                ariaDescribedBy:        'modal-body',
                animation:              false,
                templateUrl:            'static/dashboard/identity/policy/policies/components/confirm-dialog/confirm-dialog.html',
                controller:             'ConfirmController',
                controllerAs:           '$cnfCtrl',
                resolve: {
                    dialog: function () {
                        return dialog;
                    }
                }
            });
            // User confirmed restore policies action
            modalInstance.result.then(function () {
                restorePolicies(policies);
                $tblCtrl.clearAllSelected();
            });
            // User canceled restore policies action
            modalInstance.closed.then(function () {
                $tblCtrl.clearAllSelected();
            });
        };
    };

})();
