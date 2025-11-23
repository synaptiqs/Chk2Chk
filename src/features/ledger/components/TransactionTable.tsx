/**
 * Transaction Table Component
 * Sortable table displaying all transactions
 */

import { format } from 'date-fns';
import { formatCurrency } from '@/core/utils';
import type { Transaction, SortField, SortDirection } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  loading?: boolean;
}

export function TransactionTable({
  transactions,
  sortField,
  sortDirection,
  onSort,
  loading = false,
}: TransactionTableProps) {
  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => {
    const isActive = sortField === field;
    return (
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-1 text-left hover:text-primary-600 font-medium"
      >
        {children}
        <span className="text-gray-400">
          {isActive ? (sortDirection === 'asc' ? '↑' : '↓') : '⇅'}
        </span>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading transactions...</div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No transactions yet.</p>
        <p className="text-sm mt-2">Add income or expenses to see them here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="date">Date</SortButton>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="type">Type</SortButton>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="description">Description</SortButton>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="amount">Amount</SortButton>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {format(new Date(transaction.date), 'MMM dd, yyyy')}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {transaction.type === 'income' ? 'Income' : 'Expense'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {transaction.description}
                {transaction.source && transaction.type === 'income' && (
                  <span className="text-gray-500 ml-2">({transaction.source})</span>
                )}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {transaction.category || '-'}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-right ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

