import React from "react";

const BookListing = ({ title, author, isbn, publisher, genre, availability }) => {
  const isAvailable = availability?.isAvailable ?? false;

  return (
    <article className="book-preview" aria-label={`Book ${title}`}>
      <h2>{title}</h2>
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>ISBN:</strong> {isbn}
      </p>
      <p>
        <strong>Publisher:</strong> {publisher}
      </p>
      <p>
        <strong>Genre:</strong> {genre}
      </p>
      <p>
        <strong>Available:</strong> {isAvailable ? "Yes" : "No"}
      </p>
    </article>
  );
};

export default React.memo(BookListing);
