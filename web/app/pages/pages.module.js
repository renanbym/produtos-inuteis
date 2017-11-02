(function () {
    'use strict';

    angular.module('ProdutosInuteis.pages', [
        'ui.router',
        'ProdutosInuteis.pages.cms',
        'ProdutosInuteis.pages.produtos',
    ])
    .config(routeConfig);

    function routeConfig($urlRouterProvider) {
        /*
        BUG  UI-routee
        */
        $urlRouterProvider.otherwise('/');
        // $urlRouterProvider.otherwise( function($injector) {
            // var $state = $injector.get("$state");
            // $state.go('auth');
        // });

    }

})();
