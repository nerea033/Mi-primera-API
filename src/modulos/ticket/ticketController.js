/**
 * Controlador para operaciones CRUD de ticket en la base de datos.
 * Este módulo define funciones para añadir, buscar, actualizar y eliminar ticket,
 * aprovechando las funcionalidades del módulo de base de datos.
 *
 * @module ticketController
 * @requires ../../dataBase/db - Módulo de base de datos que proporciona las funciones de manipulación de la base de datos.
 */

const db = require('../../dataBase/db')
const TABLA = 'TICKET' // Nombre de la tabla en la base de datos para ticket.

function addTicket(registerData) {
    return db.addRegister(TABLA, registerData);
}

// Busca todos los registros de la tabla especificada
function fetchAll() {
    return db.fetchAll(TABLA)
}

// T icket por por id
function fetchById(id) {
    return db.fetchById(TABLA, id)
}

// Actualizar un registro
function updateRegister(idField, id, updateData){
    return db.updateRegister(TABLA, idField, id, updateData)
}

// Elimina ticket mediante id
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