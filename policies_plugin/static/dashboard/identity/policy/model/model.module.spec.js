(function() {
    'use strict';

    /* Test to see if model module is defined */
    describe('horizon.dashboard.identity.policy.model', function() {
        it('Module is defined', function () {
            expect(angular.module('horizon.dashboard.identity.policy.model')).toBeDefined();
        });

    });

    /* Test to see if checklist-model module is defined */
    describe('horizon.dashboard.identity.policy.model.checklist-model', function() {
        it('Module is defined', function () {
            expect(angular.module('horizon.dashboard.identity.policy.model.checklist-model')).toBeDefined();
        });

    });

    /* Test to see if policies-model module is defined */
    describe('horizon.dashboard.identity.policy.model.policies-model', function() {
        it('Module is defined', function () {
            expect(angular.module('horizon.dashboard.identity.policy.model.policies-model')).toBeDefined();
        });

    });

})();