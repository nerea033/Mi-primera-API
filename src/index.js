/**
 * Main module that starts the HTTP server.
 * 
 * @module index
 * @requires app
 */

/**
 * Loads the app module from the 'app.js' file.
 * This module contains the Express configuration and application initialization.
 * @type {Express.Application}
 */
const app = require('./app');


/**
 * Starts the server to listen on a specific port, allowing the application to receive HTTP requests.
 * Uses the listen method of Express to start the server on the port obtained from the app object.
 * 
 * The 'get' function of Express is used to retrieve the value of the port configuration.
 * 
 * @see {@link https://expressjs.com/en/4x/api.html#app.listen Express Application.listen()}
 * @see {@link https://expressjs.com/en/4x/api.html#app.get Express Application.get()}
 */
app.listen(app.get('port'), () => { 
    /**
     * Callback executed once the server has started listening on the specified port.
     * Displays a message in the console indicating which port the server is listening on.
     */
    console.log("Servidor escuchando en el puerto ", app.get("port"))
})