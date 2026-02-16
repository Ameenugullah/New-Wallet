import { useState } from "react";
import { FaPlusCircle, FaMinusCircle, FaCheckCircle } from "react-icons/fa";


const TransactionForm = ({ onBalanceChange }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse current balance from localStorage
    let currentBalance = parseFloat(localStorage.getItem("balance")) || 0;

    // Update balance based on transaction type
    if (type === "income") {
      currentBalance += parseFloat(amount);
    } else {
      currentBalance -= parseFloat(amount);
    }

    // Save updated balance
    localStorage.setItem("balance", currentBalance);

    // Save transaction to localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      date: new Date().toLocaleString(),
    };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Update Dashboard balance
    if (onBalanceChange) onBalanceChange(currentBalance);

    // Reset form
    setAmount("");
    setType("income");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;