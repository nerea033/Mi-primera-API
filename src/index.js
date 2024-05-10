/**
 * Módulo principal que inicia el servidor HTTP.
 * 
 * @module index
 * @requires app
 */

/**
 * Carga el módulo app desde el archivo 'app.js'.
 * Este módulo contiene la configuración de Express y la inicialización de la aplicación.
 * @type {Express.Application}
 */
const app = require('./app');


/**
 * Inicia el servidor para escuchar en un puerto específico, permitiendo que la aplicación reciba peticiones HTTP.
 * Utiliza el método `listen` de Express para iniciar el servidor en el puerto obtenido del objeto `app`.
 * 
 * La función `get` de Express se utiliza para obtener el valor de la configuración del puerto.
 * 
 * @see {@link https://expressjs.com/en/4x/api.html#app.listen Express Application.listen()}
 * @see {@link https://expressjs.com/en/4x/api.html#app.get Express Application.get()}
 */
app.listen(app.get('port'), () => { 
    /**
     * Callback que se ejecuta una vez que el servidor ha comenzado a escuchar en el puerto especificado.
     * Muestra un mensaje en la consola que indica en qué puerto está escuchando el servidor.
     */
    console.log("Servidor escuchando en el puerto ", app.get("port"))
})