/**
 * Módulo para gestionar operaciones de usuarios en la base de datos.
 * Proporciona funciones para buscar, agregar y consultar usuarios.
 * 
 * @module userContoller
 * @requires ../../dataBase/db - Módulo de base de datos que proporciona las funciones de manipulación de la base de datos.
 */

const db = require('../../dataBase/db')

const TABLA = 'USER'

// Busca todos los registros de la tabla especificada
function fetchAll() {
    return db.fetchAll(TABLA)
}

// Usuario por uid
function fetchUser(uid) {
    return db.fetchUser(TABLA, uid)
}

function addUser(dataUser){
    return db.addRegister(TABLA, dataUser)
}

module.exports = {
    fetchAll,
    fetchUser,
    addUser
}