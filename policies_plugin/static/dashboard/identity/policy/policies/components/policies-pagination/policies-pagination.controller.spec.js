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

        describe('$scope.goToPage()', function() {
            it('Test to check if correct page is returned', function() {
                    var expectation = 5;
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

        describe('$scope.lastPage()', function() {
            it('Test to check if last page is returned', function() {
                    var expectation = 9;
                    var $scope = {};
                    var controller = $controller('PaginationController', { $scope: $scope });
                    $scope.lastPage();
                    expect($scope.policies.currentPage).toEqual(expectation);
            });
        });

        describe('$scope.nextPage()', function() {
            it('Test to check if next page is returned', function() {
                    var $scope = {};
                    var controller = $controller('PaginationController', { $scope: $scope });
                    var expectation = $scope.policies.currentPage+1;
                    $scope.nextPage();
                    expect($scope.policies.currentPage).toEqual(expectation);
            });
        });

        describe('$scope.nextPage()', function() {
            it('Test to check if next page is returned', function() {
                    var $scope = {};
                    var controller = $controller('PaginationController', { $scope: $scope });
                    var expectation = $scope.policies.currentPage+3;
                    $scope.nextPage();
                    $scope.nextPage();
                    $scope.nextPage();
                    expect($scope.policies.currentPage).toEqual(expectation);
            });
        });

        describe('$scope.previousPage()', function() {
            it('Test to check if previous page is returned', function() {
                    var $scope = {};
                    var controller = $controller('PaginationController', { $scope: $scope });
                    var expectation = $scope.policies.currentPage;
                    $scope.nextPage();
                    $scope.previousPage();
                    expect($scope.policies.currentPage).toEqual(expectation);
            });
        });

        describe('$scope.previousPage()', function() {
            it('Test to check that page number is not less than 0', function() {
                    var $scope = {};
                    var controller = $controller('PaginationController', { $scope: $scope });
                    var expectation = 0;
                    $scope.previousPage();
                    $scope.previousPage();
                    $scope.previousPage();
                    expect($scope.policies.currentPage).toEqual(expectation);
            });
        });
    });

})();