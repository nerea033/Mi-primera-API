/**
 * Module for managing the connection and operations of the MySQL database.
 * Includes functions to add, search, update, and delete records in a specific table.
 *
 * @module db
 * @requires mysql2
 * @requires ../config - Connection configuration for the database.
 */

const mysql = require('mysql2');
const config = require('../config');

/**
 * Configuration for connecting to the MySQL database.
 */
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port
}


let connection;

/**
 * Establishes a connection to the database and handles automatic reconnections in case of connection losses.
 */
function dbConnection(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(dbConnection, 2000); // Attempt to reconnect after 2 seconds.

        }else {
            // Set session variables after connection is established.
            connection.query('SET session wait_timeout = 3600', (err, results) => { // Set it to 1 hour (3600 seconds).
                if (err) throw err;
                console.log('wait_timeout establecido');
            });

            connection.query('SET session interactive_timeout = 3600', (err, results) => {
                if (err) throw err;
                console.log('interactive_timeout establecido');
            });

            console.log('db conectada')
        }
    });

    connection.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            dbConnection(); // If disconnected, reconnect
        } else {
            throw err;
        }
    })
}

dbConnection();

/**
 * Adds a record to a specified table in the database.
 *
 * @param {string} table - Name of the table in the database.
 * @param {Object} registerData - Data of the record to insert in key-value pair form.
 * @returns {Promise<Object>} Promise that resolves with the result of the insertion operation.
 */
function addRegister(table, registerData) {
    // Filter data to remove undefined fields
    const data = {};
    for (const key in registerData) {
        if (registerData[key] !== undefined && registerData[key] !== null) {
            data[key] = registerData[key];
        }
    }

    // Get the keys (columns) and values of the filtered data.
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');

    // Build the SQL query dynamically.
    const query = `
        INSERT INTO ${table} (${columns.join(', ')})
        VALUES (${placeholders});
    `;

    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

/**
 * Retrieves all records from a specific table.
 *
 * @param {string} table - Name of the table from which to retrieve records.
 * @returns {Promise<Array>} Promise that resolves with all records from the table.
 */
function fetchAll(table) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ??';
        connection.query(query, [table], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

/**
 * Searches for a user by their unique identifier (uid) in a specified table.
 *
 * @param {string} table - Name of the table.
 * @param {number|string} uid - Unique identifier of the user.
 * @returns {Promise<Object>} Promise that resolves with the found user.
 */
function fetchUser(table, uid) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE uid = ?';
        connection.query(query, [table, uid], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

/**
 * Searches for records in a table based on a specific row identifier.
 *
 * @param {string} table - Name of the table.
 * @param {number|string} id - Row identifier.
 * @returns {Promise<Object>} Promise that resolves with the found records.
 */
function fetchById(table, id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE id = ?';
        connection.query(query, [table, id], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

/**
 * Searches for books in a table by title using approximate matching (LIKE).
 *
 * @param {string} table - Name of the table where the search will be performed.
 * @param {string} title - Title of the book to search for.
 * @returns {Promise<Array>} Promise that resolves with the search results.
 */
function fetchByTitle(table, title) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE title LIKE ?';
        connection.query(query, [table, `%${title}%`], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

/**
 * Searches for records in a table by author using approximate matching (LIKE).
 *
 * @param {string} table - Name of the table where the search will be performed.
 * @param {string} author - Author of the books to search for.
 * @returns {Promise<Array>} Promise that resolves with the search results.
 */
function fetchByAuthor(table, author) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE author LIKE ?';
        connection.query(query, [table, `%${author}%`], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

/**
 * Searches for records in a table by language using approximate matching (LIKE).
 *
 * @param {string} table - Name of the table where the search will be performed.
 * @param {string} language - Language of the books to search for.
 * @returns {Promise<Array>} Promise that resolves with the search results.
 */
function fetchByLanguage(table, language){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE language LIKE ?';
        connection.query(query, [table, `%${language}%`], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

/**
 * Searches for records in a table by category using approximate matching (LIKE).
 *
 * @param {string} table - Name of the table where the search will be performed.
 * @param {string} category - Category of the books to search for.
 * @returns {Promise<Array>} Promise that resolves with the search results.
 */
function fetchByCategory(table, category){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE category LIKE ?';
        connection.query(query, [table, `%${category}%`], (error, result) => {
            if (error){
                return reject(error);
            }
            resolve(result);
        });
    });
}


/**
 * Searches for records in a table by ISBN using approximate matching (LIKE).
 *
 * @param {string} table - Name of the table where the search will be performed.
 * @param {string} isbn - ISBN of the books to search for.
 * @returns {Promise<Array>} Promise that resolves with the search results.
 */
function fetchByIsbn(table, isbn){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE isbn LIKE ?';
        connection.query(query, [table, `${isbn}%`], (error, result) => {
            if (error){
                return reject(error);
            }
            resolve(result);
        });
    });
}


/**
 * Updates specific fields of a record in a given table.
 * 
 * @param {string} table - Name of the table in the database where the update will occur.
 * @param {string} idField - The name of the field acting as a primary key or unique identifier in the table.
 * @param {number|string} id - The value of the primary key for the specific row to be updated.
 * @param {Object} updateData - An object containing the key-value pairs to be updated.
 * @returns {Promise} A promise that resolves with the result of the database update operation.
 */
function updateRegister(table, idField, id, updateData) {
    // Filter data to remove undefined and irrelevant fields for updating.
    const filteredData = {};
    for (const key in updateData) {
        if (updateData[key] !== undefined && updateData[key] !== null) {
            filteredData[key] = updateData[key];
        }
    }

    // Construct parts of the update query
    const updates = Object.keys(filteredData).map(key => `${key} = ?`);
    const values = Object.values(filteredData);

    // Ensure the record ID is in the values for the WHERE clause
    values.push(id);

     // Dynamically construct the SQL query
    const query = `
        UPDATE ${table}
        SET ${updates.join(', ')}
        WHERE ${idField} = ?; 
    `; // '?' is equivalent to 'id'

    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

/**
 * Deletes a user by their identifier in the database.
 * 
 * @param {string} table - Name of the table from which the record will be deleted.
 * @param {number|string} uid - The value of the identifier of the record to be deleted.
 * @returns {Promise<Object>} A promise that resolves with the result of the deletion operation.
 */
function deleteByUid(table, uid) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM ?? WHERE uid = ?';
        connection.query(query, [table, uid], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

/**
 * Deletes a record by its identifier from a specific table in the database.
 * 
 * @param {string} table - Name of the table from which the record will be deleted.
 * @param {number|string} id - The value of the identifier of the record to be deleted.
 * @returns {Promise<Object>} A promise that resolves with the result of the deletion operation.
 */
function deleteById(table, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM ?? WHERE id = ?';
        connection.query(query, [table, id], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}


module.exports = {
    addRegister,
    fetchAll,
    fetchUser,
    fetchById,
    fetchByTitle,
    fetchByAuthor,
    fetchByLanguage,
    fetchByCategory,
    fetchByIsbn,
    updateRegister,
    deleteByUid,
    deleteById,
}
