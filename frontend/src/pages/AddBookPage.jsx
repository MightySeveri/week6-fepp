import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [dueDate, setDueDate] = useState("");
  const [borrower, setBorrower] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "null");

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

    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token || ""}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create book");
    }

    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
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

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
