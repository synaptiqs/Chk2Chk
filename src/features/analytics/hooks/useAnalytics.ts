/**
 * Analytics Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';

export function useAnalytics(startDate?: string, endDate?: string) {
  const [spendingByCategory, setSpendingByCategory] = useState<Map<string, number>>(new Map());
  const [incomeVsExpenses, setIncomeVsExpenses] = useState<{
    date: string;
    income: number;
    expenses: number;
  }[]>([]);
  const [averageIncome, setAverageIncome] = useState(0);
  const [averageExpenses, setAverageExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [spending, incomeExpenses, avgIncome, avgExpenses] = await Promise.all([
        analyticsService.getSpendingByCategory(startDate, endDate),
        analyticsService.getIncomeVsExpenses(startDate, endDate),
        analyticsService.getAverageIncome(startDate, endDate),
        analyticsService.getAverageExpenses(startDate, endDate),
      ]);
      setSpendingByCategory(spending);
      setIncomeVsExpenses(incomeExpenses);
      setAverageIncome(avgIncome);
      setAverageExpenses(avgExpenses);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load analytics'));
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    spendingByCategory,
    incomeVsExpenses,
    averageIncome,
    averageExpenses,
    loading,
    error,
    refresh: loadAnalytics,
  };
}

