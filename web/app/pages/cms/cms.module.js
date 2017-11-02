(function () {
    'use strict';
    angular.module('ProdutosInuteis.pages.cms', [])
    .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('cms', {
            url: '/cms',
            templateUrl: '/pages/cms/views/produtos/lista.html',
            controller: 'CmsProdutosListaPageCtrl',
        })
        .state('cms-new', {
            url: '/cms/produtos/cadastro',
            templateUrl: '/pages/cms/views/produtos/cadastro.html',
            controller: 'CmsProdutosCadastroPageCtrl',
        })
        .state('cms-categoria', {
            url: '/cms/categorias',
            templateUrl: '/pages/cms/views/categorias/lista.html',
            controller: 'CmsCategoriasListaPageCtrl',
        })
        .state('cms-categoria-new', {
            url: '/cms/categorias/cadastro',
            templateUrl: '/pages/cms/views/categorias/cadastro.html',
            controller: 'CmsCategoriasCadastroPageCtrl',
        })

    }

})();
