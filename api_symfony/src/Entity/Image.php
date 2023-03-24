<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $title = null;

    #[ORM\Column]
    private ?bool $image_is_deleted = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Book $book = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function isImageIsDeleted(): ?bool
    {
        return $this->image_is_deleted;
    }

    public function setImageIsDeleted(bool $image_is_deleted): self
    {
        $this->image_is_deleted = $image_is_deleted;

        return $this;
    }

    public function getBook(): ?Book
    {
        return $this->book;
    }

    public function setBook(?Book $book)
    {
        $this->book = $book;
    }

    // TODO toArray()
    public function toArray():array
    {
        // TODO: Completar los atributos.
        return [
            'id'        => $this -> getId(),
            'title'     => $this -> getTitle(),
            'image_is_deleted' => $this -> isImageIsDeleted()
        ];
    }
}
