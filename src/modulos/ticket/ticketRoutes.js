/**
 * Enrutador para manejar las operaciones de gestión de ticket del usuario.
 * Este módulo define las operaciones CRUD a través de rutas HTTP.
 *
 * @module ticketRoutes
 * @requires express
 * @requires ../responses - Módulo para manejar respuestas estandarizadas.
 * @requires ./ticketController - Controlador para manejar operaciones sobre los datos de ticket.
 */

const express = require('express');
const response = require('../responses')
const controller = require('./ticketController')

// Inicializa el enrutador de Express, para manejar solicitudes.
const router = express.Router();

// Configuración de rutas para operaciones CRUD. Cada ruta corresponde a una operación en la base de datos.
// Las rutas son definidas con atención al orden de especificidad: las rutas más específicas van primero.

router.get('/:id', fetchById);           // Específica - maneja IDs
router.delete('/:id', deleteById);       // Igual, específica pero con método DELETE
router.get('/', fetchAll);               // General - al final
router.post('/', addTicket);
router.put('/update', updateRegister);


/**
 * Agrega un nuevo registo a la tabla ticket.
 * @param {Object} req - El objeto de solicitud Express, que contiene el cuerpo de ticket a agregar.
 * @param {Object} res - El objeto de respuesta Express.
 */
async function addTicket(req, res) {
    try {
        const result = await controller.addTicket(req.body);
        if (result.affectedRows > 0) {
            response.success(req, res, "Registro en ticket agregado con éxito", 201, result.insertId);
        } else {
            response.error(req, res, "Error al agregar el registro del ticket", 400);
        }
    } catch (error) {
        console.error("Error al insertar el registro en ticket:", error);
        response.error(req, res, "Internal server error", 500, error.message);
    }
}

/**
 * Recupera todos los registros de la base de datos.
 * @param {Object} req - El objeto de solicitud Express.
 * @param {Object} res - El objeto de respuesta Express.
 */
async function fetchAll(req, res) {
    try {
        const todos = await controller.fetchAll(); // Await the resolution of the promise
        response.success(req, res, todos, 200);   // Send success response with the data
    } catch (error) {
        console.error("Error al obtener todos los registros de ticket", error);
        response.error(req, res, "Internal server error", 500, error.message); // Handle errors
    }
};

/**
 * Recupera un registro específico en ticket por su ID.
 * @param {Object} req - El objeto de solicitud Express, que debe incluir el ID de ticket como parámetro.
 * @param {Object} res - El objeto de respuesta Express.
 */
async function fetchById(req, res) {
    try {
        const cart = await controller.fetchById(req.params.id);
        if (!cart) {
            response.error(req, res, "No se encontró el registro en ticket", 404);
        } else {
            response.success(req, res, cart, 200);
        }
    } catch (error) {
        console.error("Error al busar un rgisto por id en ticket", error);
        response.error(req, res, "Error interno del servidor", 500, error.message);
    }
}


/**
 * Actualiza un registro en la base de datos.
 * @param {Object} req - El objeto de solicitud Express, que contiene el nombre de la tabla, el campo ID, el valor ID y los datos de actualización.
 * @param {Object} res - El objeto de respuesta Express.
 */
async function updateRegister(req, res) {
    try {
        // Descomponer el body para obtener los parámetros necesarios
        const {idField, id, updateData } = req.body;

        // Verificar si todos los parámetros necesarios están presentes
        if (!idField || !id || !updateData) {
            return response.error(req, res, "Datos insuficientes para la actualización", 400);
        }

        const result = await controller.updateRegister(idField, id, updateData);
        if (result.affectedRows > 0) {
            response.success(req, res, "Registro actualizado con éxito", 200);
        } else {
            response.error(req, res, "No se encontró el registro para actualizar", 404);
        }
    } catch (error) {
        console.error("Error al actualizar el registro:", error);
        response.error(req, res, "Error del servidor interno", 500, error.message);
    }
}


/**
 * Elimina un registro de la tabla ticket utilizando su ID.
 * @param {Object} req - El objeto de solicitud Express, que debe incluir el ID del registro como parámetro.
 * @param {Object} res - El objeto de respuesta Express.
 */
async function deleteById(req, res) {
    try {
        const resultado = await controller.deleteById(req.params.id); 
        if (resultado.affectedRows > 0) {
            response.success(req, res, "Registro eliminado con éxito", 200);
        } else {
            response.error(req, res, "Registro no encontrado", 404);
        }
    } catch (error) {
        console.error("Error al eliminar un registro mediante 'id' en ticket", error);
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};


// Exportar el enrutador para ser utilizado en la aplicación principal.
module.exports = router;