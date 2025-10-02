import { useState, useContext } from 'react';
import { PageContext } from '../../App.tsx';
import ExpenseItem from '../../components/ExpenseItem.tsx';
import ExpenseSorter from '../../components/ExpenseSorter.tsx';
import type { Expense } from '../../types/Expense.ts';

interface ListProps {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  handleResetData: () => Promise<void>;
}

export default function List({ expenses, loading, error, handleResetData }: ListProps) {
  const { setCurrentPage } = useContext(PageContext);
  const [sortingAlgo, setSortingAlgo] = useState<(a: Expense, b: Expense) => number>(() => () => 0);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo);
  };

  const sortedExpenses = [...expenses].sort(sortingAlgo);

  if (loading) {
    return <div>Loading expenses...</div>;
  }

  return (
    <div className="list-page">
      <h1>Expense Sharing App</h1>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setCurrentPage('Welcome')}>Back to Welcome</button>
        <button onClick={() => setCurrentPage('Add')} style={{ marginLeft: '1rem' }}>Add New Expense</button>
        <button onClick={handleResetData} style={{ marginLeft: '1rem' }}>Reset Data</button>
      </div>

      <h2>Expenses ({expenses.length})</h2>

      {expenses.length > 0 && <ExpenseSorter setSortingAlgo={handleAlgoChange} />}

      <div className="expense-list">
        {sortedExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          sortedExpenses.map((expense, idx) => (
            <ExpenseItem
              key={expense.id ?? `expense-${idx}`}
              expense={expense}
            />
          ))
        )}
      </div>
    </div>
  );
}
