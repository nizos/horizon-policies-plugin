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
        $scope.policies = [];
        $scope.filteredPolicies = [];
        // Table sort scopes
        $scope.column = 'target';
        $scope.reverse = false;
        // Table display scopes
        $scope.expandAll = false;
        // Table page scopes
        $scope.currentPage;
        $scope.itemsPerPage;
        $scope.nrOfPages;
        // Table item modal scopes
        $scope.showEditorModal = false;
        // Table selected policies scopes
        $scope.selectedPolicies = {
            policies: []
        }
        $scope.ruleBackUp;
        $scope.visibleCols;
        $scope.colWidths;
        $scope.query;
        $scope.searchProject = true;
        $scope.searchTarget = true;
        $scope.searchRule = true;
        $scope.searchDefault = true;
        $scope.searchScopes = true;
        $scope.searchOperations = true;
        $scope.searchDescription = true;
        $scope.visibleColumns = {
            project:        true,
            target:         true,
            rule:           true,
            defaultRule:    true,
            scopes:         true,
            operations:     true,
            description:    true
        };

        init();

        // Functions to run on page load
        function init() {
            restoreItemsPerPage();
            restoreCurrentPage();
            restoreVisibleColumns();
            restoreColumnWidths();
            api.getRules().success(getRulesSuccess);
        }

        // Table column functions
        $scope.$watch(function () {
            return parseInt(document.querySelector('#project-column-header').style.width);
           }, storeColumnWidths());

        $scope.$watch(function () {
            return parseInt(document.querySelector('#target-column-header').style.width);
           }, storeColumnWidths());

        $scope.$watch(function () {
            return parseInt(document.querySelector('#rule-column-header').style.width);
           }, storeColumnWidths());

        $scope.$watch(function () {
            return parseInt(document.querySelector('#default-column-header').style.width);
           }, storeColumnWidths());

        $scope.$watch(function () {
            return parseInt(document.querySelector('#scopes-column-header').style.width);
           }, storeColumnWidths());

        $scope.$watch(function () {
            return parseInt(document.querySelector('#operations-column-header').style.width);
           }, storeColumnWidths());

        $scope.$watch(function () {
            return parseInt(document.querySelector('#description-column-header').style.width);
           }, storeColumnWidths());


        $scope.storeItemsPerPage = function() {
            localStorage.setItem("itemsPerPage", $scope.itemsPerPage);
        }

        function restoreItemsPerPage() {
            if (localStorage.getItem('itemsPerPage') != null){
                $scope.itemsPerPage = localStorage.getItem('itemsPerPage');
            } else {
                $scope.itemsPerPage = 20;
            }
        }

        function storeCurrentPage() {
            localStorage.setItem("currentPage", $scope.currentPage);
        }

        function restoreCurrentPage() {
            if (localStorage.getItem('currentPage') != null){
                $scope.currentPage = localStorage.getItem('currentPage');
            } else {
                $scope.currentPage = 0;
            }
        }

        $scope.storeVisibleColumns = function() {
            const columns = {
                'project':      $scope.visibleColumns.project,
                'target':       $scope.visibleColumns.target,
                'rule':         $scope.visibleColumns.rule,
                'defaultRule':  $scope.visibleColumns.defaultRule,
                'scopes':       $scope.visibleColumns.scopes,
                'operations':   $scope.visibleColumns.operations,
                'description':  $scope.visibleColumns.description
            }
            localStorage.setItem("visibleColumns", JSON.stringify(columns));
        }

        function restoreVisibleColumns() {
            if (localStorage.getItem('visibleColumns') != null){
                const columns = JSON.parse(localStorage.getItem('visibleColumns'));
                $scope.visibleColumns.project =       columns['project'];
                $scope.visibleColumns.target =        columns['target'];
                $scope.visibleColumns.rule =          columns['rule'];
                $scope.visibleColumns.defaultRule =   columns['defaultRule'];
                $scope.visibleColumns.scopes =        columns['scopes'];
                $scope.visibleColumns.operations =    columns['operations'];
                $scope.visibleColumns.description =   columns['description'];
            }
        }

        function storeColumnWidths() {
            const columns = {
                'project':      parseInt(document.querySelector('#project-column-header').style.width),
                'target':       parseInt(document.querySelector('#target-column-header').style.width),
                'rule':         parseInt(document.querySelector('#rule-column-header').style.width),
                'defaultRule':  parseInt(document.querySelector('#default-column-header').style.width),
                'scopes':       parseInt(document.querySelector('#scopes-column-header').style.width),
                'operations':   parseInt(document.querySelector('#operations-column-header').style.width),
                'description':  parseInt(document.querySelector('#description-column-header').style.width)
            }
            localStorage.setItem("columnWidths", JSON.stringify(columns));
        }

        function restoreColumnWidths() {
            if (localStorage.getItem('columnWidths') != null){
                const columns = JSON.parse(localStorage.getItem('columnWidths'));
                document.querySelector('#project-column-header').style.width =      columns['project'] + 'px';
                document.querySelector('#target-column-header').style.width =       columns['target'] + 'px';
                document.querySelector('#rule-column-header').style.width =         columns['rule'] + 'px';
                document.querySelector('#default-column-header').style.width =      columns['defaultRule'] + 'px';
                document.querySelector('#scopes-column-header').style.width =       columns['scopes'] + 'px';
                document.querySelector('#operations-column-header').style.width =   columns['operations'] + 'px';
                document.querySelector('#description-column-header').style.width =  columns['description'] + 'px';
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
            $scope.policies = response;
            $scope.policies.forEach(function(policy) {
                policy.expanded=false;
            });
            $scope.filteredPolicies = $scope.policies;
            $scope.updateView();
        }

        $scope.getRule=function(project, target){
            api.getRule(project, target).success(getRuleSuccess);
        }

        $scope.backupRule=function(rule) {
            $scope.ruleBackUp = rule;
        }

        // Table display functions
        $scope.expandSelected=function(policy){
            if(policy.expanded==true) {
                $scope.policies.forEach(function(i){
                    i.expanded=false;
                })
            } else {
                $scope.policies.forEach(function(i){
                    i.expanded=false;
                    i.listLimit=1;
                })
                policy.expanded=true;
            }
        }

        $scope.selectedPoliciesChanged=function() {
            $scope.selectedPolicies.policies.length > 0 ? $scope.showEditorModal = true : $scope.showEditorModal = false;
        }

        // Table page navigation functions
        $scope.numberOfPages=function(){
            return Math.ceil($scope.filteredPolicies.length/$scope.itemsPerPage);
        }

        $scope.updateNumberOfPages = function() {
            $scope.nrOfPages = Math.ceil($scope.filteredPolicies.length/$scope.itemsPerPage);
        }

        $scope.goToNextPage=function(){
            if($scope.currentPage < $scope.nrOfPages-1) {
                $scope.currentPage = $scope.currentPage+1;
            }
            storeCurrentPage();
        }

        $scope.goToPreviousPage=function(){
            if($scope.currentPage >= 1) {
                $scope.currentPage = $scope.currentPage-1;
            }
            storeCurrentPage();
        }

        $scope.goToFirstPage=function(){
            $scope.currentPage = 0;
            storeCurrentPage();
        }

        $scope.goToLastPage=function(){
            $scope.currentPage = $scope.nrOfPages-1;
            storeCurrentPage();
        }

        $scope.goToPage=function(page){
            $scope.currentPage = page;
            storeCurrentPage();
        }

        $scope.toggleExpandAll=function(){
            if($scope.expandAll==false) {
                $scope.policies.forEach(function(i){
                    i.expanded=true;
                    i.listLimit=10000;
                })
                $scope.expandAll = true;
            } else {
                $scope.policies.forEach(function(i){
                    i.expanded=false;
                    i.listLimit=1;
                })
                $scope.expandAll = false;
            }
        }

        // Refresh button function
        $scope.refreshPolicies = function() {
            $scope.policies = [];
            getRules();
        }

        // Table search functions
        $scope.$watch('query', function(newValue, oldValue) {
            if(oldValue!=newValue) {
                filterPolicies();
                $scope.updateView();
            }
        },true);

        $scope.updateView = function() {
            $scope.currentPage = 0;
            $scope.updateNumberOfPages();
        }


        function filterPolicies() {
            // search is empty
            if (!$scope.query || $scope.query == '' || $scope.query == undefined) {
                $scope.filteredPolicies = [];
                $scope.filteredPolicies = $scope.policies;
            }

            let filtered = [];
            for (let i = 0; i < $scope.policies.length; i++) {
                let policy = $scope.policies[i];
                let added = false;
                const query = $scope.query.toLowerCase();

                if ($scope.searchProject) {
                    if (policy['project'].toLowerCase().indexOf(query) != -1) {
                        filtered.push(policy);
                        added = true;
                    }
                }
                if ($scope.searchTarget && !added) {
                    if (policy['target'].toLowerCase().indexOf(query) != -1) {
                        filtered.push(policy);
                        added = true;
                    }
                }
                if ($scope.searchRule && !added) {
                    if (policy['rule'].toLowerCase().indexOf(query) != -1) {
                        filtered.push(policy);
                        added = true;
                    }
                }
                if ($scope.searchDefault && !added) {
                    if (policy['default'].toLowerCase().indexOf(query) != -1) {
                        filtered.push(policy);
                        added = true;
                    }
                }
                if ($scope.searchScopes && !added) {
                    for (let i = 0; i < policy['scopes'].length; i++) {
                        if (policy['scopes'][i].toLowerCase().indexOf(query) != -1 && !added) {
                            filtered.push(policy);
                            added = true;
                        }
                    }

                }
                if ($scope.searchOperations && !added) {
                    for (let i = 0; i < policy['operations'].length; i++) {
                        if (policy['operations'][i].toLowerCase().indexOf(query) != -1 && !added) {
                            filtered.push(policy);
                            added = true;
                        }
                    }
                }
                if ($scope.searchDescription && !added) {
                    if (policy['description'].toLowerCase().indexOf(query) != -1) {
                        filtered.push(policy);
                        added = true;
                    }
                }
            }
            $scope.filteredPolicies = [];
            $scope.filteredPolicies = filtered;
        }

        // Table sort functions
        $scope.sortColumn = function(col) {
            $scope.column = col;
            if($scope.reverse) {
                $scope.reverse = false;
            } else {
                $scope.reverse = true;
            }
        };

        // Plugin details modal functions
        $scope.OpenModal = function(policy){
            var modalInstance = $uibModal.open({
                ariaLabelledBy:     'modal-title',
                ariaDescribedBy:    'modal-body',
                templateUrl:        'static/dashboard/identity/policy/policies/details/details.html',
                controller:         'detailsController',
                controllerAs:       '$ctrl',
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

        // Table item modal functions
        $scope.openDetailsModal = function(){
            const detailsModalInstance = $uibModal.open({
                ariaLabelledBy:     'modal-title',
                ariaDescribedBy:    'modal-body',
                templateUrl:        'static/dashboard/identity/policy/policies/editor/editor.html',
                controller:         'EditorController',
                controllerAs:       '$ctrl',
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
                ariaLabelledBy:     'modal-title',
                ariaDescribedBy:    'modal-body',
                templateUrl:        'static/dashboard/identity/policy/policies/info/info.html',
                controller:         'InfoController',
                controllerAs:       '$ctrl'
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
