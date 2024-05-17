/**
 * Controller for CRUD operations related to books in the database.
 * This module defines functions to add, search, update, and delete books,
 * leveraging the functionalities of the database manipulation module.
 *
 * @module bookController
 * @requires ../../dataBase/db - Database module that provides database manipulation functions.
 */

const db = require('../../dataBase/db')
const TABLA = 'BOOK' // Table name in the database for books.

/**
 * Adds a new book to the database.
 * @param {Object} newBook - The book object to be added.
 * @returns {Promise} A promise that resolves with the result of the database operation.
 */
function addBook(newBook) {
    return db.addRegister(TABLA, newBook);
}

/**
 * Fetches all records from the specified table.
 * @returns {Promise} A promise that resolves with all book records from the database.
 */
function fetchAll() {
    return db.fetchAll(TABLA)
}

/**
 * Fetches a book by its ID.
 * @param {string} id - The ID of the book to fetch.
 * @returns {Promise} A promise that resolves with the book record from the database.
 */
function fetchById(id) {
    return db.fetchById(TABLA, id)
}

/**
 * Fetches a book by its title.
 * @param {string} title - The title of the book to fetch.
 * @returns {Promise} A promise that resolves with the book record from the database.
 */
function fetchByTitle(title) {
    return db.fetchByTitle(TABLA, title)
}

/**
 * Fetches a book by its author.
 * @param {string} author - The author of the book to fetch.
 * @returns {Promise} A promise that resolves with the book record from the database.
 */
function fetchByAuthor(author) {
    return db.fetchByAuthor(TABLA, author)
}

/**
 * Fetches a book by its language.
 * @param {string} language - The language of the book to fetch.
 * @returns {Promise} A promise that resolves with the book record from the database.
 */
function fetchByLanguage(language) {
    return db.fetchByLanguage(TABLA, language)
}

/**
 * Fetches a book by its category.
 * @param {string} category - The category of the book to fetch.
 * @returns {Promise} A promise that resolves with the book record from the database.
 */
function fetchByCategory(category) {
    return db.fetchByCategory(TABLA, category)
}

/**
 * Fetches a book by its ISBN.
 * @param {string} isbn - The ISBN of the book to fetch.
 * @returns {Promise} A promise that resolves with the book record from the database.
 */
function fetchByIsbn(isbn) {
    return db.fetchByIsbn(TABLA, isbn)
}

/**
 * Updates a book record in the database.
 * @param {string} idField - The name of the ID field.
 * @param {string} id - The ID of the book to update.
 * @param {Object} updateData - The data to update in the book record.
 * @returns {Promise} A promise that resolves with the result of the database operation.
 */
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

/**
 * Deletes a book record from the database by its ID.
 * @param {string} id - The ID of the book to delete.
 * @returns {Promise} A promise that resolves with the result of the database operation.
 */
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