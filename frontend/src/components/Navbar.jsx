import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Book Library</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <div>
            <Link to="/books/add-book">Add Book</Link>
            <span>{user?.email}</span>
            <button type="button" onClick={handleClick}>
              Log out
            </button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
