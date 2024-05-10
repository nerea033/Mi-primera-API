/**
 * Rutas para operaciones CRUD sobre usuarios.
 * Este módulo define las rutas HTTP para operaciones de creación, lectura y actualización sobre la tabla de usuarios.
 *
 * @module userRoute
 * @requires express
 * @requires ../responses - Módulo para manejar respuestas estándar.
 * @requires ./controller - Controlador para operaciones de usuarios.
 */

const express = require('express');
const response = require('../responses')
const controller = require('./userContoller')

// Creación de un enrutador de Express.
const router = express.Router();

// Asociación de métodos del controlador a rutas.
router.post('/', addUser)       // Ruta para agregar un libro.
router.get('/:uid', fetchUser)  // Ruta para obtener un usuario por UID (específica).
router.get('/', fetchAll)       // Ruta para obtener todos los registros (genérica).


/**
 * Ruta para obtener todos los usuarios.
 * Utiliza el método fetchAll del controlador para obtener todos los registros.
 *
 * @param {express.Request} req - El objeto de solicitud HTTP.
 * @param {express.Response} res - El objeto de respuesta HTTP.
 */
async function fetchAll(req, res) {
    try {
        const todos = await controller.fetchAll(); // Await the resolution of the promise
        response.success(req, res, todos, 200);   // Send success response with the data
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message); // Handle errors
    }
};

/**
 * Ruta para obtener un usuario específico por UID.
 * Utiliza el método fetchUser del controlador para obtener un usuario específico.
 *
 * @param {express.Request} req - El objeto de solicitud HTTP.
 * @param {express.Response} res - El objeto de respuesta HTTP.
 */
async function fetchUser(req, res) {
    try {
        const todos = await controller.fetchUser(req.params.uid); 
        response.success(req, res, todos, 200);   
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};

/**
 * Ruta para agregar un nuevo usuario.
 * Utiliza el método addUser del controlador para agregar un usuario a la base de datos.
 *
 * @param {express.Request} req - El objeto de solicitud HTTP, esperando datos del usuario en el cuerpo.
 * @param {express.Response} res - El objeto de respuesta HTTP.
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
        response.error(req, res, "Internal server error", 500, error.message);
    }
}


module.exports = router;