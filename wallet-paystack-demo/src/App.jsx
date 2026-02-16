import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";   // ✅ only one import
import { AuthContext } from "./components/AuthProvider"; // ✅ context comes from same file
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionChart from "./components/TransactionChart";
import TransactionBarChart from "./components/TransactionBarChart";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./paystack.css";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <div className="left-panel">
            <Sidebar />
          </div>
          <div className="right-panel">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
             <Route
                path="/transactions/new"
  element={
    <ProtectedRoute>
      <TransactionForm />
    </ProtectedRoute>
                }
              />
              <Route
               path="/transactions/list"
  element={
    <ProtectedRoute>
      <TransactionList />
    </ProtectedRoute>
                 }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <div className="analytics-grid">
                      <TransactionChart />
                      <TransactionBarChart />
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;