/**
 * Debt-specific types
 */

import type { BaseEntity } from '@/core/types';

export interface DebtAccount extends BaseEntity {
  name: string;
  type: 'credit_card' | 'loan' | 'other';
  balance: number;
  minimumPayment: number;
  interestRate?: number;
  dueDate?: string;
}

