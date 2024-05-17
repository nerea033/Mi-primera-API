/**
 * Router to handle book management operations.
 * This module defines CRUD operations via HTTP routes.
 *
 * @module bookRoutes
 * @requires express
 * @requires ../responses - Module to handle standardized responses.
 * @requires ./bookController - Controller to handle book data operations.
 */

const express = require('express');
const response = require('../responses')
const controller = require('./bookController')

// Initialize the Express router to handle requests.
const router = express.Router();

// Route configuration for CRUD operations. Each route corresponds to an operation in the database.
// Routes are defined with attention to specificity order: more specific routes go first.

router.get('/search', handleSearch);      // Specific - first
router.get('/:id', fetchById);           // Specific - handles IDs
router.delete('/:id', deleteById);       // Same, specific but with DELETE method
router.get('/', fetchAll);               // General - at the end
router.post('/', addBook);
router.put('/update', updateRegister);


/**
 * Adds a new book to the database.
 * @param {Object} req - The Express request object, containing the book body to add.
 * @param {Object} res - The Express response object.
 */
async function addBook(req, res) {
    try {
        const result = await controller.addBook(req.body);
        if (result.affectedRows > 0) {
            response.success(req, res, "Libro agregado con éxito", 201, result.insertId);
        } else {
            response.error(req, res, "Error al agregar el libro", 400);
        }
    } catch (error) {
        console.error("Error en el servidor al intentar agregar un libro", error);
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
        console.error("Error al buscar todos los libros", error);
        response.error(req, res, "Internal server error", 500, error.message); // Handle errors
    }
};

/**
 * Fetches a specific book by its ID.
 * @param {Object} req - The Express request object, which must include the book ID as a parameter.
 * @param {Object} res - The Express response object.
 */
async function fetchById(req, res) {
    try {
        const book = await controller.fetchById(req.params.id);
        if (!book) {
            response.error(req, res, "No se encontró el libro", 404);
        } else {
            response.success(req, res, book, 200);
        }
    } catch (error) {
        console.error("Error el el servidor al buscar un libro por 'id'", error);
        response.error(req, res, "Error interno del servidor", 500, error.message);
    }
}

/**
 * Handles book searches by title, author, language, category, or ISBN.
 * @param {Object} req - The Express request object, containing the search parameters.
 * @param {Object} res - The Express response object.
 */
async function handleSearch(req, res) {
    try {
        let all; // Variable to store search results.

        // Determines which type of search to perform based on the query parameters
         if (req.query.title) {
            // If a 'title' parameter is provided, performs a search by title.
            all = await controller.fetchByTitle(req.query.title);
        } else if (req.query.author) {
            // If an 'author' parameter is provided, performs a search by author.
            all = await controller.fetchByAuthor(req.query.author);

        } else if (req.query.language){
            all = await controller.fetchByLanguage(req.query.language);

        } else if (req.query.category){
            all = await controller.fetchByCategory(req.query.category);

        } else if (req.query.isbn){
            all = await controller.fetchByIsbn(req.query.isbn);

        } else {
            // If none of the above parameters are provided, sends an error.
            return res.status(400).send({ error: "Se requiere un parámetro de búsqueda (atributos de libro)" });
        }

        // If the search is successful and results are obtained, send the results
        response.success(req, res, all, 200);
    } catch (error) {
        // Handles any errors that occur during the search
        console.error("Error al realizer la búsqueda de un libro mediante sus atributos", error);
        response.error(req, res, "Internal server error", 500, error.message);
    }
};

/**
 * Updates a record in the database.
 * @param {Object} req - The Express request object, containing the table name, ID field, ID value, and update data.
 * @param {Object} res - The Express response object.
 */
async function updateRegister(req, res) {
    try {
        // Destructure the body to get the necessary parameters
        const {idField, id, updateData } = req.body;

        // Check if all necessary parameters are present
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
 * Deletes a book from the database using its ID.
 * @param {Object} req - The Express request object, which must include the book ID as a parameter.
 * @param {Object} res - The Express response object.
 */
async function deleteById(req, res) {
    try {
        const resultado = await controller.deleteById(req.params.id); 
        if (resultado.affectedRows > 0) {
            response.success(req, res, "Libro eliminado con éxito", 200);
        } else {
            response.error(req, res, "Libro no encontrado", 404);
        }
    } catch (error) {
        console.error("Error al eliminar un libro mediante su 'id'", error)
        response.error(req, res, "Internal server error", 500, error.message); 
    }
};


// Export the router to be used in the main application.
module.exports = router;