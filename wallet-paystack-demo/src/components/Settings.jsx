import { useState } from "react";
import { FaTrash, FaRedo, FaMoon, FaSun } from "react-icons/fa";

function Settings({ onSettingsChange }) {
  const [theme, setTheme] = useState("light");

  const clearTransactions = () => {
    localStorage.removeItem("transactions");
    if (onSettingsChange) onSettingsChange();
    alert("All transactions cleared!");
  };

  const resetBalance = () => {
    localStorage.setItem("balance", 0);
    if (onSettingsChange) onSettingsChange();
    alert("Balance reset to ₦0!");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme; // apply theme to body
  };

  return (
    <div className="card">
      <h2>Settings</h2>
      <button onClick={clearTransactions}>
        <FaTrash style={{ marginRight: "6px" }} /> Clear Transactions
      </button>
      <button onClick={resetBalance}>
        <FaRedo style={{ marginRight: "6px" }} /> Reset Balance
      </button>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <FaMoon style={{ marginRight: "6px" }} />
        ) : (
          <FaSun style={{ marginRight: "6px" }} />
        )}
        Toggle Theme ({theme})
      </button>
    </div>
  );
}

export default Settings;