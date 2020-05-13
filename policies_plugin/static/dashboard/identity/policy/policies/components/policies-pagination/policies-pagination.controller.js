(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-pagination')
        .controller('PaginationController', PaginationController);

    PaginationController.$inject = [
        '$scope',
        'horizon.dashboard.identity.policy.model.policies-model'
    ];

    function PaginationController($scope, PoliciesModel) {
        var $ctrl = this;
        $scope.policies = PoliciesModel.data;

        $scope.nextPage=function() {
            if(PoliciesModel.data.currentPage < PoliciesModel.data.numberOfPages-1) {
                PoliciesModel.setCurrentPage(PoliciesModel.data.currentPage+1);
            }
        };

        $scope.previousPage=function() {
            if(PoliciesModel.data.currentPage >= 1) {
                PoliciesModel.setCurrentPage(PoliciesModel.data.currentPage-1);
            }
        };

        $scope.firstPage=function() {
            PoliciesModel.setCurrentPage(0);
        };

        $scope.lastPage=function() {
            PoliciesModel.setCurrentPage(PoliciesModel.data.numberOfPages-1);
        };

        $scope.goToPage=function(page) {
            PoliciesModel.setCurrentPage(page);
        };

    };

})();
