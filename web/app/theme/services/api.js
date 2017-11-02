(function () {
    'use strict';

    angular.module('ProdutosInuteis.theme')
    .service('API', api);

    function api($resource, SweetAlert, $state) {

        var url = "/api/"

        return{
            get: function( obj , callback ){
                var params = obj.params ? obj.params : {}
                var path_params = obj.path_params ? obj.path_params : {}
                var api = $resource( url+ obj.path, obj.path_params );

                api.get(params).$promise
                .then(function( response ){


                    if( /2[0-9]{2}/.test(response.code) ){
                        if( typeof response.data != 'undefined' && response.data ) response = response.data;
                        callback( null, response )
                    }else{

                        var msg = typeof response.message.message != 'undefined' ? response.message.message : response.message;
                        SweetAlert.swal("Ops...", msg, "error");
                        // if( response.code == '401' ){
                        //     setTimeout( $state.go('auth') , 7000)
                        //
                        // }else{
                            callback( response.message, null )
                        // }
                    }


                })
                .catch(function(err){
                    SweetAlert.swal("Ops...", err.message, "error");
                    callback( err, null )
                })
            }

            ,all: function( obj , callback ){
                var params = obj.params ? obj.params : {}
                var path_params = obj.path_params ? obj.path_params : {}
                var api = $resource( url+ obj.path, obj.path_params, { method:'GET', isArray:false, cache: true} );

                api.query(params).$promise
                .then(function( response ){

                    callback( null, response )

                })
                .catch(function(err){

                    if( typeof err.data != 'undefined' && err.data.code == '203' ){
                        SweetAlert.swal("Ops...", err.message, "error");
                    }

                    callback( err, null )
                })
            }

            ,post: function( obj , callback ){
                var params = obj.params ? obj.params : {}
                var path_params = obj.path_params ? obj.path_params : {}
                var api = $resource( url + obj.path, obj.path_params );

                api.save(params).$promise
                .then(function( response ){

                    if( typeof response.code != 'undefined' ){

                        if(  /2[0-9]{2}/.test(response.code) ){
                            callback( null, response.data )
                        }else{
                            callback( response, null )
                            SweetAlert.swal("Ops...", response.message, "error");
                        }

                    }else{
                        callback( null, response )
                    }

                })
                .catch(function(err){
                    callback( err, null )
                })
            }

            ,delete: function( obj , callback ){
                var params = obj.params ? obj.params : {}
                var path_params = obj.path_params ? obj.path_params : {}
                var api = $resource( url + obj.path, obj.path_params );

                api.delete(params).$promise
                .then(function( response ){
                    callback( null, response )
                })
                .catch(function(err){
                    callback( err, null )
                })
            }


        }

    }
})();
