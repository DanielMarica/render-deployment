import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ExpenseInput } from '../types/Expense.ts';

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

// Zod schema with all validation rules
const expenseSchema = z.object({
  payer: z.enum(['Alice', 'Bob'], { 
    message: 'Payer must be either Alice or Bob' 
  }),
  date: z.string().min(1, 'Date is required'),
  description: z.string()
    .max(200, 'Description cannot be longer than 200 characters')
    .optional()
    .or(z.literal('')),
  amount: z.number({ 
    message: 'Amount must be a valid number'
  })
    .positive('Amount must be a positive number')
    .min(0.01, 'Amount must be at least 0.01')
});

// Infer TypeScript type from Zod schema
type FormData = z.infer<typeof expenseSchema>;

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      payer: 'Alice' as 'Alice' | 'Bob',
      date: '',
      description: '',
    },
  });

  const onSubmit = (data: FormData) => {
    addExpense(data as ExpenseInput);
    reset(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="expense-form">
      <label>
        Payer:
        <select {...register('payer')}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
        {errors.payer && <span className="error">{errors.payer.message}</span>}
      </label>
      
      <label>
        Date:
        <input 
          type="date" 
          {...register('date')} 
        />
        {errors.date && <span className="error">{errors.date.message}</span>}
      </label>
      
      <label>
        Description (optional):
        <input 
          type="text" 
          {...register('description')} 
          placeholder="Enter description (max 200 characters)"
        />
        {errors.description && <span className="error">{errors.description.message}</span>}
      </label>
      
      <label>
        Amount:
        <input 
          type="number" 
          step="0.01" 
          {...register('amount', { valueAsNumber: true })} 
          placeholder="Enter amount"
        />
        {errors.amount && <span className="error">{errors.amount.message}</span>}
      </label>
      
      <button type="submit">Add Expense</button>
    </form>
  );
}
