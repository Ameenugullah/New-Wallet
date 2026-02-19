import { useState } from "react";
import { FaTrash, FaRedo, FaMoon, FaSun } from "react-icons/fa";
import ComfirmModal from "./ComfirmModal";

function Settings({ onSettingsChange }) {
  const [theme, setTheme] = useState("light");
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );
  const [modal, setModal] = useState({ show: false, action: null });

  const handleConfirm = () => {
    if (modal.action === "clear") {
      localStorage.removeItem("transactions");
      if (onSettingsChange) onSettingsChange();
    }
    if (modal.action === "reset") {
      localStorage.setItem("balance", 0);
      if (onSettingsChange) onSettingsChange();
    }
    setModal({ show: false, action: null });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
    if (onSettingsChange) onSettingsChange();
  };

  return (
    <div className="card">
      <h2>Settings</h2>
      <div className="settings">
        {/* Clear Transactions */}
        <button onClick={() => setModal({ show: true, action: "clear" })}>
          <FaTrash style={{ marginRight: "6px" }} /> Clear Transactions
        </button>

        {/* Reset Balance */}
        <button onClick={() => setModal({ show: true, action: "reset" })}>
          <FaRedo style={{ marginRight: "6px" }} /> Reset Balance
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <FaMoon style={{ marginRight: "6px" }} />
          ) : (
            <FaSun style={{ marginRight: "6px" }} />
          )}
          Toggle Theme ({theme})
        </button>

        {/* Currency Selection */}
        <div style={{ marginTop: "12px" }}>
          <label htmlFor="currency">Default Currency: </label>
          <select
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD ($)</option>
            <option value="NGN">NGN (₦)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ComfirmModal
        show={modal.show}
        title="Confirm Action"
        message={
          modal.action === "clear"
            ? "Are you sure you want to clear all transactions?"
            : "Are you sure you want to reset your balance to ₦0?"
        }
        onComfirm={handleConfirm}
        onCancel={() => setModal({ show: false, action: null })}
      />
    </div>
  );
}

export default Settings;