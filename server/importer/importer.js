//CONFIG IMPORTER

//Connect with database
const mysql = require('mysql');

//Use moment to work with dates
const moment = require('moment-timezone');

//Use filesystem (fs) to work wit files
const fs = require('fs');

//Function to get the json object from the file
const readJSON = () => {
    const data = fs.readFileSync( './books.json', 'utf-8');
    return JSON.parse( data );
}

//Function to convert the value from published in a datetime value in mysql
const convertToDateTime = ( value ) => {
    const date = moment.utc( value );
    const formatDate = date.format('YYYY-MM-DD HH:mm:ss');
    return formatDate;
}

//Database config
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'books_orbys',
})

//Array books from the file
const {books} = readJSON();

//Start connection to database
connection.connect();

//Query to insert in each column
const sql = `INSERT INTO book (isbn, title, subtitle, author, published, publisher, pages, description, website, category ) VALUES ?`;

//Values from the array books
const values = books.map( book => [book.isbn, book.title, book.subtitle, book.author, convertToDateTime( book.published ), book.publisher, book.pages, book.description, book.website, book.category])

//Execute the query
connection.query( sql, [values], (error, _results, _fields) => {
    if(error) throw error;

    console.log( 'Insert succesful');
})

//Finish connection
connection.end();
