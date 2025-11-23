/**
 * Income-specific types
 */

import type { BaseEntity } from '@/core/types';

export interface Income extends BaseEntity {
  date: string; // ISO date string
  amount: number;
  source: string;
  notes?: string;
}

export interface IncomeInput {
  date: string;
  amount: number;
  source: string;
  notes?: string;
}

