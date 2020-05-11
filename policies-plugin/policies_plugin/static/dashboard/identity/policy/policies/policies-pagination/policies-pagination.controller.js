(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.policies-pagination')
        .controller('PaginationController', PaginationController);

    PaginationController.$inject = [
        '$scope',
        'horizon.dashboard.identity.policy.policies'
    ];

    function PaginationController($scope, Policies) {
        var $ctrl = this;
        $scope.policies = Policies.policies;

        $scope.nextPage=function() {
            if(Policies.policies.currentPage < Policies.policies.numberOfPages-1) {
                Policies.setCurrentPage(Policies.policies.currentPage+1);
            }
        };

        $scope.previousPage=function() {
            if(Policies.policies.currentPage >= 1) {
                Policies.setCurrentPage(Policies.policies.currentPage-1);
            }
        };

        $scope.firstPage=function() {
            Policies.setCurrentPage(0);
        };

        $scope.lastPage=function() {
            Policies.setCurrentPage(Policies.policies.numberOfPages-1);
        };

        $scope.goToPage=function(page) {
            Policies.setCurrentPage(page);
        };

        $scope.updateView = function() {

        };
    };

})();
