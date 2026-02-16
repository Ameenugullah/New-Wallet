import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TransactionChart() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransactions(savedTransactions);
  }, []);

  const credits = transactions
    .filter((tx) => tx.type === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const debits = transactions
    .filter((tx) => tx.type === "debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const data = {
    labels: ["Credits", "Debits"],
    datasets: [
      {
        data: [credits, debits],
        backgroundColor: ["#0f9d58", "#e74c3c"],
        borderColor: ["#0c7a45", "#c0392b"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => `₦${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="card">
      <h2>Transaction Breakdown</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default TransactionChart;