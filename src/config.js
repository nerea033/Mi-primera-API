/**
 * Configuration module for the application.
 * 
 * Loads environment variables from a .env file using dotenv and
 * defines the necessary configuration for the application and MySQL database.
 * 
 * @module config
 * @requires dotenv
 */

/**
 * Invokes the config function of dotenv so that environment variables defined
 * in the .env file are available through 'process.env'.
 */
require('dotenv').config();


/**
 * Exports a configuration object with settings for the application and the database.
 */
module.exports = {
    app: {
        port: process.env.PORT || 4000 // Takes the assigned port but defaults to 4000 if not recognized.
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql.freedb.tech',
        user: process.env.MYSQL_USER || 'freedb_Nerea',
        password: process.env.MYSQL_PSW || 'GRv2j@nn7K8TbC4',
        database: process.env.MYSQL_DB || 'freedb_PaperWings',
        port: parseInt(process.env.MYSQL_PORT, 10) || 3306
    }
}