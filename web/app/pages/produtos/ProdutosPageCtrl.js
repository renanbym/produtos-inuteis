(function() {
    'use strict';
    angular.module('ProdutosInuteis.pages.produtos')
    .controller('ProdutosPageCtrl', produtosPageCtrl)

    function produtosPageCtrl($scope, $rootScope, API) {

        $scope.produtos = [];

        $rootScope.cms = false;

        API.get({
            path: 'produtos'
        }, function(err, response){
            response.map(function(c){ c.concorrentes.sort( function(a,b){ return parseFloat(b.preco) - parseFloat(a.preco) }); return c; })
            $scope.produtos =  response
        })

    }



})();
