/**
 * Controller for CRUD operations on favorites in the database.
 * This module defines functions to add, fetch, update, and delete favorites,
 * leveraging the functionalities of the database module.
 *
 * @module favoriteController
 * @requires ../../dataBase/db - Database module providing database manipulation functions.
 */

const db = require('../../dataBase/db')
const TABLA = 'FAVORITE' // Name of the table in the database for favorites.


/**
 * Adds a new record to the favorites table.
 * @param {Object} registerData - The data of the favorite to add.
 * @returns {Promise} - A promise that resolves when the record is added.
 */
function addFavorites(registerData) {
    return db.addRegister(TABLA, registerData);
}

/**
 * Fetches all records from the favorites table.
 * @returns {Promise} - A promise that resolves with all records from the table.
 */
function fetchAll() {
    return db.fetchAll(TABLA)
}

/**
 * Fetches a specific favorite record by its ID.
 * @param {number} id - The ID of the favorite record to fetch.
 * @returns {Promise} - A promise that resolves with the fetched record.
 */
function fetchById(id) {
    return db.fetchById(TABLA, id)
}

/**
 * Updates a specific record in the favorites table.
 * @param {string} idField - The name of the ID field.
 * @param {number} id - The ID of the record to update.
 * @param {Object} updateData - The data to update the record with.
 * @returns {Promise} - A promise that resolves when the record is updated.
 */
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

/**
 * Deletes a specific favorite record by its ID.
 * @param {number} id - The ID of the favorite record to delete.
 * @returns {Promise} - A promise that resolves when the record is deleted.
 */
function deleteById(id) {
    return db.deleteById(TABLA, id);
}


module.exports = {
    addFavorites,
    fetchAll,
    fetchById,
    updateRegister,
    deleteById,
}