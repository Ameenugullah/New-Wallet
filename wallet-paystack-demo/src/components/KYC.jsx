import { useState } from "react";
import { useNavigate } from "react-router-dom";

const KYC = () => {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!idNumber) {
      setError("Please enter your ID number.");
      return;
    }

    // Update user in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    user.kycVerified = true;
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to BVN stage
    navigate("/bvn");
  };

  return (
    <div className="card">
      <h2>KYC Verification</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
  );
};

export default KYC;