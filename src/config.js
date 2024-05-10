/**
 * Módulo de configuración para la aplicación.
 * 
 * Carga las variables de entorno desde un archivo `.env` utilizando `dotenv` y
 * define la configuración necesaria para la aplicación y la base de datos MySQL.
 * 
 * @module config
 * @requires dotenv
 */

/**
 * Invoca la función `config` de `dotenv` para que las variables de entorno definidas
 * en el archivo `.env` estén disponibles a través de `process.env`.
 */
require('dotenv').config();


/**
 * Exporta un objeto de configuración con ajustes para la aplicación y la base de datos.
 */
module.exports = {
    app: {
        port: process.env.PORT || 4000 //coge el puerto que he asignado pero si no lo reconoce coge el 4000
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql.freedb.tech',
        user: process.env.MYSQL_USER || 'freedb_nerea',
        password: process.env.MYSQL_PSW || '6%p!n%QneUDQV7h',
        database: process.env.MYSQL_DB || 'freedb_PaperWingsDB',
        port: parseInt(process.env.MYSQL_PORT, 10) || 3306
    }
}