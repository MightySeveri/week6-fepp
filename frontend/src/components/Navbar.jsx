import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Book Library</h1>
      </Link>
      <div className="links">
        <div>
          <Link to="/add-book">Add Book</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Signup</Link>}
          {user && <button type="button" onClick={handleClick}>Log out</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
