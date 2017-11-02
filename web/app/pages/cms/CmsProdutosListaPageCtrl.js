(function() {
    'use strict';
    angular.module('ProdutosInuteis.pages.cms')
    .controller('CmsProdutosListaPageCtrl', CmsProdutosListaPageCtrl)

    function CmsProdutosListaPageCtrl($scope, $rootScope, API) {

        $scope.produtos = [];
        $rootScope.cms = true;

        API.get({
            path: 'produtos'
        }, function(err, response){
            $scope.produtos = response;
        })


        $scope.delete = function(data) {

            API.delete( {
                path: 'produtos/:id'
                , path_params :{ id: data._id }
            }, function(err, res){

                var index = $scope.produtos.findIndex(function(obj) {
                    return obj._id == data._id ? true : false
                })
                $scope.produtos.splice(index, 1);
                swal({
                    title: "Excluido!",
                    text: "com sucesso.",
                    icon: "success"
                })
            })

        }
    }


})();
