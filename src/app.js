// Importo los módulos necesarios
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

// Importo las rutas definidas en el archivo rutas.js
const users = require('./modulos/users/routes.js');
const books = require('./modulos/books/routes.js');

// Creo una nueva instancia de una aplicación Express llamada app. Esta instancia será usada para configurar el servidor.
const app = express();

// Middleware, lo usamos en el entorno de desarrollo (dev)
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Se está configurando el puerto en el que el servidor debe escuchar, que se obtiene del objeto config
app.set('port', config.app.port);

// configura las rutas para el manejo de solicitudes
app.use('/api/users', users);
app.use('/api/books', books);

// hace que la instancia de Express app esté disponible para ser utilizada por otros archivos en la aplicación
module.exports = app;