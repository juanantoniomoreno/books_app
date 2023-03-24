<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ManagerRsegistry;

use App\DQL\DateTimeFunction;


/**
 * @extends ServiceEntityRepository<Book>
 *
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    public function save(Book $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    

    public function remove(Book $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Book[]
     */
    public function findAllBeforeYear(string $year): ?array
    {
        $query = $this->getEntityManager()->createQuery(
            'SELECT book
            FROM App\Entity\Book book
            WHERE YEAR(book.published) < :year
            ORDER BY book.published ASC'
        )->setParameter('year', $year);

        $books = $query->getArrayResult();

        return $books;
    }

    /**
     * @return Book[]
     */
    public function findAllCategory( string $category ): ?array
    {

        $query = $this -> getEntityManager() -> createQuery(

            "SELECT book
            FROM App\Entity\Book book
            WHERE book.book_is_deleted = 0
            AND book.category = :category"
        ) -> setParameter('category', $category);

        $booksCategory = $query -> getArrayResult();

        return $booksCategory;
    }

    /**
     * @return Book
     */
    public function findOneBook( int $id): ?Book
    {
        $query = $this -> getEntityManager() -> createQuery(
            "SELECT book
            FROM App\Entity\Book book
            WHERE book.id = :id"
        ) -> setParameter('id', $id);

        $book = $query -> getOneOrNullResult();
        return $book;
    }

    

//    /**
//     * @return Book[] Returns an array of Book objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Book
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
