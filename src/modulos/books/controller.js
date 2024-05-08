const db = require('../../dataBase/db')

const TABLA = 'BOOK'

function addBook(newBook) {
    return db.addRegister(TABLA, newBook);
}

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

// Libro por autor
function fetchByAuthor(author) {
    return db.fetchByAuthor(TABLA, author)
}

fetchByAuthor

// Elimina libro mediante id
function deleteById(id) {
    return db.deleteById(TABLA, id);
}





module.exports = {
    addBook,
    fetchAll,
    fetchById,
    fetchByTitle,
    fetchByAuthor,
    deleteById,
}