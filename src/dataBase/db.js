/**
 * Módulo para la gestión de la conexión y las operaciones de la base de datos MySQL.
 * Incluye funciones para agregar, buscar, actualizar y eliminar registros en una tabla específica.
 *
 * @module db
 * @requires mysql2
 * @requires ../config - Configuración de la conexión a la base de datos.
 */

const mysql = require('mysql2');
const config = require('../config');

/**
 * Configuración para la conexión a la base de datos MySQL.
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
 * Establece una conexión con la base de datos y maneja reconexiones automáticas en caso de pérdidas de conexión.
 */
function dbConnection(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(dbConnection, 2000); // Intenta reconectar después de 2 segundos

        }else {
            // Configuración de las variables de sesión después de establecer la conexión
            connection.query('SET session wait_timeout = 3600', (err, results) => {
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
            dbConnection(); //Si se desconecta, reconectar
        } else {
            throw err;
        }
    })
}

dbConnection();

/**
 * Agrega un registro a una tabla especificada en la base de datos.
 *
 * @param {string} table - Nombre de la tabla en la base de datos.
 * @param {Object} registerData - Datos del registro a insertar en forma de objeto clave-valor.
 * @returns {Promise<Object>} Promesa que resuelve con el resultado de la operación de inserción.
 */
function addRegister(table, registerData) {
    // Filtrar datos para remover campos no definidos
    const data = {};
    for (const key in registerData) {
        if (registerData[key] !== undefined && registerData[key] !== null) {
            data[key] = registerData[key];
        }
    }

    // Obtener las claves (columnas) y los valores de los datos filtrados
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');

    // Construir el query SQL dinámicamente
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
 * Recupera todos los registros de una tabla específica.
 *
 * @param {string} table - Nombre de la tabla de donde se recuperarán los registros.
 * @returns {Promise<Array>} Promesa que resuelve con todos los registros de la tabla.
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
 * Busca un usuario por su identificador único (uid) en una tabla especificada.
 *
 * @param {string} table - Nombre de la tabla.
 * @param {number|string} uid - Identificador único del usuario.
 * @returns {Promise<Object>} Promesa que resuelve con el usuario encontrado.
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
 * Busca registros en una tabla basada en un identificador de fila específico.
 *
 * @param {string} table - Nombre de la tabla.
 * @param {number|string} id - Identificador de la fila.
 * @returns {Promise<Object>} Promesa que resuelve con los registros encontrados.
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
 * Busca libros en una tabla por título usando una coincidencia aproximada (LIKE).
 *
 * @param {string} table - Nombre de la tabla donde se realizará la búsqueda.
 * @param {string} title - Título del libro a buscar.
 * @returns {Promise<Array>} Promesa que resuelve con los resultados de la búsqueda.
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
 * Busca registros en una tabla por autor usando una coincidencia aproximada (LIKE).
 *
 * @param {string} table - Nombre de la tabla donde se realizará la búsqueda.
 * @param {string} author - Autor de los libros a buscar.
 * @returns {Promise<Array>} Promesa que resuelve con los resultados de la búsqueda.
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
 * Busca registros en una tabla por idioma usando una coincidencia aproximada (LIKE).
 *
 * @param {string} table - Nombre de la tabla donde se realizará la búsqueda.
 * @param {string} language - Idioma de los libros a buscar.
 * @returns {Promise<Array>} Promesa que resuelve con los resultados de la búsqueda.
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
 * Busca registros en una tabla por categoría usando una coincidencia aproximada (LIKE).
 *
 * @param {string} table - Nombre de la tabla donde se realizará la búsqueda.
 * @param {string} category - Categoría de los libros a buscar.
 * @returns {Promise<Array>} Promesa que resuelve con los resultados de la búsqueda.
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
 * Busca registros en una tabla por ISBN usando una coincidencia aproximada (LIKE).
 *
 * @param {string} table - Nombre de la tabla donde se realizará la búsqueda.
 * @param {string} isbn - ISBN de los libros a buscar.
 * @returns {Promise<Array>} Promesa que resuelve con los resultados de la búsqueda.
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
 * Actualiza los campos específicos de un registro en una tabla dada.
 * 
 * @param {string} table - Nombre de la tabla en la base de datos donde se hará la actualización.
 * @param {string} idField - El nombre del campo que actúa como clave primaria o identificador único en la tabla.
 * @param {number|string} id - El valor de la clave primaria para la fila específica que se desea actualizar.
 * @param {Object} updateData - Un objeto que contiene los pares clave-valor que se desean actualizar.
 * @returns {Promise} Una promesa que se resuelve con el resultado de la operación de actualización de la base de datos.
 */

function updateRegister(table, idField, id, updateData) {
    // Filtrar datos para remover campos no definidos y no relevantes para la actualización
    const filteredData = {};
    for (const key in updateData) {
        if (updateData[key] !== undefined && updateData[key] !== null) {
            filteredData[key] = updateData[key];
        }
    }

    // Construir las partes del query de actualización
    const updates = Object.keys(filteredData).map(key => `${key} = ?`);
    const values = Object.values(filteredData);

    // Asegurarse de que el ID del registro está en los valores para la cláusula WHERE
    values.push(id);

    // Construir el query SQL dinámicamente
    const query = `
        UPDATE ${table}
        SET ${updates.join(', ')}
        WHERE ${idField} = ?; 
    `; // '?' equivale a 'id'

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
 * Elimina un registro por su identificador de una tabla específica en la base de datos.
 * 
 * @param {string} table - Nombre de la tabla de la cual se eliminará el registro.
 * @param {number|string} id - El valor del identificador del registro a eliminar.
 * @returns {Promise<Object>} Una promesa que se resuelve con el resultado de la operación de eliminación.
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
    deleteById,
}
