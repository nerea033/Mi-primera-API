const db = require('../../dataBase/db')

const TABLA = 'BOOK'

// Busca todos los registros de la tabla especificada
function fetchAll() {
    return db.fetchAll(TABLA)
}

// Libro por por id
function fetchById(id) {
    return db.fetchById(TABLA, id)
}
// Libro por por título
function fetchByTitle(title) {
    return db.fetchByTitle(TABLA, title)
}

// Elimina libro mediante id
function deleteById(id) {
    return db.deleteById(TABLA, id);
}

function addBook(newBook) {
    return db.addRegister(TABLA, newBook);
}



module.exports = {
    fetchAll,
    fetchById,
    fetchByTitle,
    deleteById,
    addBook
}