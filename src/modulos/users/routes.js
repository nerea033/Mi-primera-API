const express = require('express');

const response = require('../responses')
const controller = require('./controller')

const router = express.Router();

// Cada ruta es una de las funciones CRUD en la base de datos que desarrollamos en 'db.js'

router.post('/', addUser)       // Ruta para agregar un libro.
router.get('/:uid', fetchUser)  // Ruta para obtener un usuario por UID (específica).
router.get('/', fetchAll)       // Ruta para obtener todos los registros (genérica).


// Ruta para consultar todos los registros de una tabla
async function fetchAll(req, res) {
    try {
        const todos = await controller.fetchAll(); // Await the resolution of the promise
        response.success(req, res, todos, 200);   // Send success response with the data
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message); // Handle errors
    }
};

// Ruta para consultar usuarios según su uid
async function fetchUser(req, res) {
    try {
        const todos = await controller.fetchUser(req.params.uid); 
        response.success(req, res, todos, 200);   
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};

// Agregar un usuario
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