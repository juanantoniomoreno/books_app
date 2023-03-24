<?php

namespace App\Controller;

use App\Entity\Book;
use App\Entity\Image;

use App\Repository\BookRepository;
use App\Repository\ImageRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BookController extends AbstractController
{
    //--------------------------------------------------------------------
    //Get All Books
    //localhost:8000/books/allbooks
    #[Route('/ws/books/allbooks', name: 'books_allbooks')]
    public function getAllBooks(BookRepository $bookRepository, EntityManagerInterface $entityManager ): JsonResponse {
        // TODO: Operaciones sobre DB en el Repository.
        $books = [];
        
        foreach ($bookRepository->findAllNotDeleted() as $book) {
            $books[] = $book->toArray();
        }

        $response = new JsonResponse();
        
        $lengthBooks = count($books);

        if($lengthBooks > 0){
            
            $response -> setData([
                'books' => $books
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
    #[Route('/ws/books-before-{year}', name: 'books_before_year')]
    public function getOldBooks(string $year, BookRepository $bookRepository ): JsonResponse {

        $books = $bookRepository -> findAllBeforeYear($year);
        
        $response = new JsonResponse();

        if($books){
            $response -> setData([
                'data' => $books
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
    #[Route('/ws/books-by-category/{category}', name: 'books_category')]
    public function getCategoryBooks(string $category, BookRepository $bookRepository ): JsonResponse {

        $booksCategory = $bookRepository -> findAllCategory($category);

        $response = new JsonResponse();

        if($booksCategory){
            $response -> setData([
                'booksCategory' => $booksCategory
            ]);
    
            $response -> setStatusCode(JsonResponse::HTTP_OK);

        } else {
            $response -> setStatusCode( JsonResponse::HTTP_BAD_REQUEST );
        }

        return $response;
    }
        

    //------------------------------------------------------------------------------
    //Get info of a book
    //localhost:8000/books/getOneBook/{book_id}
    #[Route('/ws/books/get-book-by-id/{id}', name: 'books_getBook')]
    public function getOneBook( BookRepository $bookRepository, ImageRepository $imageRepository, int $id ): JsonResponse {

        $book = new Book();
        $book = $bookRepository -> findOneBook($id);

        $response = new JsonResponse();

        if(!$book){
            $response -> setStatusCode( JsonResponse::HTTP_BAD_REQUEST );
            $response -> setData(['message' => 'book not found']);
            return $response;
        }

        $images = [];
        foreach ($imageRepository -> findAllByBook( $book ) as $image) {
            $images[] = $image->toArray();
        }

        $response -> setStatusCode(JsonResponse::HTTP_OK);

        $response -> setData([
            'book' => $book->toArray(),
            'images' => $images
        ]);

        return $response;
    }

    //--------------------------------------------------------------
    //Create a new Book
    //localhost:8000/books/saveBook
    #[Route('/ws/books/saveBook', name: 'books_saveBook')]
    public function saveBook(ManagerRegistry $doctrine, EntityManagerInterface $entityManager, BookRepository $bookRepository, Request $request ): JsonResponse{

        $entityManager = $doctrine->getManager();

        $date = new DateTime();
        $finalDate = $date->createFromFormat('yyyy-mm-dd', $request->request->get('published')); 
  
        $book = new Book();

        $book->setIsbn($request->request->get('isbn'));
        $book->setTitle($request->request->get('title'));
        $book->setSubtitle($request->request->get('subtitle'));
        $book->setAuthor($request->request->get('author'));
        $book->setPublished($finalDate);
        $book->setPublisher($request->request->get('publisher'));
        $book->setPages($request->request->get('pages'));
        $book->setDescription($request->request->get('description'));
        $book->setWebsite($request->request->get('website'));
        $book->setCategory($request->request->get('category'));
        $book->setMainImage($request->request->get('main_image'));
  
        $bookRepository -> save($book);
  
        //$message = "Book created with id: " .$book -> getId();
        //$response -> setStatusCode(JsonResponse::HTTP_OK);
        //$response -> setData(['message' => $message]);

        return new JsonResponse();
    }

    //------------------------------------------------------------
    //Logical Deletion of a Book
    #[Route('/ws/books/delete-book/{id}', name: 'books_deleteBook', methods:['PUT'])]
    public function logicalDeleteBook( int $id, BookRepository $bookRepository, EntityManagerInterface $entityManagerInterface ):JsonResponse 
    {
        $book = $bookRepository ->find($id);

        $response = new JsonResponse();

        if (!$book || !is_object($book)) {
            $message = 'Book does not exist';
            $response -> setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            $response -> setData(['message' => $message]);
        }

        $book -> setBookIsDeleted(1);

        $entityManagerInterface -> flush();
        $message = 'Book deleted' . $book -> getTitle();

            $response -> setStatusCode(JsonResponse::HTTP_OK);
            $response -> setData(['message' => $message]);

        return $response;
    } 


    //-------------------------------------------------------------
    //UPDate one book
    //localhost:8000/books/updateBook/{book_id}
    #[Route('/ws/books/update-book/{id}', name: 'books_updateBook')]
    public function updateBook($id, BookRepository $bookRepository, Request $request, EntityManagerInterface $entityManagerInterface ):JsonResponse {
        try {
        $book = $bookRepository -> find($id);
        $contentAsJson = $request->getContent();
        if (!$contentAsJson) {
            return new JsonResponse(['message'=>'empty-json']);
        }

        dump($book);
        $book->fromJson($contentAsJson);
        dump($book);

        dd(
            $request->getContent(),
            json_decode($request->getContent()),
            json_decode($request->getContent(), true),
            '2: '.$request->get('title'),
            '3: '.$request->get('subtitle'),
            '4: '.$request->get('data'),
            $request
        );
        $jsonAsString = $request->getContent();

        $data = json_decode($jsonAsString, true);
        } catch (\Exception $e) {
            return new JsonResponse(['message'=>$e->getMessage()]);
        /*
            } catch(\Exception $e) {
            // throw $e;
            return new JsonResponse(['message'=>'unknown-error']);
        */    
        }
        /*
        $book->fromJson($jsonAsString);

        $response = new JsonResponse();        
        //Check if object comes

        if(!$book){
            $message = 'Book does not exist';
            $response -> setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            $response -> setData(['message' => $message]);

        }        
        $entityManagerInterface -> flush();

        $message = 'book updated'. $book -> getId();        
        $response -> setStatusCode(JsonResponse::HTTP_OK);

        $response -> setData(['message' => $message]);        
        return $response;
        */

        $response = new JsonResponse();
        $response -> setData(['book' => $data]);

        return $response;
        

    }

     
}
