/**
 * Controlador para operaciones CRUD de favoritos en la base de datos.
 * Este módulo define funciones para añadir, buscar, actualizar y eliminar favoritos,
 * aprovechando las funcionalidades del módulo de base de datos.
 *
 * @module favoriteController
 * @requires ../../dataBase/db - Módulo de base de datos que proporciona las funciones de manipulación de la base de datos.
 */

const db = require('../../dataBase/db')
const TABLA = 'FAVORITE' // Nombre de la tabla en la base de datos para favoritos.

function addFavorites(registerData) {
    return db.addRegister(TABLA, registerData);
}

// Busca todos los registros de la tabla especificada
function fetchAll() {
    return db.fetchAll(TABLA)
}

// Favoritos por por id
function fetchById(id) {
    return db.fetchById(TABLA, id)
}

// Actualizar un registro
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

// Elimina favoritos mediante id
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