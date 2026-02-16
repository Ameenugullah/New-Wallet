import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1>Wallet App</h1>
      </div>

      <nav className="navbar-center">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="username">Hello, {user.username}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;