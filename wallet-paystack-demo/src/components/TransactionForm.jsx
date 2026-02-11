import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function TransactionForm({ onTransaction }) {
  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      type,
      amount: Number(amount),
      description,
      date: new Date().toLocaleString(),
    };

    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    savedTransactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(savedTransactions));

    const currentBalance = Number(localStorage.getItem("balance")) || 0;
    const updatedBalance =
      type === "credit"
        ? currentBalance + Number(amount)
        : currentBalance - Number(amount);

    localStorage.setItem("balance", updatedBalance);

    if (onTransaction) onTransaction();

    setAmount("");
    setDescription("");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="credit">Credit <FaPlusCircle /></option>
          <option value="debit">Debit <FaMinusCircle /></option>
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