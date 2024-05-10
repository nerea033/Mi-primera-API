/**
 * @module responses
 * Funciones de utilidad para manejar las respuestas HTTP de la aplicación.
 */


/**
 * Envía una respuesta de éxito al cliente.
 * 
 * Esta función envía una respuesta JSON estructurada para indicar que la operación fue exitosa.
 * 
 * @param {express.Request} req - El objeto de solicitud de Express.
 * @param {express.Response} res - El objeto de respuesta de Express.
 * @param {string} mensaje - Mensaje descriptivo sobre la respuesta o resultado.
 * @param {number} [status=200] - El código de estado HTTP a enviar. Por defecto es 200.
 */
exports.success = function (req, res, mensaje, status){
    const statusCode = status || 200;
    const mensajeOk = mensaje || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: mensajeOk
    });
}

/**
 * Envía una respuesta de error al cliente.
 * 
 * Esta función envía una respuesta JSON estructurada para indicar que ocurrió un error durante la operación.
 * 
 * @param {express.Request} req - El objeto de solicitud de Express.
 * @param {express.Response} res - El objeto de respuesta de Express.
 * @param {string} mensaje - Mensaje descriptivo del error.
 * @param {number} [status=500] - El código de estado HTTP a enviar. Por defecto es 500.
 */
exports.error = function (req, res, mensaje, status){
    const statusCode = status || 500;
    const mensajeError = mensaje || 'Error Interrno';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: mensajeError
    });
}