import { useState } from "react";
import { FaPlusCircle, FaMinusCircle, FaCheckCircle } from "react-icons/fa";

function TransactionForm({ onTransaction }) {
  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(""); // feedback message

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      type,
      amount: Number(amount),
      description,
      date: new Date().toLocaleString(),
    };

    // Save transaction to localStorage
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    savedTransactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(savedTransactions));

    // Update balance
    const currentBalance = Number(localStorage.getItem("balance")) || 0;
    const updatedBalance =
      type === "credit"
        ? currentBalance + Number(amount)
        : currentBalance - Number(amount);

    localStorage.setItem("balance", updatedBalance);

    // Notify parent to refresh Dashboard & TransactionList
    if (onTransaction) onTransaction();

    // Reset form
    setAmount("");
    setDescription("");

    // Show success message
    setMessage("Transaction added successfully!");
    setTimeout(() => setMessage(""), 2000); // clear after 2s
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      {/* Feedback message */}
      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          <FaCheckCircle style={{ marginRight: "6px" }} />
          {message}
        </p>
      )}

      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </label>

      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <button type="submit">
        {type === "credit" ? <FaPlusCircle /> : <FaMinusCircle />} Add
      </button>
    </form>
  );
}

export default TransactionForm;