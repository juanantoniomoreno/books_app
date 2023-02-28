<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230227193658 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY fk_book_image');
        $this->addSql('DROP TABLE image');
        $this->addSql('ALTER TABLE book CHANGE book_id book_id INT AUTO_INCREMENT NOT NULL, CHANGE pages pages SMALLINT NOT NULL, CHANGE description description LONGTEXT NOT NULL, CHANGE book_is_deleted book_is_deleted TINYINT(1) NOT NULL, CHANGE main_image main_image VARCHAR(50) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE image (image_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL, book_id INT UNSIGNED NOT NULL, title VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, image_is_deleted TINYINT(1) DEFAULT 0 NOT NULL, INDEX fk_book_image (book_id), PRIMARY KEY(image_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT fk_book_image FOREIGN KEY (book_id) REFERENCES book (book_id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE book CHANGE book_id book_id INT UNSIGNED AUTO_INCREMENT NOT NULL, CHANGE pages pages SMALLINT UNSIGNED NOT NULL, CHANGE description description TEXT NOT NULL, CHANGE book_is_deleted book_is_deleted TINYINT(1) DEFAULT 0 NOT NULL, CHANGE main_image main_image VARCHAR(50) DEFAULT \'default_image.jpg\' NOT NULL');
    }
}
