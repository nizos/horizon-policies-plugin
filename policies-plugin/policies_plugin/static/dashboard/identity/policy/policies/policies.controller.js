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
        'horizon.dashboard.identity.policy.policies.api',
        '$scope',
        '$uibModal',
        '$filter'
    ];

  /**
   * @ngdoc controller
   * @name PoliciesController
   * @description
   * Controller for the policies table. Serves as the focal point for table actions.
   * @param api The policies client service API.
   * @returns undefined
   */
    function PoliciesController(api, $scope, $uibModal, $filter) {

        // Table data scopes
        $scope.data = [];
        $scope.singlePolicy = [];
        $scope.policy = [];
        // Table search scope
        $scope.query = '';
        // Table filter scopes
        $scope.projectColumnVisible = true;
        $scope.targetColumnVisible = true;
        $scope.ruleColumnVisible = true;
        $scope.defaultRuleColumnVisible = false;
        $scope.scopesColumnVisible = false;
        $scope.operationsColumnVisible = false;
        $scope.descriptionColumnVisible = true;
        // Table sort scopes
        $scope.column = 'target';
        $scope.reverse = false;
        // Table display scopes
        $scope.expandAll = false;
        // Table page scopes
        $scope.currentPage = 0;
        $scope.itemsPerPage = 20;
        // Table item modal scopes
        $scope.showEditorModal = false;
        // Table selected policies scopes
        $scope.policies = [];
        $scope.selectedPolicies = {
            policies: []
        }

        $scope.ruleBackUp = "";
        $scope.visibleCols;
        $scope.colWidths;

        init();

        // Functions to run on page load
        function init() {
            loadVisibleCols();
            loadColWidths();
            api.getRules().success(getRulesSuccess);
        }

        // Table column functions
        $scope.$watch(function () {
            return parseInt(document.querySelector('#project-column-header').style.width);
           }, function(newVal, oldVal) {
            saveColWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#target-column-header').style.width);
           }, function(newVal, oldVal) {
            saveColWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#rule-column-header').style.width);
           }, function(newVal, oldVal) {
            saveColWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#default-column-header').style.width);
           }, function(newVal, oldVal) {
            saveColWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#scopes-column-header').style.width);
           }, function(newVal, oldVal) {
            saveColWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#operations-column-header').style.width);
           }, function(newVal, oldVal) {
            saveColWidths();
        });

        $scope.$watch(function () {
            return parseInt(document.querySelector('#description-column-header').style.width);
           }, function(newVal, oldVal) {
            saveColWidths();
        });

        $scope.saveVisibleCols = function() {
            $scope.visibleCols = {
                'project' : $scope.projectColumnVisible,
                'target' : $scope.targetColumnVisible,
                'rule' : $scope.ruleColumnVisible,
                'default' : $scope.defaultRuleColumnVisible,
                'scopes' : $scope.scopesColumnVisible,
                'operations' : $scope.operationsColumnVisible,
                'description' : $scope.descriptionColumnVisible
            }
            localStorage.setItem("visibleCols", JSON.stringify($scope.visibleCols));
        }

        function loadVisibleCols() {
            if (localStorage.getItem('visibleCols') != null){
                $scope.visibleCols = JSON.parse(localStorage.getItem('visibleCols'));
                $scope.projectColumnVisible = $scope.visibleCols['project'];
                $scope.targetColumnVisible = $scope.visibleCols['target'];
                $scope.ruleColumnVisible = $scope.visibleCols['rule'];
                $scope.defaultRuleColumnVisible = $scope.visibleCols['default'];
                $scope.scopesColumnVisible = $scope.visibleCols['scopes'];
                $scope.operationsColumnVisible = $scope.visibleCols['operations'];
                $scope.descriptionColumnVisible = $scope.visibleCols['description'];
            }
        }

        function saveColWidths() {
            $scope.colWidths = {
                'project' : parseInt(document.querySelector('#project-column-header').style.width),
                'target' : parseInt(document.querySelector('#target-column-header').style.width),
                'rule' : parseInt(document.querySelector('#rule-column-header').style.width),
                'default' : parseInt(document.querySelector('#default-column-header').style.width),
                'scopes' : parseInt(document.querySelector('#scopes-column-header').style.width),
                'operations' : parseInt(document.querySelector('#operations-column-header').style.width),
                'description' : parseInt(document.querySelector('#description-column-header').style.width)
            }
            localStorage.setItem("colWidths", JSON.stringify($scope.colWidths));
        }

        function loadColWidths() {
            if (localStorage.getItem('colWidths') != null){
                $scope.colWidths = JSON.parse(localStorage.getItem('colWidths'));
                document.querySelector('#project-column-header').style.width = $scope.colWidths['project'] + 'px';
                document.querySelector('#target-column-header').style.width = $scope.colWidths['target'] + 'px';
                document.querySelector('#rule-column-header').style.width = $scope.colWidths['rule'] + 'px';
                document.querySelector('#default-column-header').style.width = $scope.colWidths['default'] + 'px';
                document.querySelector('#scopes-column-header').style.width = $scope.colWidths['scopes'] + 'px';
                document.querySelector('#operations-column-header').style.width = $scope.colWidths['operations'] + 'px';
                document.querySelector('#description-column-header').style.width = $scope.colWidths['description'] + 'px';
            }
        }

        // API functions
        function getRules() {
            api.getRules().success(getRulesSuccess);
        }

        function getRuleSuccess(response) {
            $scope.singlePolicy = response;
        }

        function setRules(rules) {
            api.setRules(rules).success(getRules);
        }

        $scope.setRule = function(rule) {
            api.setRule(rule).success(getRules);
        }

        function getRulesSuccess(response) {
            $scope.data = response;
            $scope.data.forEach(function(item) {
                item.expanded=false;
                item.listLimit=1;
            })
        }

        $scope.getRule=function(project, target){
            api.getRule(project, target).success(getRuleSuccess);
        }

        $scope.backupRule=function(rule) {
            $scope.ruleBackUp = rule;
        }

        // Table display functions
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

        $scope.selectedPoliciesChanged=function() {
            $scope.selectedPolicies.policies.length > 0 ? $scope.showEditorModal = true : $scope.showEditorModal = false;
        }

        $scope.getData = function () {
            return $filter('filter')($scope.data, $scope.query)
        }

        // Table page navigation functions
        $scope.numberOfPages=function(){
            return Math.ceil($scope.getData().length/$scope.itemsPerPage);
        }

        $scope.goToNextPage=function(){
            if($scope.currentPage < $scope.numberOfPages()-1) {
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

        // Table search functions
        $scope.$watch('query', function(newValue, oldValue) {
            if(oldValue!=newValue) {
                $scope.currentPage = 0;
            }
        },true);

        // Table sort functions
        $scope.sortColumn = function(col) {
            $scope.column = col;
            if($scope.reverse) {
                $scope.reverse = false;
            } else {
                $scope.reverse = true;
            }
        };

        // Table item modal functions
        $scope.openDetailsModal = function(){
            const detailsModalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'static/dashboard/identity/policy/policies/editor/editor.html',
                controller: 'EditorController',
                controllerAs: '$ctrl',
                resolve: {
                    $policy: function () {
                        return $scope.selectedPolicies.policies;
                    }
                }
            });

            detailsModalInstance.result.then(function (rules) {
                setRules(rules);
                $scope.selectedPolicies.policies = null;
            });
        }


        // Plugin Info modal functions
        $scope.openInfoModal = function(){
            const infoModalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'static/dashboard/identity/policy/policies/info/info.html',
                controller: 'InfoController',
                controllerAs: '$ctrl'
            });

            infoModalInstance.result.then(function () {});
        }
    }
    // Scroll to top button controller
    angular
        .module('horizon.dashboard.identity.policy.policies')
        .controller('ScrollController', [
            '$scope',
            '$anchorScroll',
            function($scope, $anchorScroll) {
                let lastScrollTop = 100;
                $(window).scroll(function(event){
                    const st = $(this).scrollTop();
                    if (st > lastScrollTop){
                        $('#btnUp').fadeIn();
                    } else {
                        $('#btnUp').fadeOut();
                    }
                    lastScrollTop = st;
                });
                $scope.gotoTop = function() {
                    $("html, body").animate({ scrollTop: 0 }, 100);
                    $anchorScroll();
                };
            }
        ]);

})();
