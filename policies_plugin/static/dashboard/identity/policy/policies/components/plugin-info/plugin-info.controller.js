(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.plugin-info', [])
        .controller('InfoController', [
            '$uibModalInstance',
            '$scope',
            function($uibModalInstance, $scope) {

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }
            }
        ]);
})();
