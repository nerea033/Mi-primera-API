/**
 * Module for managing user operations in the database.
 * Provides functions to search, add, and query users.
 * 
 * @module userController
 * @requires ../../dataBase/db - Database module that provides functions for database manipulation.
 */

const db = require('../../dataBase/db')

const TABLA = 'USER'


/**
 * Adds a new user to the database.
 * 
 * @param {Object} dataUser - The user data to be added.
 * @returns {Promise} A promise that resolves when the user is added.
 */
function addUser(dataUser){
    return db.addRegister(TABLA, dataUser)
}

/**
 * Fetches all records from the specified table.
 * 
 * @returns {Promise} A promise that resolves with all user records.
 */
function fetchAll() {
    return db.fetchAll(TABLA)
}

/**
 * Fetches a user by UID.
 * 
 * @param {string} uid - The UID of the user to fetch.
 * @returns {Promise} A promise that resolves with the user data.
 */
function fetchUser(uid) {
    return db.fetchByUid(TABLA, uid)
}

/**
 * Updates a username record in the database.
 * @param {string} idField - The name of the ID field.
 * @param {string} id - The ID of the user to update.
 * @param {Object} updateData - The data to update in the book record.
 * @returns {Promise} A promise that resolves with the result of the database operation.
 */
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

/**
 * Deletes a user by UID.
 * 
 * @param {string} iud - The UID of the user to delete.
 * @returns {Promise} A promise that resolves when the user is deleted.
 */
function deleteByUid(uid) {
    return db.deleteByUid(TABLA, uid);
}

module.exports = {
    addUser,
    fetchAll,
    fetchUser,
    updateRegister,
    deleteByUid
}