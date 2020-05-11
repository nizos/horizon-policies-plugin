(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.policies-pagination', [])
        .config(config);

    config.$inject = [
        '$provide',
        '$windowProvider'
    ];

    function config($provide, $windowProvider) {
        const basePath = $windowProvider.$get().STATIC_URL + 'dashboard/identity/policy/policies/policies-pagination/';
        $provide.constant('horizon.dashboard.identity.policy.policies.policies-pagination.basePath', basePath);
    };

})();
