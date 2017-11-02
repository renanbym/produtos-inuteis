(function () {
    'use strict';
    angular.module('ProdutosInuteis.pages.cms', [])
    .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('cms', {
            url: '/cms',
            templateUrl: '/pages/cms/views/lista.html',
            controller: 'CmsProdutosPageCtrl',
        })

    }

})();
