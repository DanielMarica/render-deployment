import { useState, useEffect } from 'react';
import ExpenseItem from '../components/ExpenseItem.tsx';
import ExpenseAdd from '../components/ExpenseAdd.tsx';
import ExpenseSorter from '../components/ExpenseSorter.tsx';
import type { Expense, ExpenseInput } from '../types/Expense.ts';

export default function Home() {
  const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';
  const [sortingAlgo, setSortingAlgo] = useState<(a: Expense, b: Expense) => number>(() => () => 0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sendApiRequestandHandleError = async (method: string = 'GET', path: string, body?: ExpenseInput) => {
    try {
      const response = await fetch(`${host}/api/${path}`, {
        method: method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await sendApiRequestandHandleError('GET', 'expenses');
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (newExpense: ExpenseInput) => {
    await sendApiRequestandHandleError('POST', 'expenses', newExpense);
    await fetchExpenses(); // Refresh the list after adding
  };

  const handleResetData = async () => {
    setExpenses([]); // Clear current expenses optimistically
    setLoading(true);

    const resetData = await sendApiRequestandHandleError('POST', 'expenses/reset');
    setExpenses(resetData.data);
    setLoading(false);
  };

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // Pay attention here, we're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = expenses.sort(sortingAlgo);

  if (loading) {
    return <div>Loading expenses...</div>;
  }

  return (
    <div>
      <h1>Expense Sharing App</h1>

      {error && <div>Error: {error}</div>}

      <div>
        <ExpenseAdd addExpense={handleAddExpense} />
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
