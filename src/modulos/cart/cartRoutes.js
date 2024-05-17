/**
 * Router to handle user cart management operations.
 * This module defines CRUD operations via HTTP routes.
 *
 * @module cartRoutes
 * @requires express
 * @requires ../responses - Module to handle standardized responses.
 * @requires ./cartController - Controller to handle cart data operations.
 */

const express = require('express');
const response = require('../responses')
const controller = require('./cartController')

// Initialize the Express router to handle requests.
const router = express.Router();

// Route configuration for CRUD operations. Each route corresponds to a database operation.
// Routes are defined with attention to the order of specificity: the most specific routes go first.

router.get('/:id', fetchById);           // Specific - handles IDs
router.delete('/:id', deleteById);       // Likewise, specific but with DELETE method
router.get('/', fetchAll);               // General - at the end
router.post('/', addCart);
router.put('/update', updateRegister);


/**
 * Adds a new record to the cart table.
 * @param {Object} req - The Express request object, containing the cart body to add.
 * @param {Object} res - The Express response object.
 */
async function addCart(req, res) {
    try {
        const result = await controller.addCart(req.body);
        if (result.affectedRows > 0) {
            response.success(req, res, "Registro en carrito agregado con éxito", 201, result.insertId);
        } else {
            response.error(req, res, "Error al agregar el registro del carrito", 400);
        }
    } catch (error) {
        console.error("Error al insertar el registro:", error);
        response.error(req, res, "Internal server error", 500, error.message);
    }
}

/**
 * Fetches all records from the database.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
async function fetchAll(req, res) {
    try {
        const todos = await controller.fetchAll(); // Await the resolution of the promise
        response.success(req, res, todos, 200);   // Send success response with the data
    } catch (error) {
        console.error("Error al obtener todos los registros del carrito", error);
        response.error(req, res, "Internal server error", 500, error.message); // Handle errors
    }
};

/**
 * Fetches a specific cart record by its ID.
 * @param {Object} req - The Express request object, which should include the cart ID as a parameter.
 * @param {Object} res - The Express response object.
 */
async function fetchById(req, res) {
    try {
        const cart = await controller.fetchById(req.params.id);
        if (!cart) {
            response.error(req, res, "No se encontró el registro en el carrito", 404);
        } else {
            response.success(req, res, cart, 200);
        }
    } catch (error) {
        console.error("Error al busar un rgisto por id en el carrito", error);
        response.error(req, res, "Error interno del servidor", 500, error.message);
    }
}


/**
 * Updates a record in the database.
 * @param {Object} req - The Express request object, containing the table name, the ID field, the ID value, and the update data.
 * @param {Object} res - The Express response object.
 */
async function updateRegister(req, res) {
    try {
        // Destructure the body to get the necessary parameters.
        const {idField, id, updateData } = req.body;

        // Verify if all necessary parameters are present.
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
 * Deletes a record from the cart table by its ID.
 * @param {Object} req - The Express request object, which should include the cart record ID as a parameter.
 * @param {Object} res - The Express response object.
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
        console.error("Error al eliminar un rgistro mediante 'id' en el carrito", error);
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};


// Export the router to be used in the main application.
module.exports = router;