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
    return db.fetchUser(TABLA, uid)
}

/**
 * Deletes a user by UID.
 * 
 * @param {string} id - The UID of the user to delete.
 * @returns {Promise} A promise that resolves when the user is deleted.
 */
function deleteByUid(id) {
    return db.deleteByUid(TABLA, id);
}

module.exports = {
    addUser,
    fetchAll,
    fetchUser,
    deleteByUid
}