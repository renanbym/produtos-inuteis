process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Produtos ', () => {

    beforeEach( (done) => {
        let produtoModel =  mongoose.model('Produto');
        new produtoModel().remove({}, (error, produto) => {
            done();
        });
    });

    describe('/POST produtos', (done) =>  {

        it('does not return the POST, because undefined fields or false value', (done) => {

            let produto = {
                descricao: 'Descrição produto inutik'
                ,preco: 0.00
                ,photo: ''
            }

            chai.request(server)
            .post('/api/produtos')
            .send(produto)
            .end( (err, res) => {
                res.should.have.status(401);
                res.body.status.should.be.equal('error');
                res.body.message.should.be.a('object');
                res.body.message.should.have.property('nome');
                res.body.message.nome.should.have.property('kind').eql('required');
                res.body.message.should.have.property('categorias');
                res.body.message.categorias.should.have.property('kind').eql('required');

                done();
            });

        });

        it('create produto', (done) => {

            let data = {
                nome: "Categoria Inutil"
                ,photo: "img.jpg"
            }

            let categoriaModel =  mongoose.model('Categoria');
            let categoria = new categoriaModel(data);

            categoria.save( (err, categoria) => {

                let produto = {
                    nome: 'Produto inutil'
                    ,descricao: 'Descrição produto inutik'
                    ,preco: 0.00
                    ,categorias: [{ categoria: categoria._id }]
                    ,photo: 'img.jpg'
                }

                chai.request(server)
                .post('/api/produtos')
                .send(produto)
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.equal('success');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('nome');
                    res.body.data.should.have.property('descricao');
                    res.body.data.should.have.property('preco');
                    res.body.data.should.have.property('photo');
                    res.body.data.should.have.property('categorias');
                    res.body.data.categorias.should.be.an('array');
                    done()
                })

            })

        })
    })


    describe('/GET produtos', (done) =>  {

        it('return the produtos', (done) => {
            chai.request(server)
            .get('/api/produtos')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.an('array');
                res.body.data[0].should.have.property('nome');
                res.body.data[0].should.have.property('descricao');
                res.body.data[0].should.have.property('preco');
                res.body.data[0].should.have.property('photo');
                res.body.data[0].should.have.property('categorias');
                res.body.data[0].categorias.should.be.an('array');

                done();
            });
        });

    });

    describe('/DELETE produtos', (done) =>  {

        it('delete produto id', (done) => {

            let dataCategoria = {
                nome: "Categoria Inutil"
                ,photo: "img.jpg"
            }

            let categoriaModel =  mongoose.model('Categoria');
            let categoria = new categoriaModel(dataCategoria);

            categoria.save( (err, dataCategoria) => {

                let data = {
                    nome: 'Produto inutil'
                    ,descricao: 'Descrição produto inutik'
                    ,preco: 0.00
                    ,categorias: [{ categoria: categoria._id }]
                    ,photo: 'img.jpg'
                }

                let produtoModel =  mongoose.model('Produto');
                let produto = new produtoModel(data);

                produto.save( (err, produto) => {
                    chai.request(server)
                    .delete('/api/produtos' )
                    .send({ _id: produto._id })
                    .end( (err, res) => {
                        res.body.status.should.be.equal('success');
                        done()
                    })
                })
            })

        })

    });

});
