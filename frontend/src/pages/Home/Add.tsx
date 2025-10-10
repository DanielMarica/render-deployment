import { useNavigate } from 'react-router-dom';
import ExpenseAdd from '../../components/ExpenseAdd.tsx';
import type { ExpenseInput } from '../../types/Expense.ts';
import { Button } from "@/components/ui/button"

interface AddProps {
  handleAddExpense: (expense: ExpenseInput) => Promise<void>;
}

export default function Add({ handleAddExpense }: AddProps) {
  const navigate = useNavigate();
  
  const onAddExpense = async (expense: ExpenseInput) => {
    await handleAddExpense(expense);
    navigate('/list'); // Navigate to List after adding
  };

  return (
    <div className="add-page">
      <h1>Add New Expense</h1>
      
      <ExpenseAdd addExpense={onAddExpense} />
      
      
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button>Button</Button>
      </div>

    </div>
  );
}
