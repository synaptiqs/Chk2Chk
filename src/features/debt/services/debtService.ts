/**
 * Debt Service
 */

import { dataRepository } from '@/data/services';
import { MAX_SAVINGS_WITH_DEBT } from '@/core/constants';
import type { DebtAccount } from '../types';

export class DebtService {
  async createDebt(data: Omit<DebtAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<DebtAccount> {
    return dataRepository.createDebt(data);
  }

  async getAllDebts(): Promise<DebtAccount[]> {
    return dataRepository.getAllDebts();
  }

  async getDebtById(id: string): Promise<DebtAccount | null> {
    return dataRepository.getDebtById(id);
  }

  async updateDebt(id: string, data: Partial<DebtAccount>): Promise<DebtAccount> {
    return dataRepository.updateDebt(id, data);
  }

  async deleteDebt(id: string): Promise<void> {
    return dataRepository.deleteDebt(id);
  }

  /**
   * Check if user has debt
   */
  async hasDebt(): Promise<boolean> {
    const debts = await this.getAllDebts();
    return debts.length > 0 && debts.some(debt => debt.balance > 0);
  }

  /**
   * Get total debt amount
   */
  async getTotalDebt(): Promise<number> {
    const debts = await this.getAllDebts();
    return debts.reduce((sum, debt) => sum + debt.balance, 0);
  }

  /**
   * Check if savings limit should be enforced
   */
  async shouldEnforceSavingsLimit(): Promise<boolean> {
    return this.hasDebt();
  }

  /**
   * Get maximum allowed savings
   */
  getMaxSavings(): number {
    return MAX_SAVINGS_WITH_DEBT;
  }
}

export const debtService = new DebtService();

