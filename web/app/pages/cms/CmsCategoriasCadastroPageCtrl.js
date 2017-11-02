(function() {
    'use strict';
    angular.module('ProdutosInuteis.pages.cms')
    .controller('CmsCategoriasCadastroPageCtrl', CmsCategoriasCadastroPageCtrl)

    function CmsCategoriasCadastroPageCtrl($scope, $state,  API) {
        $scope.data = {}

        $scope.save = function() {

            API.post({
                path: 'categorias'
                ,params: $scope.data

            }, function(err, response){
                if( err ) alert( err );
                $state.go('cms-categoria', {}, { reload: true });

            });

        };

    }


})();
