const express = require('express');

const response = require('../responses')
const controller = require('./controller')

const router = express.Router();

// Cada ruta es una de las funciones CRUD en la base de datos que desarrollamos en 'db.js'

// Orden correcto de las rutas
router.get('/search', fetchByTitle);     // Específica - primero
router.get('/:id', fetchById);           // Específica - maneja IDs
router.delete('/:id', deleteById);       // Igual, específica pero con método DELETE
router.get('/', fetchAll);               // General - al final
router.post('/books', addBook);



// Ruta para consultar todos los registros de una tabla
async function fetchAll(req, res) {
    try {
        const todos = await controller.fetchAll(); // Await the resolution of the promise
        response.success(req, res, todos, 200);   // Send success response with the data
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message); // Handle errors
    }
};

// Ruta para consultar libros según su id
async function fetchById(req, res) {
    try {
        const book = await controller.fetchById(req.params.id);
        if (!book) {
            response.error(req, res, "No se encontró el libro", 404);
        } else {
            response.success(req, res, book, 200);
        }
    } catch (error) {
        response.error(req, res, "Error interno del servidor", 500, error.message);
    }
}


// Ruta para consultar libros según su título
async function fetchByTitle(req, res) {
    try {
        const todos = await controller.fetchByTitle(req.query.title); // Usa query para obtener el título
        response.success(req, res, todos, 200);   
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};

async function deleteById(req, res) {
    try {
        const resultado = await controller.deleteById(req.params.id); 
        if (resultado.affectedRows > 0) {
            response.success(req, res, "Libro eliminado con éxito", 200);
        } else {
            response.error(req, res, "Libro no encontrado", 404);
        }
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};

async function addBook(req, res) {
    try {
        const result = await controller.addBook(req.body);
        if (result.affectedRows > 0) {
            response.success(req, res, "Libro agregado con éxito", 201, result.insertId);
        } else {
            response.error(req, res, "Error al agregar el libro", 400);
        }
    } catch (error) {
        response.error(req, res, "Internal server error", 500, error.message);
    }
}

module.exports = router;