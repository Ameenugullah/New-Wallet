import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransactions(savedTransactions);
  }, []);

  // Prepare data
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // read colors from CSS variables (fallback to hard-coded values)
  const getCssVar = (name, fallback) => {
    if (typeof window === "undefined" || !window.getComputedStyle) return fallback;
    const v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return v ? v.trim() : fallback;
  };

  const brandColor = getCssVar("--progress-grad-start", "#2a5298");
  const dangerColor = getCssVar("--danger", "#ff4d4d");

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Financial Overview",
        data: [income, expense],
        backgroundColor: [brandColor, dangerColor],
      },
    ],
  };

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [brandColor, dangerColor],
      },
    ],
  };

  return (
    <div className="analytics-grid">
      <div className="dashboard-card">
        <h3>Income vs Expense</h3>
        <Bar data={barData} />
      </div>
      <div className="dashboard-card">
        <h3>Distribution</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Analytics;