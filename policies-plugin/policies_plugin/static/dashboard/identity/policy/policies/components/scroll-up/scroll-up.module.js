(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.scroll-up', [])
        .config(config);

    config.$inject = [
        '$provide',
        '$windowProvider'
    ];

    function config($provide, $windowProvider) {
        const basePath = $windowProvider.$get().STATIC_URL + 'dashboard/identity/policy/policies/components/scroll-up/';
        $provide.constant('horizon.dashboard.identity.policy.policies.components.scroll-up.basePath', basePath);
    };

})();
