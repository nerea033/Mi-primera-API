/**
 * @module responses
 * Utility functions for handling the application's HTTP responses.
 */

/**
 * Sends a success response to the client.
 * 
 * This function sends a structured JSON response to indicate that the operation was successful.
 * 
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {string} message - Descriptive message about the response or result.
 * @param {number} [status=200] - The HTTP status code to send. Default is 200.
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
 * Sends an error response to the client.
 * 
 * This function sends a structured JSON response to indicate that an error occurred during the operation.
 * 
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {string} message - Descriptive error message.
 * @param {number} [status=500] - The HTTP status code to send. Default is 500.
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