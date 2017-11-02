(function() {
    'use strict';
    angular.module('ProdutosInuteis.pages.cms')
    .controller('CmsCategoriasListaPageCtrl', CmsCategoriasListaPageCtrl)

    function CmsCategoriasListaPageCtrl($scope, API) {

        $scope.categorias = [];

        API.get({
            path: 'categorias'
        }, function(err, response){
            $scope.categorias = response;
        });

        $scope.delete = function(data) {

            API.delete( {
                path: 'categorias/:id'
                , path_params :{ id: data._id }
            }, function(err, res){

                var index = $scope.categorias.findIndex(function(obj) {
                    return obj._id == data._id ? true : false
                })
                $scope.categorias.splice(index, 1);

                swal({
                    title: "Excluido!",
                    text: "com sucesso.",
                    icon: "success"
                })
            })

        }


    }


})();
