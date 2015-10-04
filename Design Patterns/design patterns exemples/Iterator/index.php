<?php

require 'Book.php';
require 'BookList.php';
require 'BookListIterator.php';

$firstBook = new Book('Core PHP Programming, Third Edition', 'Atkinson and Suraski');
$secondBook = new Book('PHP Bible', 'Converse and Park');
$thirdBook = new Book('Design Patterns', 'Gamma, Helm, Johnson, and Vlissides');

$books = new BookList();
$books->addBook($firstBook);
$books->addBook($secondBook);
$books->addBook($thirdBook);


$booksIterator = new BookListIterator($books);

while ($booksIterator->hasNextBook()) {
    $book = $booksIterator->getNextBook();
    echo $book->getAuthorAndTitle();
}