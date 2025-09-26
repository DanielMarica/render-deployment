
import { useState } from 'react';
import type { Expense } from '../types/Expense.ts';

interface ExpenseAddProps {
  addExpense: (expense: Expense) => void;
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const [payer, setPayer] = useState('Alice');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expense = {
      date,
      description,
      payer,
      amount: parseFloat(amount),
    };
    addExpense(expense);
    setDate('');
    setDescription('');
    setAmount('');
    setPayer('Alice');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <label>
        Payer:
        <select value={payer} onChange={e => setPayer(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <label style={{ marginLeft: '1rem' }}>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </label>
      <label style={{ marginLeft: '1rem' }}>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
      </label>
      <label style={{ marginLeft: '1rem' }}>
        Amount:
        <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
      </label>
      <button type="submit" style={{ marginLeft: '1rem' }}>Add Expense</button>
    </form>
  );
}
