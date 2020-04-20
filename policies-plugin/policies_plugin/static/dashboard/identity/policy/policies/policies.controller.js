/*
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies', ['ui.bootstrap'])
        .controller('PoliciesController', PoliciesController);

    PoliciesController.$inject = [
        'horizon.dashboard.identity.policy.policies.policy-api',
        '$scope',
        '$log',
        '$uibModal',
        '$anchorScroll'
    ];

  /**
   * @ngdoc controller
   * @name PoliciesController
   * @description
   * Controller for the policies table. Serves as the focal point for table actions.
   * @param api The policies client service API.
   * @returns undefined
   */
    function PoliciesController(api, $scope, $log, $uibModal, $anchorScroll) {

        var ctrl = this;
        $scope.data = [];
        $scope.singlePolicy = [];
        $scope.charLimit = 50;
        ctrl.checked = {};
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        $scope.query = '';
        $scope.column = 'target';
        $scope.reverse = false;
        $scope.items = {};

        $scope.policy = [];

        $scope.projectColumnVisible = true;
        $scope.targetColumnVisible = true;
        $scope.ruleColumnVisible = true;
        $scope.defaultRuleColumnVisible = false;
        $scope.scopesColumnVisible = false;
        $scope.operationsColumnVisible = false;
        $scope.descriptionColumnVisible = true;
        $scope.expandAll = false;

        $scope.columnWidth = {
            'width': getColumnWidth()+'%',
            'word-wrap': 'break-word'
        };

        init();

        function init() {
            api.getPolicies().success(getPoliciesSuccess);
        }

        function getPolicySuccess(response) {
            $scope.singlePolicy = response.item;
        }

        function setPolicySuccess(response) {
            $scope.singlePolicy = response.item;
        }

        function getPoliciesSuccess(response) {
            $scope.data = response.items;
            $scope.data.forEach(function(item){
                item.expanded=false;
                item.listLimit=1;
            })
        }

        $scope.getPolicy=function(project, target){
            api.getPolicy(project, target).success(getPolicySuccess);
        }

        $scope.expandSelected=function(item){
            if(item.expanded==true) {
                $scope.data.forEach(function(i){
                    i.expanded=false;
                    i.listLimit=1;
                })
            } else {
                $scope.data.forEach(function(i){
                    i.expanded=false;
                    i.listLimit=1;
                })
                item.expanded=true;
                item.listLimit=10000;
            }
        }

        $scope.numberOfPages=function(){
            return Math.ceil($scope.data.length/$scope.pageSize);
        }

        $scope.goToNextPage=function(){
            if($scope.currentPage < $scope.data.length/$scope.pageSize - 1) {
                $scope.currentPage = $scope.currentPage+1;
            }
        }

        $scope.goToPreviousPage=function(){
            if($scope.currentPage >= 1) {
                $scope.currentPage = $scope.currentPage-1;
            }
        }

        $scope.goToFirstPage=function(){
                $scope.currentPage = 0;
        }

        $scope.goToLastPage=function(){
            $scope.currentPage = $scope.numberOfPages()-1;
        }

        $scope.goToPage=function(page){
            $scope.currentPage = page;
        }

        function getColumnWidth() {

            var visibleColumns = 0;
            var totalWidth = 100;

            if($scope.projectColumnVisible == true) {
                visibleColumns = visibleColumns +1;
            }
            if($scope.targetColumnVisible == true) {
                visibleColumns = visibleColumns +1;
            }
            if($scope.ruleColumnVisible == true) {
                visibleColumns = visibleColumns +1;
            }
            if($scope.defaultRuleColumnVisible == true) {
                visibleColumns = visibleColumns +1;
            }
            if($scope.scopesColumnVisible == true) {
                visibleColumns = visibleColumns +1;
            }
            if($scope.operationsColumnVisible == true) {
                visibleColumns = visibleColumns +1;
            }
            if($scope.descriptionColumnVisible == true) {
                visibleColumns = visibleColumns +1;
            }

            var columnWidth = (totalWidth / visibleColumns);
            return columnWidth;
        }

        $scope.toggleExpandAll=function(){
            if($scope.expandAll==false) {
                $scope.data.forEach(function(i){
                    i.expanded=true;
                    i.listLimit=10000;
                })
                $scope.expandAll = true;
            } else {
                $scope.data.forEach(function(i){
                    i.expanded=false;
                    i.listLimit=1;
                })
                $scope.expandAll = false;
            }
        }

        $scope.$watch('query', function(newValue, oldValue) {
            if(oldValue!=newValue) {
                $scope.currentPage = 0;
            }
        },true);

        $scope.sortColumn = function(col) {
            $scope.column = col;
            if($scope.reverse) {
                $scope.reverse = false;
            } else {
                $scope.reverse = true;
            }
        };

        $scope.OpenModal = function(policy){
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'static/dashboard/identity/policy/policies/details/details.html',
                controller: 'detailsController',
                controllerAs: '$ctrl',
                resolve: {
                    $policy: function () {
                        return policy;
                    }
                }
            });

            modalInstance.result.then(function (policy) {
                api.setPolicy( { rule: policy } ).success(setPolicySuccess);
            }, function () {
            });
        }
    }

})();
