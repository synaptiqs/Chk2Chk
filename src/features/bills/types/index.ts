/**
 * Bill-specific types
 */

import type { BaseEntity } from '@/core/types';

export interface Bill extends BaseEntity {
  name: string;
  amount: number;
  dueDate: string; // Day of month (1-31)
  frequency: 'monthly' | 'weekly' | 'yearly';
  categoryId: string;
  isPaid: boolean;
  lastPaidDate?: string;
}

