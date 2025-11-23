/**
 * Debt Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { debtService } from '../services/debtService';
import type { DebtAccount } from '../types';

export function useDebt() {
  const [debts, setDebts] = useState<DebtAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadDebts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await debtService.getAllDebts();
      setDebts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load debts'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDebts();
  }, [loadDebts]);

  const createDebt = useCallback(async (data: Omit<DebtAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newDebt = await debtService.createDebt(data);
      setDebts(prev => [...prev, newDebt]);
      return newDebt;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create debt'));
      throw err;
    }
  }, []);

  const updateDebt = useCallback(async (id: string, data: Partial<DebtAccount>) => {
    try {
      const updated = await debtService.updateDebt(id, data);
      setDebts(prev => prev.map(debt => debt.id === id ? updated : debt));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update debt'));
      throw err;
    }
  }, []);

  const deleteDebt = useCallback(async (id: string) => {
    try {
      await debtService.deleteDebt(id);
      setDebts(prev => prev.filter(debt => debt.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete debt'));
      throw err;
    }
  }, []);

  const hasDebt = useCallback(async () => {
    return debtService.hasDebt();
  }, []);

  const getTotalDebt = useCallback(async () => {
    return debtService.getTotalDebt();
  }, []);

  return {
    debts,
    loading,
    error,
    createDebt,
    updateDebt,
    deleteDebt,
    hasDebt,
    getTotalDebt,
    refresh: loadDebts,
  };
}

