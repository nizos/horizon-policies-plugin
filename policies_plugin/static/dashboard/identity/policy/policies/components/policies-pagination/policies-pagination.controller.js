(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-pagination')
        .controller('PaginationController', PaginationController);

    PaginationController.$inject = [
        'horizon.dashboard.identity.policy.model.policies-model'
    ];

    function PaginationController(PoliciesModel) {
        var $pgnCtrl = this;
        $pgnCtrl.policies = PoliciesModel.data;

        $pgnCtrl.nextPage=function() {
            if(PoliciesModel.data.currentPage < PoliciesModel.data.numberOfPages-1) {
                PoliciesModel.setCurrentPage(PoliciesModel.data.currentPage+1);
            }
        };

        $pgnCtrl.previousPage=function() {
            if(PoliciesModel.data.currentPage >= 1) {
                PoliciesModel.setCurrentPage(PoliciesModel.data.currentPage-1);
            }
        };

        $pgnCtrl.firstPage=function() {
            PoliciesModel.setCurrentPage(0);
        };

        $pgnCtrl.lastPage=function() {
            PoliciesModel.setCurrentPage(PoliciesModel.data.numberOfPages-1);
        };

        $pgnCtrl.goToPage=function(page) {
            PoliciesModel.setCurrentPage(page);
        };

    };

})();
