CREATE DATABASE books_orbys;

-- DROP DATABASE books_orbys;

USE books_orbys;

CREATE TABLE book (
	book_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published DATETIME NOT NULL,
    publisher VARCHAR(100) NOT NULL,
    pages SMALLINT UNSIGNED NOT NULL, 
    description TEXT NOT NULL,
    website VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    book_is_deleted BOOLEAN NOT NULL DEFAULT false,
    main_image VARCHAR(50) NOT NULL DEFAULT 'default_image.jpg'
);

CREATE TABLE image (
	image_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    book_id INT UNSIGNED NOT NULL,
    image_is_deleted BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT fk_book_image FOREIGN KEY (book_id)
    REFERENCES book(book_id) ON DELETE CASCADE ON UPDATE CASCADE
);

