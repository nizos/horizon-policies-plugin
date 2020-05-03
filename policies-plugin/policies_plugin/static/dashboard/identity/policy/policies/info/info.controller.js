(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.info', [])
        .controller('InfoController', [
            '$uibModalInstance',
            '$scope',
            function($uibModalInstance, $scope) {

                $scope.exit = function() {
                    $uibModalInstance.dismiss('cancel');
                }
            }
        ]);
})();
