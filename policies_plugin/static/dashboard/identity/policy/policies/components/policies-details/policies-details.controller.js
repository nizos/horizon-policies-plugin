(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-details')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = [
        '$uibModalInstance',
        '$policy'
    ];

    function DetailsController($uibModalInstance, $policy) {

        let $dtlCtrl = this;
        $dtlCtrl.policy = $policy;
        $dtlCtrl.project = $policy['project'];
        $dtlCtrl.target = $policy['target'];
        $dtlCtrl.rule = $policy['rule'];
        $dtlCtrl.defaultRule = $policy['defaultRule'];
        $dtlCtrl.scopes = $policy['scopes'];
        $dtlCtrl.operations = $policy['operations'];
        $dtlCtrl.description = $policy['description'];
        $dtlCtrl.showForm = false;
        $dtlCtrl.showJson = false;

        $dtlCtrl.ok = function() {
            $policy['rule'] = $dtlCtrl.rule;
            $uibModalInstance.close($policy);
        };

        $dtlCtrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    };

})();
