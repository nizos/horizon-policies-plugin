(function() {
    'use strict';

    describe('SearchController', function() {
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

        // TODO: Almost got it working
        // describe('$scope.searchOptionsChanged()', function() {
        //     it('Test to check if search bar input is empty', function() {
        //         var $scope = {};
        //         var controller = $controller('SearchController', { $scope: $scope });
        //         //$scope.query = '';
        //         var expectation = $scope.allPolicies;
        //         $scope.searchOptionChanged();
        //         expect($scope.allPolicies).toEqual(expectation);
        //     });
        // });
    });

})();