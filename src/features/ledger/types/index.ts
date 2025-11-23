/**
 * Ledger-specific types
 */

import type { Income } from '@/features/income/types';
import type { Expense } from '@/features/expenses/types';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: string;
  amount: number;
  description: string;
  category?: string;
  source?: string;
  createdAt: string;
  // Keep original data for navigation
  incomeData?: Income;
  expenseData?: Expense;
}

export type SortField = 'date' | 'amount' | 'type' | 'description';
export type SortDirection = 'asc' | 'desc';

