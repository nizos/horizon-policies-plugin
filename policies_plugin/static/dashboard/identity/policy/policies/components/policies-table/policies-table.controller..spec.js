(function() {
    'use strict';

    describe('horizon.dashboard.identity.policy.policies.components.policies-table TableController', function() {
        let mockSvc;

        beforeEach(module('horizon.dashboard.identity.policy.policies.components.policies-table'));
        beforeEach(module('mockServiceProvider'));

        beforeEach(function () {
            module(function ($provide, mockServiceProvider) {
                mockServiceProvider.mockToastServiceModule($provide);
            });

            inject(function (mockService) {
                mockSvc = mockService;
                mockSvc.configureToastServiceMock();

                mockSvc.getController()('testController', {
                    '$scope': mockSvc.getScope(),
                    'toastService': mockSvc.configureToastServiceMock()
                });
            });
        });

        it('should set the table sort column to the provided column name', function () {
            // Arrange
            let expectedValue = 'rule';
            let scope = mockSvc.getScope();
            scope.column = 'target';

            // Act
            scope.sortColumn(expectedValue);

            mockSvc.resolveTSMock(true, expectedValue);
            scope.$apply();

            // Assert
            expect(scope.column).toBe(expectedValue);
        });

        it('should set the table sort in the reverse order', function () {
            // Arrange
            let expectedValue = true;
            let scope = mockSvc.getScope();
            scope.reverse = false;
            scope.column = 'target';

            // Act
            scope.sortColumn(scope.column);

            mockSvc.resolveTSMock(false, expectedValue);
            scope.$apply();

            // Assert
            expect(scope.reverse).toBe(expectedValue);
        });

    })

})();
