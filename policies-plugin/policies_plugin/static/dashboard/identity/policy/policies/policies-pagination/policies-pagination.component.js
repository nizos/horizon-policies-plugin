(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.policies-pagination')
        .component('policiesPagination', {
            templateUrl: [
                'horizon.dashboard.identity.policy.policies.policies-pagination.basePath',
                function(basePath) {
                    return basePath + 'policies-pagination.html'
                }
            ],
            controller: 'PaginationController',
            controllerAs: 'ctrl'
        });
})();
