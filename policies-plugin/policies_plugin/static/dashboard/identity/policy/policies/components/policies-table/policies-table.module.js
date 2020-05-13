(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-table', [])
        .config(config);

    config.$inject = [
        '$provide',
        '$windowProvider'
    ];

    function config($provide, $windowProvider) {
        const basePath = $windowProvider.$get().STATIC_URL + 'dashboard/identity/policy/policies/components/policies-table/';
        $provide.constant('horizon.dashboard.identity.policy.policies.components.policies-table.basePath', basePath);
    };

})();
