(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.policies-search', [])
        .config(config);

    config.$inject = [
        '$provide',
        '$windowProvider'
    ];

    function config($provide, $windowProvider) {
        const basePath = $windowProvider.$get().STATIC_URL + 'dashboard/identity/policy/policies/policies-search/';
        $provide.constant('horizon.dashboard.identity.policy.policies.policies-search.basePath', basePath);
    };

})();
