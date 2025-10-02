import { useState, useEffect, createContext } from 'react';
import './App.css';
import Welcome from './pages/Home/Welcome.tsx';
import List from './pages/Home/List.tsx';
import Add from './pages/Home/Add.tsx';
import type { Expense, ExpenseInput } from './types/Expense.ts';

export const PageContext = createContext<{
  currentPage: string;
  setCurrentPage: (page: string) => void;
}>({
  currentPage: 'Welcome',
  setCurrentPage: () => {},
});

function App() {
  const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';
  const [currentPage, setCurrentPage] = useState<string>('Welcome');
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

  function handlePageChange(page: string) {
    window.history.pushState(null, page, `/${page.toLowerCase()}`);
    setCurrentPage(page);
  }

  // Create pages object mapping page names to components
  const pages: { [key: string]: React.FunctionComponent } = {
    Welcome: () => <Welcome />,
    List: () => (
      <List 
        expenses={expenses}
        loading={loading}
        error={error}
        handleResetData={handleResetData}
      />
    ),
    Add: () => <Add handleAddExpense={handleAddExpense} />,
  };

  const CurrentPageComponent = pages[currentPage] || pages['Welcome'];

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage: handlePageChange }}>
      <CurrentPageComponent />
    </PageContext.Provider>
  );
}

export default App;
