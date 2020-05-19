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
                    console.log('TableController -> toggleExpand($itemScope.policy)');
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
                    console.log('TableController -> toggleExpand($itemScope.policy)');
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
                    console.log('TableController -> $tblCtrl.selectPolicy($itemScope.policy)');
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
                    console.log('TableController -> $tblCtrl.selectPolicy($itemScope.policy)');
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
                    console.log('TableController -> $tblCtrl.OpenDetailsModal($itemScope.policy)');
                    $tblCtrl.OpenDetailsModal($itemScope.policy);
                }
            },
            {
                text: 'Open in Text Editor',
                click: function($itemScope) {
                    console.log('TableController -> openInEditor($itemScope.policy)');
                    openInEditor($itemScope.policy);
                }
            },
            {
                text: 'Copy',
                click: function($itemScope) {
                    console.log('TableController -> $actionsCopy.copyPolicy($itemScope.policy)');
                    $actionsCopy.copyPolicy($itemScope.policy);
                }
            },
            {
                text: 'Print',
                click: function($itemScope) {
                    console.log('TableController -> $actionsPrint.printPolicy($itemScope.policy)');
                    $actionsPrint.printPolicy($itemScope.policy);
                }
            },
            {
                text: 'Download',
                click: function($itemScope) {
                    console.log('TableController -> $actionsDownload.downloadPolicy($itemScope.policy)');
                    $actionsDownload.downloadPolicy($itemScope.policy);
                }
            },
            {
                text: 'Restore default rule',
                click: function($itemScope) {
                    console.log('TableController -> confirmRestorePolicy($itemScope.policy)');
                    confirmRestorePolicy($itemScope.policy);
                }
            }
        ];

        init();

        // Functions to run on page load
        function init() {
            console.log('TableController -> init()');
            $actionsReload.loadPolicies().then(function() {
                console.log('TableController -> $actionsReload.loadPolicies().then');
            });
        };

        $tblCtrl.storeColumnWidths = function() {
            console.log('TableController -> $tblCtrl.storeColumnWidths()');
            $actionsStorage.storeColumnWidths();
        };

        $tblCtrl.storeVisibleColumns = function() {
            console.log('TableController -> $tblCtrl.storeVisibleColumns()');
            $actionsStorage.storeVisibleColumns();
        };

        $tblCtrl.storeItemsPerPage = function() {
            console.log('TableController -> $tblCtrl.storeItemsPerPage()');
            $actionsStorage.storeItemsPerPage();
        };

        // Items per page functions
        $tblCtrl.itemsPerPageChanged = function(itemsPerPage) {
            console.log('TableController -> $tblCtrl.itemsPerPageChanged(itemsPerPage)');
            PoliciesModel.setCurrentPage(0);
            $actionsStorage.storeItemsPerPage(itemsPerPage);
            PoliciesModel.setNumberOfPages(Math.ceil(PoliciesModel.data.filteredPolicies.length/PoliciesModel.data.itemsPerPage));
        };

        $tblCtrl.setRule = function(rule) {
            console.log('TableController -> $tblCtrl.setRule(rule)');
            Api.setRule(rule).success(policiesUpdated);
        };

        function setRules(rules) {
            console.log('TableController -> setRules(rules)');
            Api.setRules(rules).success(policiesUpdated);
        };

        function policiesUpdated() {
            console.log('TableController -> policiesUpdated() -> $rootScope.$broadcast(Policies updated)');
            $rootScope.$broadcast('Policies updated');
        };

        // Table getters
        function getTablePageStart() {
            console.log('TableController -> getTablePageStart()');
            return ((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage)-PoliciesModel.data.itemsPerPage;
        };

        function getTablePageEnd() {
            console.log('TableController -> getTablePageEnd()');
            return Math.min(((PoliciesModel.data.currentPage+1)*PoliciesModel.data.itemsPerPage), PoliciesModel.data.filteredPolicies.length);
        };

        // Table updaters
        function updateSelected() {
            console.log('TableController -> updateSelected()');
            $tblCtrl.selectedPolicies.splice(0, $tblCtrl.selectedPolicies.length);
            for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                if (PoliciesModel.data.filteredPolicies[i].selected === true) {
                    $tblCtrl.selectedPolicies.push(PoliciesModel.data.filteredPolicies[i]);
                };
            }
            selectionsChanged();
        };

        function selectionsChanged() {
            console.log('TableController -> selectionsChanged()');
            // Show the policy actions toolbar if any policies are selected
            $tblCtrl.selectedPolicies.length > 0 ? $tblCtrl.actionsBarVisible = true : $tblCtrl.actionsBarVisible = false;
        };


        $tblCtrl.sortPolicies = function(column) {
            console.log('TableController -> $tblCtrl.sortPolicies');
            $actionsSort.sortPolicies(column);
        };

        // Table expand functions
        function toggleExpand(policy) {
            console.log('TableController -> toggleExpand(policy)');
            policy.expanded =! policy.expanded;
        };

        $tblCtrl.toggleExpandAll = function() {
            console.log('TableController -> $tblCtrl.toggleExpandAll');
            $tblCtrl.expandAll = !$tblCtrl.expandAll;
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].expanded = $tblCtrl.expandAll;
            };
        };

        // Table select functions
        $tblCtrl.toggleSelect = function() {
            console.log('TableController -> $tblCtrl.toggleSelect');
            updateSelected();
        };

        $tblCtrl.selectPolicy = function(policy) {
            console.log('TableController -> $tblCtrl.selectPolicy');
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
            console.log('TableController -> $tblCtrl.toggleSelectAll');
            const rangeStart = getTablePageStart();
            const rangeEnd = getTablePageEnd();
            for (let i = rangeStart; i < rangeEnd; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = $tblCtrl.selectAll;
            };
            updateSelected();
        };

        $tblCtrl.clearAllSelected = function() {
            console.log('TableController -> $tblCtrl.clearAllSelected');
            for (let i = 0; i < PoliciesModel.data.filteredPolicies.length; i++) {
                PoliciesModel.data.filteredPolicies[i].selected = false;
            };
            updateSelected();
        };

        // Download policy as file context menu action
        $tblCtrl.downloadSelected = function() {
            console.log('TableController -> $tblCtrl.downloadSelected');
            $actionsDownload.downloadPolicies($tblCtrl.selectedPolicies);
        };

        // Restore policy functions
        function confirmRestorePolicy(policy) {
            console.log('TableController -> confirmRestorePolicy(policy)');
            const dialog = "Are you sure you want to restore the policy's rule to its default value?";
            openRestorePolicyModal(dialog, policy);
        };

        function restorePolicy(policy) {
            console.log('TableController -> restorePolicy(policy)');
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
            console.log('TableController -> $tblCtrl.confirmRestorePolicies');
            const dialog = "Are you sure you want to restore the select policies' rules to their default values?";
            openRestorePoliciesModal(dialog, $tblCtrl.selectedPolicies);
        };

        function restorePolicies(policies) {
            console.log('TableController -> restorePolicies(policies)');
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
            console.log('TableController ->  openInEditor(policy)');
            $tblCtrl.clearAllSelected();
            $tblCtrl.selectPolicy(policy);
            $tblCtrl.openEditorModal();
        };

        // Details modal
        $tblCtrl.OpenDetailsModal = function(policy) {
            console.log('TableController ->  OpenDetailsModal');
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
                console.log('TableController ->  OpenDetailsModal -> modalInstance.result.then');
                $tblCtrl.setRule(policy);
            });
        };

        // Editor modal
        $tblCtrl.openEditorModal = function() {
            console.log('TableController ->  openEditorModal');
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
                console.log('TableController ->  openEditorModal -> modalInstance.result.then');
                setRules(rules);
                $tblCtrl.clearAllSelected();
            });

            // User discarded modifications to policies
            modalInstance.closed.then(function () {
                console.log('TableController ->  openEditorModal -> modalInstance.closed.then');
                $tblCtrl.clearAllSelected();
            });
        };

        // Restore policy modal
        function openRestorePolicyModal(dialog, policy) {
            console.log('TableController ->  openRestorePolicyModal');
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
                console.log('TableController ->  openRestorePolicyModal -> modalInstance.result.then');
                restorePolicy(policy);
                $tblCtrl.clearAllSelected();
            });

            // User canceled restore policy action
            modalInstance.closed.then(function () {
                console.log('TableController ->  openRestorePolicyModal -> modalInstance.closed.then');
                $tblCtrl.clearAllSelected();
            });
        };

        // Restore policies modal
        function openRestorePoliciesModal(dialog, policies) {
            console.log('TableController ->  openRestorePoliciesModal');
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
                console.log('TableController ->  openRestorePoliciesModal -> modalInstance.result.then');
                restorePolicies(policies);
                $tblCtrl.clearAllSelected();
            });

            // User canceled restore policies action
            modalInstance.closed.then(function () {
                console.log('TableController ->  openRestorePoliciesModal -> modalInstance.closed.then');
                $tblCtrl.clearAllSelected();
            });
        };
    };

})();
