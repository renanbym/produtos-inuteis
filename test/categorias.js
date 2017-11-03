process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Categorias ', () => {

    beforeEach( (done) => {
        let categoriaModel =  mongoose.model('Categoria');
        new categoriaModel().remove({}, (error, categoria) => {
            done();
        });
    });

    describe('/POST categorias', (done) =>  {

        it('does not return the POST, because undefined', (done) => {

            let data = {
                foto: ''
            }

            chai.request(server)
            .post('/api/categorias')
            .send(data)
            .end( (err, res) => {
                res.should.have.status(401);
                res.body.status.should.be.equal('error');
                res.body.message.should.be.a('object');
                res.body.message.should.have.property('nome');
                res.body.message.nome.should.have.property('kind').eql('required');
                done();
            });

        });

        it('create categoria', (done) => {

            let data = {
                nome: 'Categoria Inútil'
                ,foto: 'img.jpg'
            }

            chai.request(server)
            .post('/api/categorias')
            .send(data)
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('nome');
                res.body.data.should.have.property('foto');
                done()
            })
        })
    })


    describe('/GET categorias', (done) =>  {

        it('return the categorias', (done) => {
            chai.request(server)
            .get('/api/categorias')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.an('array');
                done();
            });
        });

    });

    describe('/DELETE categorias', (done) =>  {

        it('delete categoria id', (done) => {

            let data = {
                nome: 'Categoria Inútil'
                ,photo: ''
            }

            let categoriaModel =  mongoose.model('Categoria');
            let categoria = new categoriaModel(data);

            categoria.save( (err, categoria) => {
                chai.request(server)
                .delete('/api/categorias/'+categoria._id )
                .send({ _id: categoria._id })
                .end( (err, res) => {
                    res.body.status.should.be.equal('success');
                    done()
                })
            })

        })

    });

});
