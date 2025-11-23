/**
 * Ledger Service
 * Combines income and expenses into unified transactions
 */

import type { Transaction, SortField, SortDirection } from '../types';
import { dataRepository } from '@/data/services';

export class LedgerService {
  async getAllTransactions(): Promise<Transaction[]> {
    const [incomes, expenses, categories] = await Promise.all([
      dataRepository.getAllIncomes(),
      dataRepository.getAllExpenses(),
      dataRepository.getAllCategories(),
    ]);

    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

    const transactions: Transaction[] = [
      ...incomes.map(income => ({
        id: `income-${income.id}`,
        type: 'income' as const,
        date: income.date,
        amount: income.amount,
        description: income.source,
        source: income.source,
        createdAt: income.createdAt,
        incomeData: income,
      })),
      ...expenses.map(expense => ({
        id: `expense-${expense.id}`,
        type: 'expense' as const,
        date: expense.date,
        amount: expense.amount,
        description: expense.description,
        category: categoryMap.get(expense.categoryId),
        createdAt: expense.createdAt,
        expenseData: expense,
      })),
    ];

    return transactions;
  }

  sortTransactions(
    transactions: Transaction[],
    sortField: SortField,
    direction: SortDirection
  ): Transaction[] {
    const sorted = [...transactions];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }
}

export const ledgerService = new LedgerService();

