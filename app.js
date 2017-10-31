const credentials = require('./config/config')[process.env.NODE_ENV];
const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');

const db = mongoose.connect( credentials.db_host, {
   useMongoClient: true
});
db.on('connected', function () {
    console.log('Mongoose default connection', credentials.db_host);
});
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './web');

app.use('/public', express.static('./web'));
app.use('/node_modules', express.static('./node_modules'));
app.disable('x-powered-by');
app.set('trust proxy', 1);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

load('models',{cwd: 'app'})
.then('controllers')
.then('routes')
.into( app );

app.get('/', (req, res) => {
   res.render('index.ejs');
})

app.get('/401', function(req, res) {res.render('error.ejs', {codigo: '401',msg: 'Você não têm autorização para ver este conteudo!',})})
app.get('/404', function(req, res) {res.render('error.ejs', {codigo: '404',msg: 'Não foi possivel encontrar essa pagina',})})
app.get('/503', function(req, res) {res.render('error.ejs', {codigo: '503',msg: 'Este conteudo expirou!',})})


server.listen( credentials.port )
.on('listening', () => {
   console.log('run, forest!', process.env.NODE_ENV, credentials.port)
})

module.exports = app;
