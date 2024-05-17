/**
 * Controller for CRUD operations on tickets in the database.
 * This module defines functions to add, fetch, update, and delete tickets,
 * leveraging the functionalities of the database module.
 *
 * @module ticketController
 * @requires ../../dataBase/db - Database module that provides functions for database manipulation.
 */

const db = require('../../dataBase/db')
const TABLA = 'TICKET' // Name of the table in the database for tickets.


/**
 * Adds a new ticket record to the database.
 * 
 * @param {Object} registerData - The data of the ticket to add.
 * @returns {Promise} A promise that resolves when the ticket is added.
 */
function addTicket(registerData) {
    return db.addRegister(TABLA, registerData);
}

/**
 * Fetches all records from the specified table.
 * 
 * @returns {Promise} A promise that resolves with all ticket records.
 */
function fetchAll() {
    return db.fetchAll(TABLA)
}

/**
 * Fetches a ticket by its ID.
 * 
 * @param {string} id - The ID of the ticket to fetch.
 * @returns {Promise} A promise that resolves with the ticket data.
 */
function fetchById(id) {
    return db.fetchById(TABLA, id)
}

/**
 * Updates a record in the database.
 * 
 * @param {string} idField - The name of the ID field.
 * @param {string} id - The ID of the record to update.
 * @param {Object} updateData - The data to update the record with.
 * @returns {Promise} A promise that resolves when the record is updated.
 */
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

/**
 * Deletes a ticket by its ID.
 * 
 * @param {string} id - The ID of the ticket to delete.
 * @returns {Promise} A promise that resolves when the ticket is deleted.
 */
function deleteById(id) {
    return db.deleteById(TABLA, id);
}


module.exports = {
    addTicket,
    fetchAll,
    fetchById,
    updateRegister,
    deleteById,
}