import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const Signup = () => {
  const { login } = useContext(AuthContext); // reuse login to set user after signup
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      // Save user credentials in localStorage (demo only, not secure!)
      const newUser = { username, password };
      localStorage.setItem("registeredUser", JSON.stringify(newUser));

      // Automatically log in after signup
      login(username, password);

      // Redirect to dashboard
      navigate("/");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;