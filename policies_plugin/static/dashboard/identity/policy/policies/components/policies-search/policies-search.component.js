(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-search')
        .component('policiesSearch', {
            templateUrl: [
                'horizon.dashboard.identity.policy.policies.components.policies-search.basePath',
                function(basePath) {
                    return basePath + 'policies-search.html'
                }
            ],
            controller: 'SearchController',
            controllerAs: '$schCtrl'
        });
})();
