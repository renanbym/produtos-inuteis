(function() {
    'use strict';
    angular.module('ProdutosInuteis.pages.cms')
    .controller('CmsProdutosCadastroPageCtrl', CmsProdutosCadastroPageCtrl)

    function CmsProdutosCadastroPageCtrl($scope, $state, API) {

        $scope.categorias = [];
        $scope.data = {};

        API.get({
            path: 'categorias'
        }, function(err, response){
            $scope.categorias = response;
        });

        $scope.save = function() {

            var cat_format = $scope.data.categorias.map(function(c){
                return { categoria: c }
            })

            $scope.data.categorias = cat_format;

            API.post({
                path: 'produtos'
                ,params: $scope.data

            }, function(err, response){
                if( err ) alert( err );
                $state.go('cms', {}, { reload: true });

            });

        };


    }


})();
