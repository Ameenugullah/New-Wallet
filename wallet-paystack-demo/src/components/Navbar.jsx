import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      {/* Left side */}
      <div className="navbar-left">
        <h1>Paystack Clone</h1>
      </div>

      {/* Center navigation */}
      <div className="navbar-center">
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/transactions">Transactions</a></li>
          <li><a href="/analytics">Analytics</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/profile">Profile</a></li>
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