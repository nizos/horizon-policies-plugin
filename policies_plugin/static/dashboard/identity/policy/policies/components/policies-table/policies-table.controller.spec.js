(function() {
    'use strict';

    describe('TableController', function() {
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

        describe('$scope.sortColumn()', function() {
            it('Sets the table´s column sort according to the passed variable', function() {
                    var expectation = 'rule';
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    $scope.column = 'target';
                    $scope.sortColumn(expectation);
                    expect($scope.column).toEqual(expectation);
            });
        });

        describe('$scope.sortColumn()', function() {
            it('Reverses the table´s column sort order if the passed variable is the same as the currently set column sort value', function() {
                var expectation = true;
                var $scope = {};
                var controller = $controller('TableController', { $scope: $scope });
                $scope.column = 'target';
                $scope.reverse = false;
                $scope.sortColumn($scope.column);
                expect($scope.reverse).toEqual(expectation);
            });
        });

        describe('$scope.selectedPoliciesChanged()', function() {
            it('Test to check if Editor modal will show up if a policy has been selected', function() {
                    var expectation = true;
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    $scope.selectedPolicies.policies.length = 1;
                    $scope.selectedPoliciesChanged();
                    expect($scope.showEditorModal).toEqual(expectation);
            });
        });

        describe('$scope.selectedPoliciesChanged()', function() {
            it('Test to check that Editor modal remains hidden when no policy is selected', function() {
                    var expectation = false;
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    $scope.selectedPolicies.policies.length = 0;
                    $scope.selectedPoliciesChanged(expectation);
                    expect($scope.showEditorModal).toEqual(expectation);
            });
        });

        describe('$scope.toggleSelectAll()', function() {
            it('Test to select all policies', function() {
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    var expectation = $scope.policies.filteredPolicies.length;
                    $scope.toggleSelectAll();
                    expect($scope.selectedPolicies.policies.length).toEqual(expectation);
            });
        });

        describe('$scope.clearAllSelections', function() {
            it('Test to clear all selected policies ', function() {
                    var expectation = 0;
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    $scope.toggleSelectAll();
                    $scope.clearAllSelections();
                    expect($scope.selectedPolicies.policies.length).toEqual(expectation);
            });
        });

        describe('$scope.clearAllSelections', function() {
            it('Test to clear all selected policies', function() {
                    var expectation = false;
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    $scope.selectAllCheckBox = true;
                    $scope.clearAllSelections();
                    expect($scope.selectAllCheckBox).toEqual(expectation);
            });
        });

        describe('$scope.clearAllSelections', function() {
            it('Test to clear zero selected checkboxes', function() {
                    var expectation = false;
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    $scope.selectedPolicies.policies.length = 0;
                    $scope.clearAllSelections(expectation);
                    expect($scope.selectAllCheckBox).toEqual(expectation);
            });
        });

        describe('$scope.clearAllSelections', function() {
            it('Test to clear 100 selected checkboxes', function() {
                    var expectation = false;
                    var $scope = {};
                    var controller = $controller('TableController', { $scope: $scope });
                    $scope.selectedPolicies.policies.length = 100;
                    $scope.clearAllSelections(expectation);
                    expect($scope.selectAllCheckBox).toEqual(expectation);
            });
        });

    });

})();
