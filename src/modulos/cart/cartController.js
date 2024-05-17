/**
 * Controller for CRUD operations of the cart in the database.
 * This module defines functions to add, search, update, and delete records in the cart,
 * leveraging the functionalities of the database manipulation module.
 *
 * @module cartController
 * @requires ../../dataBase/db - Database module that provides database manipulation functions.
 */

const db = require('../../dataBase/db')
const TABLA = 'CART' // Table name in the database for the cart.

/**
 * Adds a new record to the cart table.
 * @param {Object} registerData - The Express request object containing the cart body to add.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function addCart(registerData) {
    return db.addRegister(TABLA, registerData);
}

/**
 * Fetches all records from the specified table.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function fetchAll() {
    return db.fetchAll(TABLA)
}

/**
 * Fetches cart by its ID.
 * @param {string} id - The ID of the cart to fetch.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function fetchById(id) {
    return db.fetchById(TABLA, id)
}

/**
 * Updates a record in the database.
 * @param {string} idField - The field name to identify the record.
 * @param {string} id - The ID of the record to update.
 * @param {Object} updateData - The data to update in the record.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

/**
 * Deletes cart by its ID.
 * @param {string} id - The ID of the cart to delete.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function deleteById(id) {
    return db.deleteById(TABLA, id);
}


module.exports = {
    addCart,
    fetchAll,
    fetchById,
    updateRegister,
    deleteById,
}