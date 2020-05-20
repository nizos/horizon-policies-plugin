(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.plugin-info')
        .controller('InfoController', InfoController);

    InfoController.$inject = [
        '$uibModalInstance',
        '$scope'
    ];

    function InfoController($uibModalInstance, $scope) {

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    };

})();
