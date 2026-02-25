import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [dueDate, setDueDate] = useState("");
  const [borrower, setBorrower] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Could not fetch book");

        const data = await res.json();
        setTitle(data.title || "");
        setAuthor(data.author || "");
        setIsbn(data.isbn || "");
        setPublisher(data.publisher || "");
        setGenre(data.genre || "");
        setIsAvailable(data.availability?.isAvailable ? "true" : "false");
        setDueDate(
          data.availability?.dueDate
            ? new Date(data.availability.dueDate).toISOString().slice(0, 10)
            : ""
        );
        setBorrower(data.availability?.borrower || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const available = isAvailable === "true";
    const payload = {
      title,
      author,
      isbn,
      publisher,
      genre,
      availability: {
        isAvailable: available,
        ...(dueDate ? { dueDate } : {}),
        ...(borrower.trim() ? { borrower: borrower.trim() } : {}),
      },
    };

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update book");
      }

      navigate(`/books/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create">
      <h2>Update Book</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && (
        <form onSubmit={submitForm}>
          <label>Book Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <label>ISBN:</label>
          <input
            type="text"
            required
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />

          <label>Publisher:</label>
          <input
            type="text"
            required
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />

          <label>Genre:</label>
          <input
            type="text"
            required
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <label>Available:</label>
          <select
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label>Borrower:</label>
          <input
            type="text"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Book"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditBookPage;
