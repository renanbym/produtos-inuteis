(function () {
    'use strict';
    angular.module('ProdutosInuteis.pages.produtos', [])
    .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('produtos', {
            url: '/produtos',
            templateUrl: '/pages/produtos/views/lista.html',
            controller: 'ProdutosPageCtrl',
        })

    }

})();
