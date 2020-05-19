(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-pagination')
        .component('policiesPagination', {
            templateUrl: [
                'horizon.dashboard.identity.policy.policies.components.policies-pagination.basePath',
                function(basePath) {
                    return basePath + 'policies-pagination.html'
                }
            ],
            controller: 'PaginationController',
            controllerAs: '$pgnCtrl'
        });
})();
