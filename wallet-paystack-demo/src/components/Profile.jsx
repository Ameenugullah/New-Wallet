import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [bvn, setBvn] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, profilePicture: reader.result };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  const handleKYCSubmit = (e) => {
    e.preventDefault();
    if (!idNumber) {
      setError("Please enter your ID number.");
      return;
    }
    const updatedUser = { ...user, kycVerified: true, idNumber };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setError("");
  };

  const handleBVNSubmit = (e) => {
    e.preventDefault();
    if (!bvn || bvn.length !== 11) {
      setError("Please enter a valid 11-digit BVN.");
      return;
    }
    const updatedUser = { ...user, bvnVerified: true, bvn };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setError("");
  };

  if (!user) return <p>No user data found. Please sign up first.</p>;

  return (
    <div className="card">
      <h2>User Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Profile Picture */}
      <div>
        <h3>Profile Picture</h3>
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{ width: "100px", borderRadius: "50%" }}
          />
        ) : (
          <p>No picture uploaded</p>
        )}
        <input type="file" accept="image/*" onChange={handlePictureUpload} />
      </div>

      {/* Personal Info */}
      <div>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {user.firstName} {user.otherName} {user.surname}</p>
        <p><strong>Date of Birth:</strong> {user.dob}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
      </div>

      {/* KYC Verification */}
      <div>
        <h3>KYC Verification</h3>
        {user.kycVerified ? (
          <p style={{ color: "green" }}>✅ KYC Verified</p>
        ) : (
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
        )}
      </div>

      {/* BVN Verification */}
      <div>
        <h3>BVN Verification</h3>
        {user.bvnVerified ? (
          <p style={{ color: "green" }}>✅ BVN Verified</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Profile;