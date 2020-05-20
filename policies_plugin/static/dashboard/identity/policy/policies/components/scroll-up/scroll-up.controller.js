(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.scroll-up')
        .controller('ScrollUpController', ScrollUpController);

    ScrollUpController.$inject = [
        '$anchorScroll'
    ];

    function ScrollUpController($anchorScroll) {
        let $scrCtrl = this;
        $scrCtrl.lastScrollTop = 100;
        $(window).scroll(function(event){
            const st = $(this).scrollTop();
            if (st > $scrCtrl.lastScrollTop){
                $('#btnUp').fadeIn();
            } else {
                $('#btnUp').fadeOut();
            };
            $scrCtrl.lastScrollTop = st;
        });
        $scrCtrl.gotoTop = function() {
            $("html, body").animate({ scrollTop: 0 }, 100);
            $anchorScroll();
        };
    };

})();
