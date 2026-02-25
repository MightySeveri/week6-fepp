import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Could not fetch book");

        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const availability = book?.availability;

  return (
    <div className="book-page">
      <button type="button" onClick={() => navigate("/")}>
        Back
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {book && (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Genre: {book.genre}</p>
          <p>Available: {availability?.isAvailable ? "Yes" : "No"}</p>
          <p>
            Due Date:{" "}
            {availability?.dueDate
              ? new Date(availability.dueDate).toLocaleDateString()
              : "—"}
          </p>
          <p>Borrower: {availability?.borrower || "—"}</p>
        </div>
      )}
    </div>
  );
};

export default BookPage;
