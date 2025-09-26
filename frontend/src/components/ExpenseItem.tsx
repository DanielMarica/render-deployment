import type { Expense } from '../types/Expense.ts';

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div className="expense-item">
      <div>
        <strong>Date:</strong> {expense?.date ?? 'N/A'}
      </div>
      <div>
        <strong>Description:</strong> {expense?.description ?? 'N/A'}
      </div>
      <div>
        <strong>Payer:</strong> {expense?.payer ?? 'N/A'}
      </div>
      <div className="amount">
        <strong>Amount:</strong> $
        {typeof expense?.amount === 'number' && !isNaN(expense.amount)
          ? expense.amount.toFixed(2)
          : 'N/A'}
      </div>
    </div>
  );
}
