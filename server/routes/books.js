var express = require('express');
const multer = require('../middleware/multer');
const bookController = require("../controllers/bookController");
const { validateCreate } = require('../middleware/validator');
var router = express.Router();


//1. getAllBooks - get all books with their images (if they have);
//localhost:4000/books/getAllBooks
router.get("/getAllBooks", bookController.getAllBooks);

//-------------------------------------------------------
//2. getBooksBeforeThirteen - get books before 2013
//localhost:4000/books/getBooksBeforeThirteen
router.get("/getBooksBeforeThirteen", bookController.getBooksBeforeThirteen);

//-------------------------------------------------------
//3. getBooksDrama - get all drama books
//localhost:4000/books/getBooksDrama
router.get("/getBooksDrama", bookController.getBooksDrama);

//-------------------------------------------------------
//4. Information and Images of a book using isbn
//localhost:4000/books/getBoookImages/:book_id
router.get("/getBookImages/:book_id", bookController.getBookImages);

//-------------------------------------------------------
//5. Create a new Book
//localhost:4000/books/createBook
router.post("/createBook", multer("book"), bookController.createBook);

//-------------------------------------------------------
//6. Logical deletion of a book
//localhost:4000/books/deleteBook/:book_id
router.put("/deleteBook/:book_id", bookController.deleteBook);

//----------------------------------------------------------
//7. Add Images to Book
//localhost:4000/books/addImages/:book_id
router.post("/addImages/:book_id", multer("book"), bookController.addImages);

//----------------------------------------------------------
//8. Logical Deletion of Image
//localhost:4000/books/deleteImage/:image_id
router.put("/deleteImage/:image_id", bookController.deleteImage);

//-------------------------------------------------------
//9. Information  of a book using book_id
//localhost:4000/books/getBookInfo/:book_id
router.get("/getBookInfo/:book_id", bookController.getBookInfo);

//-------------------------------------------------------
//10. Edit information of a book
//localhost:4000/books/editBook/:book_id
router.put("/editBook/:book_id", multer("book"), bookController.editBook);

module.exports = router;