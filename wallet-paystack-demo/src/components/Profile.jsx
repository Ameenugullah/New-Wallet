import { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [idNumber, setIdNumber] = useState("");
  const [bvn, setBvn] = useState("");
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    return parsedUser && parsedUser.profilePicture ? parsedUser.profilePicture : "";
  });
  const [pendingImage, setPendingImage] = useState("");
  const { login } = useContext(AuthContext);
  // Handle image upload (preview only, save on button click)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPendingImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save image to user profile and update context
  const handleSaveImage = () => {
    if (pendingImage) {
      updateUser({ profilePicture: pendingImage });
      setImagePreview(pendingImage);
      setPendingImage("");
      // Update AuthContext (triggers Navbar update)
      if (user && user.username && user.password) {
        login(user.username, user.password);
      } else if (user && user.username) {
        login(user.username, "");
      }
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleKYCSubmit = (e) => {
    e.preventDefault();
    if (!idNumber) {
      setError("Please enter your ID number.");
      return;
    }
    updateUser({ kycVerified: true, idNumber });
    setError("");
  };

  const handleBVNSubmit = (e) => {
    e.preventDefault();
    if (!bvn || bvn.length !== 11) {
      setError("Please enter a valid 11-digit BVN.");
      return;
    }
    updateUser({ bvnVerified: true, bvn });
    setError("");
  };

  if (!user) return <p>No user data found. Please sign up first.</p>;

  // Progress calculation
  let progress = 0;
  let currentStep = "Tia.1 – Signup Complete";
  if (user.kycVerified) {
    progress += 50;
    currentStep = "Tia.3 – BVN Verification";
  } else {
    currentStep = "Tia.2 – KYC Verification";
  }
  if (user.kycVerified && user.bvnVerified) {
    progress = 100;
    currentStep = "✅ Onboarding Complete";
  }

  return (
    <div className="card">
      <h2>User Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Profile Image Holder */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <div style={{ marginRight: 16 }}>
          {(pendingImage || imagePreview) ? (
            <img
              src={pendingImage || imagePreview}
              alt="Profile"
              style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "2px solid #ccc" }}
            />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#aaa", border: "2px solid #ccc" }}>
              👤
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {pendingImage && (
            <button type="button" style={{ marginTop: 4, background: '#7a2e2e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, cursor: 'pointer' }} onClick={handleSaveImage}>
              Save Image
            </button>
          )}
        </div>
      </div>

      {/* Step Indicator */}
      <div className="step-indicator">
        <p><strong>Current Stage:</strong> {currentStep}</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>

      {/* Stage 1: KYC */}
      {!user.kycVerified && (
        <div>
          <h3>KYC Verification (Tia.2)</h3>
          <form onSubmit={handleKYCSubmit}>
            <input
              type="text"
              placeholder="Enter National ID / Passport Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />
            <button type="submit">Verify KYC</button>
          </form>
        </div>
      )}

      {/* Stage 2: BVN */}
      {user.kycVerified && !user.bvnVerified && (
        <div>
          <h3>BVN Verification (Tia.3)</h3>
          <form onSubmit={handleBVNSubmit}>
            <input
              type="text"
              placeholder="Enter BVN"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              required
            />
            <button type="submit">Verify BVN</button>
          </form>
        </div>
      )}

      {/* Stage 3: Success */}
      {user.kycVerified && user.bvnVerified && (
        <p style={{ color: "green" }}>✅ All verifications complete. You now have full access.</p>
      )}
    </div>
  );
};

export default Profile;