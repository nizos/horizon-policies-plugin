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

            }
        ]);

})();
