/**
 * Controlador para operaciones CRUD de libros en la base de datos.
 * Este módulo define funciones para añadir, buscar, actualizar y eliminar libros,
 * aprovechando las funcionalidades del módulo de base de datos.
 *
 * @module bookController
 * @requires ../../dataBase/db - Módulo de base de datos que proporciona las funciones de manipulación de la base de datos.
 */

const db = require('../../dataBase/db')
const TABLA = 'BOOK' // Nombre de la tabla en la base de datos para los libros.

function addBook(newBook) {
    return db.addRegister(TABLA, newBook);
}

// Busca todos los registros de la tabla especificada
function fetchAll() {
    return db.fetchAll(TABLA)
}

// Libro por por id
function fetchById(id) {
    return db.fetchById(TABLA, id)
}
// Libro por por título
function fetchByTitle(title) {
    return db.fetchByTitle(TABLA, title)
}

// Libro por autor
function fetchByAuthor(author) {
    return db.fetchByAuthor(TABLA, author)
}

// Libro por idioma
function fetchByLanguage(language) {
    return db.fetchByLanguage(TABLA, language)
}

// Libro por categoría
function fetchByCategory(category) {
    return db.fetchByCategory(TABLA, category)
}

// Por ISBN
function fetchByIsbn(isbn) {
    return db.fetchByIsbn(TABLA, isbn)
}

// Actualizar un registro
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

// Elimina libro mediante id
function deleteById(id) {
    return db.deleteById(TABLA, id);
}


module.exports = {
    addBook,
    fetchAll,
    fetchById,
    fetchByTitle,
    fetchByAuthor,
    fetchByLanguage,
    fetchByCategory,
    fetchByIsbn,
    updateRegister,
    deleteById,
}