/**
 * Expenses Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../services/expenseService';
import type { Expense, ExpenseInput } from '../types';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseService.getAllExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load expenses'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const createExpense = useCallback(async (input: ExpenseInput) => {
    try {
      const newExpense = await expenseService.createExpense(input);
      setExpenses(prev => [...prev, newExpense]);
      return newExpense;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create expense'));
      throw err;
    }
  }, []);

  const updateExpense = useCallback(async (id: string, data: Partial<ExpenseInput>) => {
    try {
      const updated = await expenseService.updateExpense(id, data);
      setExpenses(prev => prev.map(expense => expense.id === id ? updated : expense));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update expense'));
      throw err;
    }
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete expense'));
      throw err;
    }
  }, []);

  return {
    expenses,
    loading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
    refresh: loadExpenses,
  };
}

