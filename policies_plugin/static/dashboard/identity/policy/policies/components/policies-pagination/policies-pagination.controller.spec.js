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

        describe('$scope.goToPage()', function() {
            it('Test to check if correct page is returned', function() {
                    var expectation = 1;
                    var $scope = {};
                    var controller = $controller('PaginationController', { $scope: $scope });
                    $scope.goToPage(expectation);
                    expect($scope.policies.currentPage).toEqual(expectation);
            });
        });

        describe('$scope.firstPage()', function() {
            it('Test to check if first page is returned', function() {
                    var expectation = 0;
                    var $scope = {};
                    var controller = $controller('PaginationController', { $scope: $scope });
                    $scope.firstPage();
                    expect($scope.policies.currentPage).toEqual(expectation);
            });
        });

        //TODO: Almost got it working
        // describe('$scope.lastPage()', function() {
        //     it('Test to check if last page is returned', function() {
        //             var expectation = 20;
        //             var $scope = {};
        //             var controller = $controller('PaginationController', { $scope: $scope });
        //             $scope.lastPage();
        //             expect($scope.policies.currentPage).toEqual(expectation);
        //     });
        // });
    });

})();