(function() {
    'use strict';

    describe('PaginationController', function() {
        beforeEach(function () {
            module('horizon.framework.conf');
            module('horizon.framework.util.http');
            module('horizon.framework.widgets.toast');
            module('horizon.dashboard.identity.policy');
        });
        beforeEach(module('horizon.dashboard.identity.policy'));

        var $controller;

        beforeEach(inject(function(_$controller_){
          // The injector unwraps the underscores (_) from around the parameter names when matching
          $controller = _$controller_;
        }));

        // describe('$pgnCtrl.goToPage()', function() {
        //     it('Test to check if correct page is returned', function() {
        //             var expectation = 1;
        //             var $pgnCtrl = {};
        //             var controller = $controller('PaginationController', { $pgnCtrl: $pgnCtrl });
        //             $pgnCtrl.goToPage(expectation);
        //             expect($pgnCtrl.policies.currentPage).toEqual(expectation);
        //     });
        // });

    });

})();