import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  return (
    <div className="transactions">
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id}>
              {tx.type === "credit" ? (
                <FaArrowDown style={{ color: "green", marginRight: "6px" }} />
              ) : (
                <FaArrowUp style={{ color: "red", marginRight: "6px" }} />
              )}
              <strong>{tx.type.toUpperCase()}</strong> ₦{tx.amount} –{" "}
              {tx.description} <em>({tx.date})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;