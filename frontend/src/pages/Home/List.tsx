import { useState } from 'react';
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
        <button onClick={handleResetData}>Reset Data</button>
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
