const express = require('express');

const response = require('../responses')
const controller = require('./controller')

const router = express.Router();

// Cada ruta es una de las funciones CRUD en la base de datos que desarrollamos en 'db.js'

// Orden correcto de las rutas
router.get('/search', handleSearch);      // Específica - primero
router.get('/:id', fetchById);           // Específica - maneja IDs
router.delete('/:id', deleteById);       // Igual, específica pero con método DELETE
router.get('/', fetchAll);               // General - al final
router.post('/', addBook);

// Agregar un libro
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


// Ruta general para consultar los libros por título o autor
async function handleSearch(req, res) {
    try {
        let all; // Variable para almacenar los resultados de la búsqueda

        // Determina qué tipo de búsqueda realizar basándose en los parámetros de la consulta
        if (req.query.title) {
            // Si se proporciona un parámetro 'title', realiza una búsqueda por título
            all = await controller.fetchByTitle(req.query.title);
        } else if (req.query.author) {
            // Si se proporciona un parámetro 'author', realiza una búsqueda por autor
            all = await controller.fetchByAuthor(req.query.author);

        } else if (req.query.language){
            all = await controller.fetchByLanguage(req.query.language);

        } else if (req.query.category){
            all = await controller.fetchByCategory(req.query.category);

        } else if (req.query.isbn){
            all = await controller.fetchByIsbn(req.query.isbn);

        } else {
            // Si no se proporciona ninguno de los parámetros anteriores, envía un error
            return res.status(400).send({ error: "Se requiere un parámetro de búsqueda (atributos de libro)" });
        }

        // Si la búsqueda es exitosa y se obtienen resultados, envía los resultados
        response.success(req, res, all, 200);
    } catch (error) {
        // Maneja cualquier error que ocurra durante la búsqueda
        response.error(req, res, "Internal server error", 500, error.message);
    }
};

// Eliminar mediante el ID
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



module.exports = router;