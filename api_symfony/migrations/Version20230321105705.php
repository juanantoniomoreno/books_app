<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230321105705 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create book and image tables';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<SQL
CREATE TABLE book (
    id INT AUTO_INCREMENT NOT NULL,
    isbn VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published DATETIME NOT NULL,
    publisher VARCHAR(100) NOT NULL,
    pages SMALLINT NOT NULL,
    description LONGTEXT NOT NULL,
    website VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    book_is_deleted TINYINT(1) NOT NULL,
    main_image VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
SQL
);
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, book_id INT NOT NULL, title VARCHAR(50) NOT NULL, image_is_deleted TINYINT(1) NOT NULL, INDEX IDX_C53D045F16A2B381 (book_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F16A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F16A2B381');
        $this->addSql('DROP TABLE book');
        $this->addSql('DROP TABLE image');
    }
}
