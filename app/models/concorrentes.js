const request = require('request');
const cheerio = require('cheerio');


module.exports = (app) => {
    const concorrentes = {}
    concorrentes.requestSubmarino = ( params ) =>{

        return new Promise((resolve, reject) => {
            let term = params.term;
            request('https://www.submarino.com.br/busca?conteudo='+term, (err, response, body) => {
                if(err) reject( err );
                let products = [];
                let $ = cheerio.load(body);
                let offers = $('[data-component="productgrid"]');

                offers.find('.product-grid-item').each( (i, elem) => {
                    let produtos = offers.find('.product-grid-item').eq(i).find('.card-product');
                    let str_photo = produtos.find('.card-product-figure figure picture').html();
                    let photo = /\<img.*src\=\"(.*)\".*class=\"card\-product\-picture.*/gim.exec( str_photo );
                    let nome = produtos.find('.card-product-details .card-product-name').html();
                    let preco = produtos.find('.card-product-details .card-product-offers .card-product-prices .card-product-price span').eq(1).html();

                    let obj = {
                        nome: nome
                        ,descricao:  ''
                        ,empresa:  'Submarino'
                        ,preco:  (preco.replace(/\./gi, '')).replace(/\,/gi, '.')
                        ,photo:  photo[1]
                    }

                    products.push( obj );
                })

                resolve( products );
            })


        })
    }

    concorrentes.requestWallmart = ( params ) =>{

        return new Promise((resolve, reject) => {

            let term = params.term;
            request('https://www.walmart.com.br/busca/?ft='+term, (err, response, body) => {
                    if(err) reject( err );
                let products = [];
                let $ = cheerio.load(body);
                let offers = $('#product-list');

                offers.find('.shelf ul .shelf-product-item').each( (i, elem) => {
                    let produtos = offers.find('.shelf ul .shelf-product-item').eq(i);
                    let str_photo = produtos.find('.product-figure').html();
                    let photo = /\<img.*src\=\"(.*)\".*alt.*/gim.exec( str_photo );
                    let nome = produtos.find('.product-title').html();
                    let preco = produtos.find('.card-footer .card-price .price-sell .price-value .int').html()+produtos.find('.card-footer .card-price .price-sell .price-value .dec').html();

                    let obj = {
                        nome: nome
                        ,descricao:  ''
                        ,empresa:  'Wallmart'
                        ,preco:  (preco.replace(/\./gi, '')).replace(/\,/gi, '.')
                        ,photo:  photo[1]
                    }

                    products.push( obj );
                })
                resolve( products );

            })
        })
    }

    return concorrentes;
}
