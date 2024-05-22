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
 * Fetches cart by its user uid.
 * @param {string} uid - The uid of the cart to fetch.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function fetchByUid(uid) {
    return db.fetchByUid(TABLA, uid)
}

/**
 * Updates a record in the database.
 * @param {string} idField - The field name to identify the record.
 * @param {string} id - The ID of the record to update.
 * @param {Object} updateData - The data to update in the record.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function updateRegister(uid, id_book, quantity){
    return db.updateCart(TABLA, uid, id_book, quantity)
}

/**
 * Deletes cart by its ID.
 * @param {string} id - The ID of the cart to delete.
 * @returns {Promise} A Promise representing the result of the database operation.
 */
function deleteCart(uid, id_book) {
    return db.deleteCart(TABLA, uid, id_book);
}


module.exports = {
    addCart,
    fetchAll,
    fetchByUid,
    updateRegister,
    deleteCart,
}