/**
 * Bills Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { billService } from '../services/billService';
import type { Bill } from '../types';

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadBills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await billService.getAllBills();
      setBills(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load bills'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBills();
  }, [loadBills]);

  const createBill = useCallback(async (data: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newBill = await billService.createBill(data);
      setBills(prev => [...prev, newBill]);
      return newBill;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create bill'));
      throw err;
    }
  }, []);

  const updateBill = useCallback(async (id: string, data: Partial<Bill>) => {
    try {
      const updated = await billService.updateBill(id, data);
      setBills(prev => prev.map(bill => bill.id === id ? updated : bill));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update bill'));
      throw err;
    }
  }, []);

  const deleteBill = useCallback(async (id: string) => {
    try {
      await billService.deleteBill(id);
      setBills(prev => prev.filter(bill => bill.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete bill'));
      throw err;
    }
  }, []);

  return {
    bills,
    loading,
    error,
    createBill,
    updateBill,
    deleteBill,
    refresh: loadBills,
  };
}

