import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const getProfileStatus = () => {
    if (!user) return "❌";
    if (!user.kycVerified) return "⚠️ KYC Required";
    if (user.kycVerified && !user.bvnVerified) return "⚠️ BVN Required";
    if (user.kycVerified && user.bvnVerified) return "✅ Verified";
    return "❌";
  };

  return (
    <div className="sidebar">
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/transactions">Transactions</a></li>
        <li><a href="/analytics">Analytics</a></li>
        <li><a href="/settings">Settings</a></li>
        <li>
          <a href="/profile">Profile</a>
          <span className="profile-status">{getProfileStatus()}</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;