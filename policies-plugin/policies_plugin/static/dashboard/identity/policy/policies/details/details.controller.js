(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.details')
        .controller('detailsController', [
            '$uibModalInstance',
            '$scope',
            '$policy',
            function($uibModalInstance, $scope, $policy) {
                var $ctrl = this;
                $ctrl.policy = $policy;
                $scope.showForm = false;
                $scope.showJson = false;
                const ruleBackUp = $policy.rule;

                $scope.ok = function(policy) {
                    $uibModalInstance.close(policy);
                };

                $scope.cancel = function() {
                    $policy.rule = ruleBackUp;
                    $uibModalInstance.dismiss('cancel');
                }

            }
        ]);

})();