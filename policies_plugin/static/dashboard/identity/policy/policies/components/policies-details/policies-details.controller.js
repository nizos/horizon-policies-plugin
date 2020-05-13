(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-details')
        .controller('DetailsController', [
            '$uibModalInstance',
            '$scope',
            '$policy',
            function($uibModalInstance, $scope, $policy) {

                var $ctrl = this;
                $ctrl.policy = $policy;
                $ctrl.project = $policy['project'];
                $ctrl.target = $policy['target'];
                $ctrl.rule = $policy['rule'];
                $ctrl.defaultRule = $policy['default'];
                $ctrl.scopes = $policy['scopes'];
                $ctrl.operations = $policy['operations'];
                $ctrl.description = $policy['description'];
                $scope.showForm = false;
                $scope.showJson = false;

                $scope.ok = function() {
                    $policy['rule'] = $ctrl.rule;
                    $uibModalInstance.close($policy);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }
            }
        ]);
})();
