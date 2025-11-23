/**
 * Bucket-specific types
 */

import type { BaseEntity } from '@/core/types';

export interface Bucket extends BaseEntity {
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  balance: number; // Calculated: allocatedAmount - spentAmount
  categoryId?: string;
}
