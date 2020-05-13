(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.scroll-up')
        .controller('ScrollUpController', ScrollUpController);

    ScrollUpController.$inject = [
        '$scope',
        '$anchorScroll'
    ];

    function ScrollUpController($scope, $anchorScroll) {
        var $ctrl = this;
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

})();
