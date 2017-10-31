process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Concorrentes ', () => {

    beforeEach( (done) => {
        let concorrentesModel =  mongoose.model('Concorrentes');
        new concorrentesModel().remove({}, (error, concorrentes) => {
            done();
        });
    });

    describe('/GET concorrentes', (done) =>  {

        it('return the concorrentes', (done) => {
            chai.request(server)
            .get('/api/concorrentes')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.an('array');
                done();
            });
        });

    });

    describe('/GET/:id_produto concorrentes', (done) =>  {

        it('return the concorrentes of the produtos', (done) => {

            let data = {
                nome: 'Teste inutil'
                ,descricao: 'Descrição produto inutik'
                ,preco: 0.00
                ,empresa:
                ,photo: ''
            }

            let produtoModel =  mongoose.model('Produto');
            let produto = new categoriaModel(data);

            categoria.save( (err, categoria) => {
                chai.request(server)
                .get('/api/concorrentes/'  + categoria.id )
                .send(produto)
                .end( (err, res) => {
                    res.body.status.should.be.equal('success');
                    res.body.data.should.be.an('array');
                    res.body.data[0].should.have.property('nome');
                    res.body.data[0].should.have.property('preco');
                    res.body.data[0].should.have.property('empresa');

                    done()
                })
            })
        });

    });

});
