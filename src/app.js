/**
 * Configuración principal de la aplicación Express.
 * 
 * Configura middlewares, rutas y otras opciones necesarias para el servidor.
 * 
 * @module app
 * @requires express
 * @requires morgan
 * @requires config
 */

// Importación de módulos necesarios
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

/**
 * Importa los módulos de rutas para usuarios y libros
 */
const users = require('./modulos/users/userRoutes.js');
const books = require('./modulos/books/bookRoutes.js');

/**
 * Crea una nueva instancia de una aplicación Express.
 * @type {express.Application}
 */
const app = express();

/**
 * Configura Morgan como middleware para registrar solicitudes en el entorno de desarrollo.
 * Además, configura middlewares para parsear JSON y datos de URL-encoded forms
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Establece el puerto para la aplicación usando la configuración importada
 */
app.set('port', config.app.port);

/**
 * Configura las rutas base para los módulos
 */
app.use('/api/users', users);
app.use('/api/books', books);

/**
 * Exporta la instancia de la aplicación Express para permitir que otros módulos la utilicen,
 * especialmente útil para la inicialización del servidor en otro módulo
 * 
 * @type {express.Application}
 */
module.exports = app;