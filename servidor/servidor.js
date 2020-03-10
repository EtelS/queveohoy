//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var peliculaController = require('./controladores/peliculasController');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.get('/peliculas/recomendacion', peliculaController.recomendarPelicula);
app.get('/peliculas', peliculaController.mostrarPeliculas);
app.get('/generos', peliculaController.mostrarGeneros);
app.get('/peliculas/:id', peliculaController.obtenerPelicula);



//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

