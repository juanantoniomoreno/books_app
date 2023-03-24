const connection = require("../config/db.js");

class bookController {

    //1. Get all books
    //localhost:4000/books/getAllBooks
    getAllBooks = (_req, res) => {

        let sql = 'SELECT * FROM book WHERE book_is_deleted = false ORDER BY book_id DESC';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({error}) : res.status(200).json(result);
        })
    }

    //--------------------------------------------------------------------------
    //2. getBooksBeforeThirteen - get books before 2013
    //localhost:4000/books/getBooksBeforeThirteen
    getBooksBeforeThirteen = (_req, res) => {

        let sql = 'SELECT * FROM book WHERE book_is_deleted = false AND published < "2013/01/01" ORDER BY published DESC';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({error}) : res.status(200).json(result);
        })
    }

    //--------------------------------------------------------------------------------
    //3. getBooksDrama - get all drama books
    //localhost:4000/books/getBooksDrama
    getBooksDrama = (_req, res) => {

        let sql = 'SELECT * FROM book WHERE book_is_deleted = false AND category LIKE "%drama%"';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({error}) : res.status(200).json(result);
        })
    }

    //------------------------------------------------------------------------------
    //4. Information and Images of a book using isbn
    //localhost:4000/books/getBoookImages/:book_id
    getBookImages = (req, res) => {
        const {book_id} = req.params;

        let sqlBook = `SELECT * FROM book WHERE book_id = ${book_id} AND book_is_deleted = 0`;
        let sqlImages = `SELECT image.* FROM image WHERE image.book_id = ${book_id} AND image.image_is_deleted = 0`;

        connection.query(sqlBook, (errorBook, resultBook) => {
            if(errorBook){ res.status(400).json({errorBook}) }

            connection.query(sqlImages, (errorImage, resultImages) => {
                errorImage 
                ? res.status(400).json({errorImage})
                : res.status(200).json({resultBook, resultImages});
            });
        });
    }

    //------------------------------------------------------------------------------
    //5. Create a new Book
    //localhost:4000/books/createBook
    createBook = (req, res) => {

        const {isbn, title, subtitle, author, published, publisher, pages, description, website, category } = JSON.parse(req.body.regBook);

        let sqlNew =  `INSERT INTO book (isbn, title, subtitle, author, published, publisher, pages, description, website, category) VALUES ('${isbn}', LOWER('${title}'), '${subtitle}', LOWER('${author}'), '${published}', LOWER('${publisher}'), ${pages}, '${description}', '${website}', LOWER('${category}') )`;

        if(req.files.length > 0){
            let image = req.files[0].filename;

            sqlNew = `INSERT INTO book (isbn, title, subtitle, author, published, publisher, pages, description, website, category, main_image) VALUES ('${isbn}', LOWER('${title}'), '${subtitle}', LOWER('${author}'), '${published}', LOWER('${publisher}'), ${pages}, '${description}', '${website}', LOWER('${category}'), '${image}')`;
        }
        
        //console.log('SQL ANTES DE LA QUERY', sqlNew);

        connection.query(sqlNew, (errorNew, resultNew) => {

            errorNew ? res.status(400).json({errorNew}) : res.status(200).json(resultNew)
        })
    }

    //------------------------------------------------------------------------------
    //Function to save the imageS of the book
    saveBookImages = (file, book_id, next) => {

        let image = file;

        image.forEach((img) => {
            let sql = `UPDATE book SET main_image = '${img.filename}' WHERE book_id = ${book_id}`;

            connection.query(sql, (error, result) => {
                error && res.status(400).json({error})
                //console.log('FOTO INSERTADA', result);
            });
        });
    }

    //-----------------------------------------------------------------
    //6. Logical deletion of a book
    //localhost:4000/books/deleteBook/:book_id
    deleteBook = (req, res) => {
        
        let {book_id} = req.params;

        let sqlDelete = `UPDATE book SET book_is_deleted = true WHERE book_id = ${book_id}`;

        connection.query(sqlDelete, (errorDelete, resultDelete) => {
            errorDelete
            ? res.status(400).json({ errorDelete }) 
            : res.status(200).json(resultDelete);
        });
    }

    //----------------------------------------------------------
    //7. Add Images to Book
    //localhost:4000/books/addImages/:book_id
    addImages = (req, res) => {

        let { book_id } = req.params;

        let images = [''];

        if( req.files != undefined ){
            images = req.files;
        }

        images.forEach((img) => {

            let sqlAddImage = `INSERT INTO image (title, book_id) VALUES ('${img.filename}', ${book_id})`;

            connection.query( sqlAddImage, (errorAddImage, _resultAddImage) => {
                errorAddImage && res.status(400).json({ errorAddImage })
            })
        })

        let sqlImages = `SELECT * FROM image WHERE book_id = ${book_id} AND image_is_deleted = false`;

        connection.query( sqlImages, (errorImgs, resultImgs) => {
            errorImgs ? res.status(400).json({ errorImgs }) : res.status(200).json( resultImgs );
        })
    }

    //----------------------------------------------------------
    //8. Logical Deletion of Image
    //localhost:4000/books/deleteImage/:image_id
    deleteImage = (req, res) =>{
        let {image_id} = req.params;

        let sqlDelImg = `UPDATE image SET image_is_deleted = true WHERE image_id = ${image_id}`

        connection.query(sqlDelImg, (errorDelImg, resultDelImg) => {
            errorDelImg ? res.status(400).json({ errorDelImg }) : res.status( 200 ).json( resultDelImg );
        })
    }

    //------------------------------------------------------------------------------
    //9. Information  of a book using book_id
    //localhost:4000/books/getBookInfo/:book_id
    getBookInfo = (req, res) => {
        const {book_id} = req.params;

        let sqlBook = `SELECT * FROM book WHERE book_id = ${book_id} AND book_is_deleted = 0`;
        
        connection.query(sqlBook, (errorBook, resultBook) => {
            errorBook ? res.status(400).json({errorBook}) : res.status(200).json(resultBook);
        });
    }

    //-------------------------------------------------------
    //10. Edit information of a book
    //localhost:4000/books/editBook/:book_id
    editBook = (req, res) => {

        const {book_id} = req.params;
        console.log( book_id );
        

        const {isbn, title, subtitle, author, published, publisher, pages, description, website, category } = JSON.parse(req.body.regBook);

        let sqlNew =  `UPDATE book SET isbn = "${isbn}", title = LOWER("${title}"), subtitle = "${subtitle}", author = LOWER("${author}"), published = "${published}", publisher = LOWER("${publisher}"), pages = ${pages}, description = '${description}', website = "${website}", category = LOWER('${category}') WHERE book_id = ${book_id}`;

        if(req.files.length > 0){
            let image = req.files[0].filename;

            sqlNew = `UPDATE book SET isbn = "${isbn}", title = LOWER("${title}"), subtitle = "${subtitle}", author = LOWER("${author}"), published = "${published}", publisher = LOWER("${publisher}"), pages = ${pages}, description = '${description}', website = "${website}", category = LOWER('${category}'), main_image = "${image}" WHERE book_id = ${book_id}`;
        }

        connection.query(sqlNew, (errorNew, resultNew) => {
            errorNew ? res.status(400).json({errorNew}) : res.status(200).json(resultNew)
        })
    }
}

module.exports = new bookController;