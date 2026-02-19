import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Toggle sidebar on small screens by toggling a class on <body>
  const toggleSidebar = () => {
    const opened = document.body.classList.toggle("sidebar-open");

    // If opening, add overlay to allow clicking outside to close
    if (opened) {
      let overlay = document.querySelector(".sidebar-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "sidebar-overlay";
        overlay.addEventListener("click", () => {
          document.body.classList.remove("sidebar-open");
          overlay.remove();
        });
        document.body.appendChild(overlay);
      }
    } else {
      const overlay = document.querySelector(".sidebar-overlay");
      if (overlay) overlay.remove();
    }
  };

  return (
    <div className="navbar">
      {/* Left side */}
      <div className="navbar-left">
        <button className="burger-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <FaBars />
        </button>
        <h1>PayOut</h1>
      </div>

      {/* Center navigation */}
      <div className="navbar-center">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          {!user && (
            <li><Link to="/signup" className="signup-btn">signup</Link></li>
          )}
        </ul>
      </div>

      {/* Right side */}
      <div className="navbar-right">
        {user && (
          <>
            <span className="username">{user.username}</span>
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="profile-icon"
                onClick={handleProfileClick}
              />
            ) : (
              <div
                className="profile-icon default-avatar"
                onClick={handleProfileClick}
              >
                👤
              </div>
            )}
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;