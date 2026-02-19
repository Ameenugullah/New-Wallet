import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function TransactionBarChart() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransactions(savedTransactions);
  }, []);

  const grouped = transactions.reduce((acc, tx) => {
    const date = tx.date.split(",")[0];
    if (!acc[date]) acc[date] = { income: 0, expense: 0 };
    acc[date][tx.type] += tx.amount;
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const credits = labels.map((date) => grouped[date].income);
  const debits = labels.map((date) => grouped[date].expense);

  const data = {
    labels,
    datasets: [
      {
        label: "Credits",
        data: credits,
        backgroundColor: "#0f9d58",
      },
      {
        label: "Debits",
        data: debits,
        backgroundColor: "#e74c3c",
      },
    ],
  };

  return (
    <div className="card">
      <h2>Transactions Over Time</h2>
      <Bar data={data} />
    </div>
  );
}

export default TransactionBarChart;