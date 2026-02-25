import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookPage = ({ isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const deleteBook = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const res = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token || ""}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete book");
    }
  };

  const onDeleteClick = async (bookId) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteBook(bookId);
      navigate("/");
    } catch (err) {
      console.error("Error deleting book:", err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

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
          {isAuthenticated && (
            <>
              <button
                type="button"
                onClick={() => navigate(`/edit-book/${book.id}`)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDeleteClick(book.id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookPage;
