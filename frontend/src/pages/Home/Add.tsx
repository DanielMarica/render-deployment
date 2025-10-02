import { useContext } from 'react';
import { PageContext } from '../../App.tsx';
import ExpenseAdd from '../../components/ExpenseAdd.tsx';
import type { ExpenseInput } from '../../types/Expense.ts';

interface AddProps {
  handleAddExpense: (expense: ExpenseInput) => Promise<void>;
}

export default function Add({ handleAddExpense }: AddProps) {
  const { setCurrentPage } = useContext(PageContext);
  const onAddExpense = async (expense: ExpenseInput) => {
    await handleAddExpense(expense);
    setCurrentPage('List'); // Navigate to List after adding
  };

  return (
    <div className="add-page">
      <h1>Add New Expense</h1>
      
      <ExpenseAdd addExpense={onAddExpense} />
      
      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => setCurrentPage('Welcome')}>Back to Welcome</button>
        <button onClick={() => setCurrentPage('List')} style={{ marginLeft: '1rem' }}>View Expenses</button>
      </div>
    </div>
  );
}
