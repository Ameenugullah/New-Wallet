import "./paystack.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import TransactionChart from "./components/TransactionChart";
import Footer from "./components/Footer";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTransaction = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      <Navbar />
      <div className="container grid-layout">
        <div className="left-panel">
          <Sidebar />
        </div>
        <div className="right-panel">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="card">
                    <Dashboard key={refresh} />
                  </div>
                  <div className="card">
                    <TransactionForm onTransaction={handleTransaction} />
                  </div>
                  <div className="card">
                    <TransactionList key={refresh} />
                  </div>
                </>
              }
            />
            <Route
              path="/analytics"
              element={<TransactionChart key={refresh} />}
            />
            <Route
              path="/settings"
              element={
                <div className="card">
                  <h2>Settings</h2>
                  <p>Here you can configure your wallet preferences.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;