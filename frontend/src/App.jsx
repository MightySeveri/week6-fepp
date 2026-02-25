import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import BookPage from "./pages/BookPage";
import EditBookPage from "./pages/EditBookPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
