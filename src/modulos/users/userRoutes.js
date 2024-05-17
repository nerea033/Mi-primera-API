/**
 * Routes for CRUD operations on users.
 * This module defines the HTTP routes for create, read, and update operations on the users table.
 *
 * @module userRoute
 * @requires express
 * @requires ../responses - Module for handling standard responses.
 * @requires ./controller - Controller for user operations.
 */

const express = require('express');
const response = require('../responses')
const controller = require('./userContoller')

// Create an Express router.
const router = express.Router();

// Asociación de métodos del controlador a rutas.
router.post('/', addUser)       // Route to add a user.
router.delete('/:uid', deleteByUid)  // Route to delete a user by UID.
router.get('/:uid', fetchUser)  //  Route to get a specific user by UID. (specific).
router.get('/', fetchAll)       // Route to get all user records. (generic).

/**
 * Route to add a new user.
 * Uses the addUser method from the controller to add a user to the database.
 *
 * @param {express.Request} req - The HTTP request object, expecting user data in the body.
 * @param {express.Response} res - The HTTP response object.
 */
async function addUser(req, res) {
    try {
        const result = await controller.addUser(req.body);
        if (result.affectedRows > 0) {
            response.success(req, res, "Usuario agregado con éxito", 201, result.insertId);
        } else {
            response.error(req, res, "Error al agregar el usuario", 400);
        }
    } catch (error) {
        console.error("Error en el servidor al insertar el usuario", error);
        response.error(req, res, "Internal server error", 500, error.message);
    }
}

/**
 * Route to fetch all users.
 * Uses the fetchAll method from the controller to get all records.
 *
 * @param {express.Request} req - The HTTP request object.
 * @param {express.Response} res - The HTTP response object.
 */
async function fetchAll(req, res) {
    try {
        const todos = await controller.fetchAll(); // Await the resolution of the promise
        response.success(req, res, todos, 200);   // Send success response with the data
    } catch (error) {
        console.error("Error en el servidor al obtener todos los usuarios");
        response.error(req, res, "Internal server error", 500, error.message); // Handle errors
    }
};

/**
 * Route to fetch a specific user by UID.
 * Uses the fetchUser method from the controller to get a specific user.
 *
 * @param {express.Request} req - The HTTP request object.
 * @param {express.Response} res - The HTTP response object.
 */
async function fetchUser(req, res) {
    try {
        const todos = await controller.fetchUser(req.params.uid); 
        response.success(req, res, todos, 200);   
    } catch (error) {
        console.error("Error en el servidor al obtener el usuario por 'uid'", error)
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};

/**
 * Route to delete a user by UID.
 * Uses the deleteByUid method from the controller to delete a user from the database using their UID.
 *
 * @param {express.Request} req - The Express request object, which should include the user's UID as a parameter.
 * @param {express.Response} res - The Express response object.
 */
async function deleteByUid(req, res) {
    try {
        const resultado = await controller.deleteByUid(req.params.uid); 
        if (resultado.affectedRows > 0) {
            response.success(req, res, "Usuario eliminado con éxito", 200);
        } else {
            response.error(req, res, "Usuario no encontrado", 404);
        }
    } catch (error) {
        console.error("Error en el servidor al eliminar un usuario mediante su identificador")
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};


module.exports = router;