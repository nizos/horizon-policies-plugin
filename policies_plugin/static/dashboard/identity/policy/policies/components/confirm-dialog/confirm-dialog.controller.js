(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.confirm-dialog')
        .controller('ConfirmController', ConfirmController);

    ConfirmController.$inject =[
        '$uibModalInstance',
        '$scope',
        'dialog'
    ];

    function ConfirmController($uibModalInstance, $scope, dialog) {
        let $cnfCtrl = this;
        $cnfCtrl.dialog = dialog;

        $scope.confirm = function() {
            $uibModalInstance.close('ok');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
    };

})();
