import { useState, useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      setBalance(Number(savedBalance)); 
    }
  }, []);

  return (
    <div className="dashboard">
      <h2>
        <FaMoneyBillWave style={{ color: "#0f9d58", marginRight: "8px" }} />
        Wallet Balance
      </h2>
      <p className="balance">₦{balance}</p>
    </div>
  );
};

export default Dashboard;