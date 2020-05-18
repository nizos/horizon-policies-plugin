(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.confirm-dialog')
        .controller('ConfirmController', [
            '$uibModalInstance',
            '$scope',
            'dialog',
            function($uibModalInstance, $scope, dialog) {

                var $ctrl = this;
                $ctrl.dialog = dialog;

                $scope.confirm = function() {
                    $uibModalInstance.close('ok');
                }

                $scope.cancel = function() {
                    $uibModalInstance.dismiss();
                }
            }
        ]);
})();
