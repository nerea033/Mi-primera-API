/**
 * Controlador para operaciones CRUD del carrito en la base de datos.
 * Este módulo define funciones para añadir, buscar, actualizar y eliminar los registros en el carrito,
 * aprovechando las funcionalidades del módulo de base de datos.
 *
 * @module cartController
 * @requires ../../dataBase/db - Módulo de base de datos que proporciona las funciones de manipulación de la base de datos.
 */

const db = require('../../dataBase/db')
const TABLA = 'CART' // Nombre de la tabla en la base de datos para el carrito.

function addCart(registerData) {
    return db.addRegister(TABLA, registerData);
}

// Busca todos los registros de la tabla especificada
function fetchAll() {
    return db.fetchAll(TABLA)
}

// Carrito por por id
function fetchById(id) {
    return db.fetchById(TABLA, id)
}

// Actualizar un registro
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

// Elimina carrito mediante id
function deleteById(id) {
    return db.deleteById(TABLA, id);
}


module.exports = {
    addCart,
    fetchAll,
    fetchById,
    updateRegister,
    deleteById,
}