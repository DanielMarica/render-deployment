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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 items-center bg-secondary p-6 rounded-lg shadow-md border border-primary mb-8">
      <label className="flex flex-col font-medium text-foreground">
        Payer:
        <select 
          {...register('payer')}
          className="mt-2 p-2 rounded-md border border-primary bg-secondary text-base focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
        {errors.payer && <span className="text-destructive text-sm mt-1 font-normal">{errors.payer.message}</span>}
      </label>
      
      <label className="flex flex-col font-medium text-foreground">
        Date:
        <input 
          type="date" 
          {...register('date')}
          className="mt-2 p-2 rounded-md border border-primary bg-secondary text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.date && <span className="text-destructive text-sm mt-1 font-normal">{errors.date.message}</span>}
      </label>
      
      <label className="flex flex-col font-medium text-foreground">
        Description (optional):
        <input 
          type="text" 
          {...register('description')} 
          placeholder="Enter description (max 200 characters)"
          className="mt-2 p-2 rounded-md border border-primary bg-secondary text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.description && <span className="text-destructive text-sm mt-1 font-normal">{errors.description.message}</span>}
      </label>
      
      <label className="flex flex-col font-medium text-foreground">
        Amount:
        <input 
          type="number" 
          step="0.01" 
          {...register('amount', { valueAsNumber: true })} 
          placeholder="Enter amount"
          className="mt-2 p-2 rounded-md border border-primary bg-secondary text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.amount && <span className="text-destructive text-sm mt-1 font-normal">{errors.amount.message}</span>}
      </label>
      
      <button 
        type="submit"
        className="bg-primary text-accent-foreground border-none rounded-md px-6 py-3 text-base cursor-pointer mt-5 transition-colors hover:bg-primary/90"
      >
        Add Expense
      </button>
    </form>
  );
}
