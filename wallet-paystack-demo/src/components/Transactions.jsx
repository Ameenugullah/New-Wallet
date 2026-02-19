import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const Transactions = () => {
	return (
		<div className="transactions-page">
			<div className="card">
				<h2>Add Transaction</h2>
				<TransactionForm />
			</div>
			<div className="card">
				<h2>All Transactions</h2>
				<TransactionList />
			</div>
		</div>
	);
};

export default Transactions;