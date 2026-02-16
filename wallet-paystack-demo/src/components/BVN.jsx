import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BVN = () => {
  const navigate = useNavigate();
  const [bvn, setBvn] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bvn || bvn.length !== 11) {
      setError("Please enter a valid 11-digit BVN.");
      return;
    }

    // Update user in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    user.bvnVerified = true;
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to Dashboard
    navigate("/");
  };

  return (
    <div className="card">
      <h2>BVN Verification</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
  );
};

export default BVN;