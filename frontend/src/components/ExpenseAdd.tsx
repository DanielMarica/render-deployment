import { useForm } from 'react-hook-form';
import type { ExpenseInput } from '../types/Expense.ts';

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

// Type for the form data
interface FormData {
  payer: string;
  date: string;
  description: string;
  amount: number;
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      payer: 'Alice',
      date: '',
      description: '',
      amount: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    addExpense(data);
    reset(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="expense-form">
      <label>
        Payer:
        <select {...register('payer', { required: 'Payer is required' })}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
        {errors.payer && <span className="error">{errors.payer.message}</span>}
      </label>
      
      <label>
        Date:
        <input 
          type="date" 
          {...register('date', { required: 'Date is required' })} 
        />
        {errors.date && <span className="error">{errors.date.message}</span>}
      </label>
      
      <label>
        Description:
        <input 
          type="text" 
          {...register('description', { 
            required: 'Description is required',
            minLength: { value: 3, message: 'Description must be at least 3 characters' }
          })} 
          placeholder="Enter description"
        />
        {errors.description && <span className="error">{errors.description.message}</span>}
      </label>
      
      <label>
        Amount:
        <input 
          type="number" 
          step="0.01" 
          {...register('amount', { 
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' }
          })} 
          placeholder="Enter amount"
        />
        {errors.amount && <span className="error">{errors.amount.message}</span>}
      </label>
      
      <button type="submit">Add Expense</button>
    </form>
  );
}
