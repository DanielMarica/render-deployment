import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout.tsx';
import Welcome from './pages/Home/Welcome.tsx';
import List from './pages/Home/List.tsx';
import Add from './pages/Home/Add.tsx';
import type { Expense, ExpenseInput } from './types/Expense.ts';

function App() {
  const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';
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

  // Create browser router with layout and nested routes
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Welcome />
        },
        {
          path: '/list',
          element: (
            <List 
              expenses={expenses}
              loading={loading}
              error={error}
              handleResetData={handleResetData}
            />
          )
        },
        {
          path: '/add',
          element: <Add handleAddExpense={handleAddExpense} />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
