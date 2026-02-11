import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";

const Dashboard = () => {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? Number(savedBalance) : 0;
  });

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