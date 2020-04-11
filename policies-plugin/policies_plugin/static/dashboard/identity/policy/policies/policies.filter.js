
(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies')
        .filter('startFrom', function() {
        return function(input, start) {
            if (!input || !input.length) { return; }
            start = +start;
            return input.slice(start);
        };
    })
})();
