/**
 * Expense-specific types
 */

import type { BaseEntity } from '@/core/types';

export interface Expense extends BaseEntity {
  date: string;
  amount: number;
  categoryId: string;
  description: string;
  tags: string[];
  notes?: string;
  recurringTransactionId?: string;
}

export interface ExpenseInput {
  date: string;
  amount: number;
  categoryId: string;
  description: string;
  tags: string[];
  notes?: string;
  recurringTransactionId?: string;
}

