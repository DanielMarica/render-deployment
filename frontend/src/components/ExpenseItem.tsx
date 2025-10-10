import type { Expense } from '../types/Expense.ts';

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div className="bg-secondary rounded-xl shadow-md border border-primary p-6 flex flex-col gap-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div>
        <strong className="text-foreground">Date:</strong> {expense?.date ?? 'N/A'}
      </div>
      <div>
        <strong className="text-foreground">Description:</strong> {expense?.description ?? 'N/A'}
      </div>
      <div>
        <strong className="text-foreground">Payer:</strong> {expense?.payer ?? 'N/A'}
      </div>
      <div className="text-xl font-bold text-primary">
        <strong>Amount:</strong> $
        {typeof expense?.amount === 'number' && !isNaN(expense.amount)
          ? expense.amount.toFixed(2)
          : 'N/A'}
      </div>
    </div>
  );
}
