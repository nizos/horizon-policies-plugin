(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-search')
        .controller('SearchController', SearchController);

    SearchController.$inject = [
        'horizon.dashboard.identity.policy.model.policies-model',
        '$actionsFilter',
        '$actionsReload',
        '$actionsStorage',
        '$scope',
        '$uibModal'
    ];

    function SearchController(PoliciesModel, $actionsFilter, $actionsReload, $actionsStorage, $scope, $uibModal) {
        let $schCtrl = this;
        $schCtrl.policies = PoliciesModel.data;
        $schCtrl.query;

        // Watch for changes in search bar input
        $scope.$watch('$schCtrl.query', function(newValue, oldValue) {
            if(oldValue!=newValue) {
                filterPolicies();
            };
        },true);

        // Watch for changes in policies data
        $scope.$on('Policies updated', function() {
            filterPolicies();
        });

        // Rerun search filter after search option changed
        $schCtrl.searchOptionsChanged = function() {
            filterPolicies();
            $actionsStorage.storeSearchColumns();
        };

        // Reload all policies
        $schCtrl.reloadPolicies = function() {
            $actionsReload.reloadPolicies();
        };

        // Filter policies according to user input and chosen options
        function filterPolicies() {
            $actionsFilter.filterPolicies($schCtrl.query);
        };

        // Info modal
        $schCtrl.openInfoModal = function() {
            let modalInstance =     $uibModal.open({
                ariaLabelledBy:     'modal-title',
                ariaDescribedBy:    'modal-body',
                templateUrl:        'static/dashboard/identity/policy/policies/components/plugin-info/plugin-info.html',
                controller:         'InfoController',
                controllerAs:       '$infCtrl'
            });

            modalInstance.result.then();
        };
    };

})();
