/**
 * Módulo para gestionar operaciones de usuarios en la base de datos.
 * Proporciona funciones para buscar, agregar y consultar usuarios.
 * 
 * @module userContoller
 * @requires ../../dataBase/db - Módulo de base de datos que proporciona las funciones de manipulación de la base de datos.
 */

const db = require('../../dataBase/db')

const TABLA = 'USER'

function addUser(dataUser){
    return db.addRegister(TABLA, dataUser)
}

// Busca todos los registros de la tabla especificada
function fetchAll() {
    return db.fetchAll(TABLA)
}

// Usuario por uid
function fetchUser(uid) {
    return db.fetchUser(TABLA, uid)
}

// Elimina usuario mediante uid
function deleteByUid(id) {
    return db.deleteByUid(TABLA, id);
}

module.exports = {
    addUser,
    fetchAll,
    fetchUser,
    deleteByUid
}