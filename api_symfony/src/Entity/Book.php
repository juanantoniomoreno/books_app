<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookRepository::class)]

class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::INTEGER)]
    private ?int $id = null;

    #[ORM\Column(length: 50, unique: true)]
    private ?string $isbn = null;

    #[ORM\Column(length: 150)]
    private ?string $title = null;

    #[ORM\Column(length: 150)]
    private ?string $subtitle = null;

    #[ORM\Column(length: 100)]
    private ?string $author = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $published = null;

    #[ORM\Column(length: 100)]
    private ?string $publisher = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $pages = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 200)]
    private ?string $website = null;

    #[ORM\Column(length: 50)]
    private ?string $category = null;

    #[ORM\Column]
    private ?bool $book_is_deleted = null;

    #[ORM\Column(length: 50)]
    private ?string $main_image = 'main.jpg';
        
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsbn(): ?string
    {
        return $this->isbn;
    }

    public function setIsbn(string $isbn): self
    {
        $this->isbn = $isbn;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(string $subtitle): self
    {
        $this->subtitle = $subtitle;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getPublished(): ?\DateTimeInterface
    {
        return $this->published;
    }

    public function setPublished(\DateTimeInterface $published): self
    {
        $this->published = $published;

        return $this;
    }

    public function getPublisher(): ?string
    {
        return $this->publisher;
    }

    public function setPublisher(string $publisher): self
    {
        $this->publisher = $publisher;

        return $this;
    }

    public function getPages(): ?int
    {
        return $this->pages;
    }

    public function setPages(int $pages): self
    {
        $this->pages = $pages;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(string $website): self
    {
        $this->website = $website;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function isBookIsDeleted(): ?bool
    {
        return $this->book_is_deleted;
    }

    public function setBookIsDeleted(bool $book_is_deleted): self
    {
        $this->book_is_deleted = $book_is_deleted;

        return $this;
    }

    public function getMainImage(): ?string
    {
        return $this->main_image;
    }

    public function setMainImage(string $main_image): self
    {
        $this->main_image = $main_image;

        return $this;
    }
    
    public function toArray():array
    {
        // TODO: Completar los atributos.
        return [
            'id'        => $this -> getId(),
            'isbn'      => $this -> getIsbn(),
            'title'     => $this -> getTitle(),
            'subtitle'  => $this -> getSubtitle(),
            'author'    => $this -> getAuthor(), 
            'published' => $this -> getPublished(),
            'publisher' => $this -> getPublisher(),
            'pages'     => $this -> getPages(),
            'description' => $this -> getDescription(),
            'website'   => $this -> getWebsite(),
            'category'  => $this -> getCategory(),
            'main_image'=> $this -> getMainImage()
        ];
    }

    public function fromJson(string $json) {
        $bookArr = json_decode($json, true);
        if (!$bookArr) {
            throw new \Exception('can-not-decode-json');
        }

        $this->fromArray($bookArr);
    }

    public function fromArray(array $book){
        // Habrán atributos obligatorios y otros que no, por lo que:
        if (!array_key_exists('isbn', $book)) {
            throw new \Exception('can-not-find-isbn-attribute');
        }
        $this->setIsbn($book['isbn']);

        if(!array_key_exists('website', $book)){
            throw new  \Exception('field-website-required');
        }
        $this->setWebsite($book['website']);

        if(!array_key_exists('title', $book)){
            throw new \Exception('field-title-is-required');
        }
        $this -> setTitle($book['title']);

        if(!array_key_exists('subtitle', $book)){
            throw new \Exception('field-subtitle-is-required');
        }
        $this -> setSubtitle($book['subtitle']);

        if(!array_key_exists('author', $book)){
            throw new \Exception('field-author-is-required');
        }
        $this -> setAuthor($book['author']);

        if(!array_key_exists('published', $book)){
            throw new \Exception('field-published-is-required');
        }
        $this -> setPublished($book['published']);

        if(!array_key_exists('publisher', $book)){
            throw new \Exception('field-publisher-is-required');
        }
        $this -> setPublisher($book['publisher']);

        if(!array_key_exists('description', $book)){
            throw new \Exception('field-description-is-required');
        }
        $this -> setPublished($book['description']);

        if(!array_key_exists('category', $book) ){
            throw new \Exception('field-category-required');
        }
        $this -> setCategory($book['category']);

        if(!array_key_exists('main_image', $book)){
            throw new \Exception('main_image-required');
        }
        $this -> setMainImage($book['main_image']);
    }
}
