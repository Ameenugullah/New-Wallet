import { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle, FaCheckCircle } from "react-icons/fa";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  // Load balance from localStorage when component mounts
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    setBalance(savedBalance ? parseFloat(savedBalance) : 0);
  }, []);

  return (
    <div className="dashboard-grid">
      {/* Balance / Summary Card */}
      <div className="dashboard-card">
        <h3>Balance Summary</h3>
        <p>
          Current Balance: <strong>₦{balance.toLocaleString()}</strong>
        </p>
      </div>

      {/* Transaction Form */}
      <div className="dashboard-card">
        <h3>Add Transaction</h3>
        <TransactionForm onBalanceChange={setBalance} />
      </div>

      {/* Transaction List */}
      <div className="dashboard-card">
        <h3>Recent Transactions</h3>
        <TransactionList onBalanceChange={setBalance} />
      </div>
    </div>
  );
};

export default Dashboard;