/**
 * Income Service
 * Business logic for income operations
 */

import { dataRepository } from '@/data/services';
import type { Income, IncomeInput } from '../types';

export class IncomeService {
  /**
   * Create a new income entry
   */
  async createIncome(input: IncomeInput): Promise<Income> {
    return dataRepository.createIncome(input);
  }

  /**
   * Get all income entries
   */
  async getAllIncomes(): Promise<Income[]> {
    return dataRepository.getAllIncomes();
  }

  /**
   * Get income by ID
   */
  async getIncomeById(id: string): Promise<Income | null> {
    return dataRepository.getIncomeById(id);
  }

  /**
   * Update income entry
   */
  async updateIncome(id: string, data: Partial<IncomeInput>): Promise<Income> {
    return dataRepository.updateIncome(id, data);
  }

  /**
   * Delete income entry
   */
  async deleteIncome(id: string): Promise<void> {
    return dataRepository.deleteIncome(id);
  }

  /**
   * Get total income for a date range
   */
  async getTotalIncome(startDate?: string, endDate?: string): Promise<number> {
    const incomes = await this.getAllIncomes();
    
    let filtered = incomes;
    if (startDate || endDate) {
      filtered = incomes.filter(income => {
        if (startDate && income.date < startDate) return false;
        if (endDate && income.date > endDate) return false;
        return true;
      });
    }

    return filtered.reduce((sum, income) => sum + income.amount, 0);
  }
}

export const incomeService = new IncomeService();

