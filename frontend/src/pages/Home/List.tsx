import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import ExpenseItem from '../../components/ExpenseItem.tsx';
import ExpenseSorter from '../../components/ExpenseSorter.tsx';
import type { Expense } from '../../types/Expense.ts';
import onlinePayAnimation from '../../assets/onlinePay.json';

interface ListProps {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  handleResetData: () => Promise<void>;
}

export default function List({ expenses, loading, error, handleResetData }: ListProps) {
  const [sortingAlgo, setSortingAlgo] = useState<(a: Expense, b: Expense) => number>(() => () => 0);
  const [showLoading, setShowLoading] = useState(true);
  const [minLoadingTime, setMinLoadingTime] = useState(true);

  // Minimum 5 seconds loading time to see animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading if either API is loading OR minimum time hasn't passed
  useEffect(() => {
    setShowLoading(loading || minLoadingTime);
  }, [loading, minLoadingTime]);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo);
  };

  const sortedExpenses = [...expenses].sort(sortingAlgo);

  if (showLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh' 
      }}>
        <Lottie 
          animationData={onlinePayAnimation} 
          loop={true}
          style={{ width: 300, height: 300 }}
        />
        <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#7c3aed' }}>
          Loading expenses...
        </p>
      </div>
    );
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
