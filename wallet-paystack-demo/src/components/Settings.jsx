
import { useState } from "react";
import { FaTrash, FaRedo, FaMoon, FaSun } from "react-icons/fa";
import ComfirmModal from "./ComfirmModal";

function Settings({ onSettingsChange }) {
  const [theme, setTheme] = useState("light");
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

  return (
    <div className="card">
      <h2>Settings</h2>
      <button onClick={() => setModal({ show: true, action: "clear" })}>
        <FaTrash style={{ marginRight: "6px" }} /> Clear Transactions
      </button>
      <button onClick={() => setModal({ show: true, action: "reset" })}>
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

      <ComfirmModal
        show={modal.show}
        title="Comfirm Action"
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