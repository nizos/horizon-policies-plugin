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

        /*$scope.name = 'World';
        $scope.policy = [];
        $scope.editedPolicy = [];
        $scope.editedPolicy.project = "None";
        $scope.editedPolicy.target = "None";
        $scope.editedPolicy.rule = "None";
        $scope.editedPolicy.default = "None";
        $scope.editedPolicy.scopes = "None";
        $scope.editedPolicy.operations = "None";
        $scope.editedPolicy.description = "None";*/


        init();

        function init() {
            api.getPolicies().success(policiesSuccess);
        }

        function policiesSuccess(response) {
            $scope.data = response.items;
            $scope.data.forEach(function(item){
                item.expanded=false;
                item.listLimit=1;
            })
        }

        function policySuccess(response) {
            $scope.singlePolicy = response.item;
        }

        function setPolicySuccess(response) {
            $scope.singlePolicy = response.item;
        }

        $scope.getPolicy=function(project, target){
            api.getPolicy(project, target).success(policySuccess);
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
                templateUrl: 'static/dashboard/identity/policy/policies/details.html',
                controller: 'modalController',
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

    angular
        .module('horizon.dashboard.identity.policy.policies')
        .controller('modalController', [
            '$uibModalInstance',
            '$log',
            '$scope',
            '$policy',
            function($uibModalInstance, $log, $scope, $policy) {

                var $ctrl = this;
                $ctrl.policy = $policy;

                $scope.ok = function(policy) {
                    $uibModalInstance.close(policy);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                $scope.addScope = function() {
                    $ctrl.policy.scopes.push("");
                }

                $scope.addOperation = function() {
                    $ctrl.policy.operations.push("");
                }

                $scope.removeScope = function(index) {
                    $ctrl.policy.scopes.splice(index, 1);
                }

                $scope.removeOperation = function(index) {
                    $ctrl.policy.operations.splice(index, 1);
                }

            }
        ]);

})();
