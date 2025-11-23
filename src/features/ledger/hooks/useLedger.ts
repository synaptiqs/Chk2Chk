/**
 * Ledger Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { ledgerService } from '../services/ledgerService';
import type { Transaction, SortField, SortDirection } from '../types';

export function useLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ledgerService.getAllTransactions();
      const sorted = ledgerService.sortTransactions(data, sortField, sortDirection);
      setTransactions(sorted);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load transactions'));
    } finally {
      setLoading(false);
    }
  }, [sortField, sortDirection]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  }, [sortField]);

  return {
    transactions,
    loading,
    error,
    sortField,
    sortDirection,
    handleSort,
    refresh: loadTransactions,
  };
}

