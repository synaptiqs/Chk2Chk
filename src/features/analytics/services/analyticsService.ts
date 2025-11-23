/**
 * Analytics Service
 * Provides analytics and insights
 */

import { dataRepository } from '@/data/services';

export class AnalyticsService {
  /**
   * Get spending by category
   */
  async getSpendingByCategory(startDate?: string, endDate?: string): Promise<Map<string, number>> {
    const expenses = await dataRepository.getAllExpenses();
    const categories = await dataRepository.getAllCategories();
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

    let filtered = expenses;
    if (startDate || endDate) {
      filtered = expenses.filter(expense => {
        if (startDate && expense.date < startDate) return false;
        if (endDate && expense.date > endDate) return false;
        return true;
      });
    }

    const spending = new Map<string, number>();
    filtered.forEach(expense => {
      const categoryName = categoryMap.get(expense.categoryId) || 'Unknown';
      const current = spending.get(categoryName) || 0;
      spending.set(categoryName, current + expense.amount);
    });

    return spending;
  }

  /**
   * Get income vs expenses over time
   */
  async getIncomeVsExpenses(startDate?: string, endDate?: string): Promise<{
    date: string;
    income: number;
    expenses: number;
  }[]> {
    const [incomes, expenses] = await Promise.all([
      dataRepository.getAllIncomes(),
      dataRepository.getAllExpenses(),
    ]);

    let filteredIncomes = incomes;
    let filteredExpenses = expenses;

    if (startDate || endDate) {
      filteredIncomes = incomes.filter(income => {
        if (startDate && income.date < startDate) return false;
        if (endDate && income.date > endDate) return false;
        return true;
      });
      filteredExpenses = expenses.filter(expense => {
        if (startDate && expense.date < startDate) return false;
        if (endDate && expense.date > endDate) return false;
        return true;
      });
    }

    // Group by date
    const dateMap = new Map<string, { income: number; expenses: number }>();

    filteredIncomes.forEach(income => {
      const date = income.date;
      const current = dateMap.get(date) || { income: 0, expenses: 0 };
      dateMap.set(date, { ...current, income: current.income + income.amount });
    });

    filteredExpenses.forEach(expense => {
      const date = expense.date;
      const current = dateMap.get(date) || { income: 0, expenses: 0 };
      dateMap.set(date, { ...current, expenses: current.expenses + expense.amount });
    });

    return Array.from(dateMap.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Get average income
   */
  async getAverageIncome(startDate?: string, endDate?: string): Promise<number> {
    const incomes = await dataRepository.getAllIncomes();
    
    let filtered = incomes;
    if (startDate || endDate) {
      filtered = incomes.filter(income => {
        if (startDate && income.date < startDate) return false;
        if (endDate && income.date > endDate) return false;
        return true;
      });
    }

    if (filtered.length === 0) return 0;
    const total = filtered.reduce((sum, income) => sum + income.amount, 0);
    return total / filtered.length;
  }

  /**
   * Get average expenses
   */
  async getAverageExpenses(startDate?: string, endDate?: string): Promise<number> {
    const expenses = await dataRepository.getAllExpenses();
    
    let filtered = expenses;
    if (startDate || endDate) {
      filtered = expenses.filter(expense => {
        if (startDate && expense.date < startDate) return false;
        if (endDate && expense.date > endDate) return false;
        return true;
      });
    }

    if (filtered.length === 0) return 0;
    const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);
    return total / filtered.length;
  }
}

export const analyticsService = new AnalyticsService();

