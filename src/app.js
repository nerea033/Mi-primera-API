/**
 * Main configuration for the Express application.
 * 
 * Configures middlewares, routes, and other necessary options for the server.
 * 
 * @module app
 * @requires express
 * @requires morgan
 * @requires config
 */

//  Import necessary modules
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

/**
 * Import route modules for users, books, cart, favorites, and tickets.
 */
const users = require('./modulos/users/userRoutes.js');
const books = require('./modulos/books/bookRoutes.js');
const cart = require('./modulos/cart/cartRoutes.js');
const favorite = require('./modulos/favorite/favoriteRoutes.js');
const ticket = require('./modulos/ticket/ticketRoutes.js');

/**
 * Create a new instance of an Express application.
 * @type {express.Application}
 */
const app = express();

/**
 * Configure Morgan as middleware to log requests in the development environment.
 * Additionally, configure middlewares to parse JSON and URL-encoded form data.
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Set the port for the application using the imported configuration.
 */
app.set('port', config.app.port);

/**
 * Configure base routes for the modules.
 */
app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/cart', cart);
app.use('/api/favorite', favorite);
app.use('/api/ticket', ticket);

/**
 * Export the instance of the Express application to allow other modules to use it,
 * especially useful for server initialization in another module.
 * 
 * @type {express.Application}
 */
module.exports = app;