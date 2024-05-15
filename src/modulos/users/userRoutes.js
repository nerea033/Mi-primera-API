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
router.delete('/:uid', deleteByUid)
router.get('/:uid', fetchUser)  // Ruta para obtener un usuario por UID (específica).
router.get('/', fetchAll)       // Ruta para obtener todos los registros (genérica).

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
        console.error("Error en el servidor al insertar el usuario", error);
        response.error(req, res, "Internal server error", 500, error.message);
    }
}

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
        console.error("Error en el servidor al obtener todos los usuarios");
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
        console.error("Error en el servidor al obtener el usuario por 'uid'", error)
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};

/**
 * Elimina un usuario de la base de datos utilizando su UID.
 * @param {Object} req - El objeto de solicitud Express, que debe incluir el uid del libro como parámetro.
 * @param {Object} res - El objeto de respuesta Express.
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