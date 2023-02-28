<?php

namespace App\Controller;

use App\Entity\Book;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class BookController extends AbstractController
{
    //--------------------------------------------------------------------
    //Get All Books
    //localhost:8000/books/allbooks
    #[Route('/books/allbooks', name: 'books_allbooks')]
    public function getAllBooks( EntityManagerInterface $entityManager ): JsonResponse {

        $query = $entityManager -> createQuery(

            "SELECT b.book_id, b.isbn, b.title, b.subtitle, b.author, b.published, b.publisher, b.pages, b.description, b.website, b.category, b.book_is_deleted, b.main_image 
            FROM App\Entity\Book b
            WHERE b.book_is_deleted = 0"
        );
        
        $allBooks = $query->getResult();

        $response = new JsonResponse();

        if($allBooks){
            
            $response -> setData([
                'data' => $allBooks
            ]);
    
            $response -> setStatusCode(JsonResponse::HTTP_OK);

        } else {

            $response -> setStatusCode( JsonResponse::HTTP_BAD_REQUEST );
            $response -> setData(['message' => 'bad request']);
        }

        return $response;
    }

    //--------------------------------------------------------------------------
    //Books published before 2013
    //localhost:8000/books/beforeThirteen
    #[Route('/books/beforeThirteen', name: 'books_before_2013')]
    public function getOldBooks( EntityManagerInterface $entityManager ): JsonResponse {

        $query = $entityManager -> createQuery(

            "SELECT b.book_id, b.isbn, b.title, b.subtitle, b.author, b.published, b.publisher, b.pages, b.description, b.website, b.category, b.book_is_deleted, b.main_image
            FROM App\Entity\Book b
            WHERE b.book_is_deleted = 0
            AND b.published < '2013/01/01'"
        );
        
        $oldBooks = $query->getResult();

        $response = new JsonResponse();

        if($oldBooks){
            
            $response -> setData([
                'data' => $oldBooks
            ]);
    
            $response -> setStatusCode(JsonResponse::HTTP_OK);

        } else {

            $response -> setStatusCode( JsonResponse::HTTP_BAD_REQUEST );
        }

        return $response;
    }

    //------------------------------------------------------------------
    //Get drama Books
    //localhost:8000/books/getDramaBooks
    #[Route('/books/getDramaBooks', name: 'books_dramaBooks')]
    public function getDramaBooks( EntityManagerInterface $entityManager ): JsonResponse {

        $query = $entityManager -> createQuery(

            "SELECT b.book_id, b.isbn, b.title, b.subtitle, b.author, b.published, b.publisher, b.pages, b.description, b.website, b.category, b.book_is_deleted, b.main_image 
            FROM App\Entity\Book b
            WHERE b.book_is_deleted = 0
            AND b.category LIKE '%drama%'"
        );
        
        $dramaBooks = $query->getResult();

        $response = new JsonResponse();

        if($dramaBooks){
            
            $response -> setData([
                'data' => $dramaBooks
            ]);
    
            $response -> setStatusCode(JsonResponse::HTTP_OK);

        } else {

            $response -> setStatusCode( JsonResponse::HTTP_BAD_REQUEST );
            $response -> setData(['message' => 'books not found']);
        }

        return $response;
    }

    //------------------------------------------------------------------------------
    //Get info of a book
    //localhost:8000/books/getOneBook/{book_id}
    #[Route('/books/getOneBook/{book_id}', name: 'books_getOneBook')]
    public function getOneBook( EntityManagerInterface $entityManager, $book_id ): JsonResponse {

        $query = $entityManager -> createQuery(

            "SELECT b.book_id, b.isbn, b.title, b.subtitle, b.author, b.published, b.publisher, b.pages, b.description, b.website, b.category, b.book_is_deleted, b.main_image 
            FROM App\Entity\Book b
            WHERE b.book_id = {$book_id}
            AND b.book_is_deleted = false"
        );
        
        $book = $query->getResult();

        $response = new JsonResponse();

        if($book){
            
            $queryImgs = $entityManager -> createQuery(
                "SELECT i.title
                FROM App\Entity\Image i
                WHERE i.book_id = {$book_id}
                AND i.image_is_deleted = 0"
            );

            $images = $queryImgs -> getResult();

            if($images) {
                $response -> setStatusCode(JsonResponse::HTTP_OK);

                $response -> setData([
                    'resultBook' => $book,
                    'resultImages' => $images
                ]);
            }
            else {
                $response -> setStatusCode( JsonResponse::HTTP_BAD_REQUEST );
                $response -> setData(['message' => 'images not found']);    
            }
    
        } else {

            $response -> setStatusCode( JsonResponse::HTTP_BAD_REQUEST );
            $response -> setData(['message' => 'book not found']);
        }

        return $response;
    }

    //--------------------------------------------------------------
    //Create a new Book
    //localhost:8000/books/saveBook
    #[Route('/books/saveBook', name: 'books_saveBook')]
    public function saveBook( EntityManagerInterface $entityManager, Request $request ): JsonResponse{

        //Get Values from reques
        $isbn = $request -> request -> get('isbn');
        $title = $request -> request -> get('title');
        $subtitle = $request -> request -> get('subtitle');
        $author = $request -> request -> get('author');
        $published = $request -> request -> get('published');
        $publisher = $request -> request -> get('publisher');
        $pages = $request -> request -> get('pages');
        $description = $request -> request -> get('description');
        $website = $request -> request -> get('website');
        $category = $request -> request -> get('isbn');
        $main_image = $request -> request -> get('main_image');

        //Create objet and set values
        $book = new Book();

        //Create date of publishing
        $published_dt = DateTime::createFromFormat("Y-m-d H:i:s", $published);
 
        $book -> setIsbn($isbn);
        $book -> setTitle($title);
        $book -> setSubtitle($subtitle);
        $book -> setAuthor($author);
        $book -> setPublished($published_dt );
        $book -> setPublisher($publisher);
        $book -> setPages($pages);
        $book -> setDescription($description);
        $book -> setWebsite($website);
        $book -> setCategory($category);
        $book -> setBookIsDeleted(false);
        $book -> setMainImage($main_image);
        
        //Save object in doctrine
        $entityManager -> persist( $book );

        //set database table
        $entityManager -> flush();

        $response = new JsonResponse();

        $message = "Book created with id: " .$book -> getBookId();
        $response -> setStatusCode(JsonResponse::HTTP_OK);
        $response -> setData(['message' => $message]);

        return $response;
    }

    //------------------------------------------------------------
    //Logical Deletion of a Book
    //localhost:8000/books/deleteBook/{book_id}
    #[Route('/books/deleteBook/{book_id}', name: 'books_deleteBook')]
    public function logicalDeleteBook( EntityManagerInterface $entityManager, $book_id ):JsonResponse {

        /* $em = $doctrine -> getManager(); */
        $book_repo = $entityManager -> getRepository(Book::class);
        $book = $book_repo -> find($book_id);

        $response = new JsonResponse();

        if( $book && is_object($book)){

            $book -> setBookIsDeleted(1);

            $entityManager -> persist($book);
            $entityManager -> flush();
            $message = 'Book deleted' . $book -> getBookId();

            $response -> setStatusCode(JsonResponse::HTTP_OK);
            $response -> setData(['message' => $message]);
            
        }else {

            $message = 'Book does not exist';
            $response -> setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            $response -> setData(['message' => $message]);
        }

        return $response;
    } 

    //-------------------------------------------------------------
    //UPDate one book
    //localhost:8000/books/updateBook/{book_id}
    #[Route('/books/updateBook/{book_id}', name: 'books_updateBook')]
    public function updateBook( EntityManagerInterface $entityManager, $book_id ):JsonResponse {
        //Load Repo
        $book_repo = $entityManager -> getRepository(Book::class);

        //Find to get object
        $book = $book_repo -> find($book_id);

        $response = new JsonResponse();

        //Check if object comes
        if(!$book){

            $message = 'Book does not exist';
            $response -> setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            $response -> setData(['message' => $message]);

        }else {

            //Asign values to object
            $book -> setPages(500); 
            $book -> setDescription('Hola Mundo DESDE SYMFONY');

            $entityManager -> persist($book);

            $entityManager -> flush();
            $message = 'book updated'. $book -> getBookId();

            $response -> setStatusCode(JsonResponse::HTTP_OK);
            $response -> setData(['message' => $message]);
        }

        return $response;
    }

     
}
