/**
 * Expense Service
 * Business logic for expense operations
 */

import { dataRepository } from '@/data/services';
import type { Expense, ExpenseInput } from '../types';

export class ExpenseService {
  async createExpense(input: ExpenseInput): Promise<Expense> {
    return dataRepository.createExpense(input);
  }

  async getAllExpenses(): Promise<Expense[]> {
    return dataRepository.getAllExpenses();
  }

  async getExpenseById(id: string): Promise<Expense | null> {
    return dataRepository.getExpenseById(id);
  }

  async updateExpense(id: string, data: Partial<ExpenseInput>): Promise<Expense> {
    return dataRepository.updateExpense(id, data);
  }

  async deleteExpense(id: string): Promise<void> {
    return dataRepository.deleteExpense(id);
  }

  async getTotalExpenses(startDate?: string, endDate?: string): Promise<number> {
    const expenses = await this.getAllExpenses();
    
    let filtered = expenses;
    if (startDate || endDate) {
      filtered = expenses.filter(expense => {
        if (startDate && expense.date < startDate) return false;
        if (endDate && expense.date > endDate) return false;
        return true;
      });
    }

    return filtered.reduce((sum, expense) => sum + expense.amount, 0);
  }
}

export const expenseService = new ExpenseService();

