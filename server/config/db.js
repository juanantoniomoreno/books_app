//DATABASE CONFIG

//Libraries required
var mysql = require("mysql");
require("dotenv").config();

//Database config
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

//Create connection
connection.connect((error) =>{
    if ( error ) {
        throw error;
    } else {
        console.log( "Conexion correcta" );
    }
})

module.exports = connection;
