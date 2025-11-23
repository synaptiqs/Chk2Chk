/**
 * Balance Reminder Component
 * Displays current balance at the top of each page
 * Clickable to navigate to ledger
 */

import { Link } from 'react-router-dom';
import { useIncome } from '@/features/income';
import { useExpenses } from '@/features/expenses';
import { formatCurrency } from '@/core/utils';

export function BalanceReminder() {
  const { incomes, loading: incomeLoading } = useIncome();
  const { expenses, loading: expenseLoading } = useExpenses();

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpenses;

  const isLoading = incomeLoading || expenseLoading;

  if (isLoading) {
    return null; // Don't show while loading
  }

  return (
    <Link
      to="/ledger"
      className={`w-full py-3 px-4 border-b block hover:opacity-90 transition-opacity cursor-pointer ${
        balance >= 0 
          ? 'bg-green-50 border-green-200 hover:bg-green-100' 
          : 'bg-red-50 border-red-200 hover:bg-red-100'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-lg ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {balance >= 0 ? '💰' : '⚠️'}
          </span>
          <span className={`text-sm font-medium ${balance >= 0 ? 'text-green-800' : 'text-red-800'}`}>
            Current Balance:
          </span>
        </div>
        <span className={`text-xl font-bold ${balance >= 0 ? 'text-green-900' : 'text-red-900'}`}>
          {formatCurrency(balance)}
        </span>
      </div>
    </Link>
  );
}

