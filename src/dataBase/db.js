const mysql = require('mysql2');
const config = require('../config');

// Archivo de configuración
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port
}

// Función para conectarme a la DDBB, podróa hacerla con pool
let connection;

function dbConnection(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(dbConnection, 2000); // Intenta reconectar después de 2 segundos

        }else {
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

// Función para agregar un REGISTRO  a una TABLA
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

// Busca todos los registros de una tabla
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

// Busca un USER mediante el uid 
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

// Busca mediante id
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

// Buscar libros por título
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

// Buscar mediante autor
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

// Buscar por idioma
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

// Buscar por categoría
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


// Buscar por ISBN
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




// Eliminar por id
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





// Elimina un registro mefiante el id
function deleteRecord(table, id) {

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
    deleteById,
    deleteRecord,
}
