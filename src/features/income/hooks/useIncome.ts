/**
 * Income Hooks
 * React hooks for income operations
 */

import { useState, useEffect, useCallback } from 'react';
import { incomeService } from '../services/incomeService';
import type { Income, IncomeInput } from '../types';

export function useIncome() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadIncomes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await incomeService.getAllIncomes();
      setIncomes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load incomes'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIncomes();
  }, [loadIncomes]);

  const createIncome = useCallback(async (input: IncomeInput) => {
    try {
      const newIncome = await incomeService.createIncome(input);
      setIncomes(prev => [...prev, newIncome]);
      return newIncome;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create income'));
      throw err;
    }
  }, []);

  const updateIncome = useCallback(async (id: string, data: Partial<IncomeInput>) => {
    try {
      const updated = await incomeService.updateIncome(id, data);
      setIncomes(prev => prev.map(income => income.id === id ? updated : income));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update income'));
      throw err;
    }
  }, []);

  const deleteIncome = useCallback(async (id: string) => {
    try {
      await incomeService.deleteIncome(id);
      setIncomes(prev => prev.filter(income => income.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete income'));
      throw err;
    }
  }, []);

  return {
    incomes,
    loading,
    error,
    createIncome,
    updateIncome,
    deleteIncome,
    refresh: loadIncomes,
  };
}

