/**
 * Envelope-specific types
 */

import type { BaseEntity } from '@/core/types';

export interface Envelope extends BaseEntity {
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  balance: number; // Calculated: allocatedAmount - spentAmount
  categoryId?: string;
}

