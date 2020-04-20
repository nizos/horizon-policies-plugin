(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.details')
        .controller('detailsController', [
            '$uibModalInstance',
            '$log',
            '$scope',
            '$policy',
            function($uibModalInstance, $log, $scope, $policy) {

                var $ctrl = this;
                $ctrl.policy = $policy;

                $scope.ok = function(policy) {
                    $uibModalInstance.close(policy);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                $scope.addScope = function() {
                    $ctrl.policy.scopes.push("");
                }

                $scope.addOperation = function() {
                    $ctrl.policy.operations.push("");
                }

                $scope.removeScope = function(index) {
                    $ctrl.policy.scopes.splice(index, 1);
                }

                $scope.removeOperation = function(index) {
                    $ctrl.policy.operations.splice(index, 1);
                }

            }
        ]);

})();
