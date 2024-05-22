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
 * Fetches a specific favorite record by its user UID.
 * @param {number} uid - The uid of the favorite record to fetch.
 * @returns {Promise} - A promise that resolves with the fetched record.
 */
function fetchByUid(uid) {
    return db.fetchByUid(TABLA, uid)
}

/**
 * Deletes a specific favorite record by its uid and id_book.
 * @param {String} uid - The uid of thr favorite record to delete
 * @param {number} id_book - The id_book of the favorite record to delete.
 * @returns {Promise} - A promise that resolves when the record is deleted.
 */
function deleteFavorites(uid, id_book) {
    return db.deleteCart(TABLA, uid, id_book);
}


module.exports = {
    addFavorites,
    fetchAll,
    fetchByUid,
    deleteFavorites,
}