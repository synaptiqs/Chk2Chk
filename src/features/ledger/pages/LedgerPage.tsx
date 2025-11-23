/**
 * Ledger Page
 * Displays all transactions (income and expenses) in a sortable table
 */

import { useLedger } from '../hooks/useLedger';
import { TransactionTable } from '../components/TransactionTable';
import { formatCurrency } from '@/core/utils';

export function LedgerPage() {
  const { transactions, loading, sortField, sortDirection, handleSort } = useLedger();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transaction Ledger</h1>
        <p className="text-gray-600 mt-1">View all your income and expenses in one place</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Income</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Balance</p>
          <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">All Transactions</h2>
          <p className="text-sm text-gray-500 mt-1">
            {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
          </p>
        </div>
        <div className="p-6">
          <TransactionTable
            transactions={transactions}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

