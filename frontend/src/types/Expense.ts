import type { Identifiable } from './Core';

// What we send to the API (no id)
export interface ExpenseInput {
  date: string;
  description: string;
  payer: string;
  amount: number;
}

// What we get from the API (with id)
export interface Expense extends Identifiable {
  date: string;
  description: string;
  payer: string;
  amount: number;
}
