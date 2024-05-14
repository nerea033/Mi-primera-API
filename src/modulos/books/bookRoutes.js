/**
 * Enrutador para manejar las operaciones de gestión de libros.
 * Este módulo define las operaciones CRUD a través de rutas HTTP.
 *
 * @module bookRoutes
 * @requires express
 * @requires ../responses - Módulo para manejar respuestas estandarizadas.
 * @requires ./bookController - Controlador para manejar operaciones sobre los datos de libros.
 */

const express = require('express');
const response = require('../responses')
const controller = require('./bookController')

// Inicializa el enrutador de Express, para manejar solicitudes.
const router = express.Router();

// Configuración de rutas para operaciones CRUD. Cada ruta corresponde a una operación en la base de datos.
// Las rutas son definidas con atención al orden de especificidad: las rutas más específicas van primero.

router.get('/search', handleSearch);      // Específica - primero
router.get('/:id', fetchById);           // Específica - maneja IDs
router.delete('/:id', deleteById);       // Igual, específica pero con método DELETE
router.get('/', fetchAll);               // General - al final
router.post('/', addBook);
router.put('/update', updateRegister);


/**
 * Agrega un nuevo libro a la base de datos.
 * @param {Object} req - El objeto de solicitud Express, que contiene el cuerpo del libro a agregar.
 * @param {Object} res - El objeto de respuesta Express.
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
 * Recupera todos los registros de la base de datos.
 * @param {Object} req - El objeto de solicitud Express.
 * @param {Object} res - El objeto de respuesta Express.
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
 * Recupera un libro específico por su ID.
 * @param {Object} req - El objeto de solicitud Express, que debe incluir el ID del libro como parámetro.
 * @param {Object} res - El objeto de respuesta Express.
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
 * Maneja las búsquedas de libros por título, autor, idioma, categoría o ISBN.
 * @param {Object} req - El objeto de solicitud Express, que contiene los parámetros de búsqueda.
 * @param {Object} res - El objeto de respuesta Express.
 */
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
        console.error("Error al realizer la búsqueda de un libro mediante sus atributos", error);
        response.error(req, res, "Internal server error", 500, error.message);
    }
};

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
 * Elimina un libro de la base de datos utilizando su ID.
 * @param {Object} req - El objeto de solicitud Express, que debe incluir el ID del libro como parámetro.
 * @param {Object} res - El objeto de respuesta Express.
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


// Exportar el enrutador para ser utilizado en la aplicación principal.
module.exports = router;