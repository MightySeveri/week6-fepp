import React from "react";
import BookListing from "./BookListing";

const BookListings = ({ books }) => {
  if (!books || books.length === 0) return <p className="no-books">No books available.</p>;

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookListing key={book.id} {...book} />
      ))}
    </div>
  );
};

export default React.memo(BookListings);
