import "./paystack.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTransaction = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <Navbar />
      <div className="container grid-layout">
        <div className="left-panel">
          <div className="card">
            <Dashboard key={refresh} />
          </div>
          <div className="card">
            <TransactionForm onTransaction={handleTransaction} />
          </div>
        </div>
        <div className="right-panel">
          <div className="card">
            <TransactionList key={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;