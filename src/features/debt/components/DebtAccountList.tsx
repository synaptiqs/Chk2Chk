/**
 * Debt Account List Component
 * Displays list of debt account entries
 */

import { formatCurrency } from '@/core/utils';
import type { DebtAccount } from '../types';

interface DebtAccountListProps {
  debts: DebtAccount[];
  onEdit?: (debt: DebtAccount) => void;
  onDelete?: (id: string) => void;
}

export function DebtAccountList({ debts, onEdit, onDelete }: DebtAccountListProps) {
  if (debts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No debt accounts yet.</p>
        <p className="text-sm mt-2">Add your first debt account to track it.</p>
      </div>
    );
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'credit_card': return 'Credit Card';
      case 'loan': return 'Loan';
      case 'other': return 'Other';
      default: return type;
    }
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-700 mb-1">Total Debt</p>
          <p className="text-2xl font-bold text-red-900">{formatCurrency(totalDebt)}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm font-medium text-orange-700 mb-1">Total Minimum Payments</p>
          <p className="text-2xl font-bold text-orange-900">{formatCurrency(totalMinimumPayments)}</p>
        </div>
      </div>

      {/* Debt Accounts List */}
      <div className="space-y-2">
        {debts.map((debt) => (
          <div
            key={debt.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{debt.name}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {getTypeLabel(debt.type)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Balance</p>
                    <p className="font-semibold text-red-600">{formatCurrency(debt.balance)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min. Payment</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(debt.minimumPayment)}</p>
                  </div>
                  {debt.interestRate !== undefined && (
                    <div>
                      <p className="text-gray-500">Interest Rate</p>
                      <p className="font-semibold text-gray-900">{debt.interestRate.toFixed(2)}%</p>
                    </div>
                  )}
                  {debt.dueDate && (
                    <div>
                      <p className="text-gray-500">Due Date</p>
                      <p className="font-semibold text-gray-900">Day {debt.dueDate}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {onEdit && (
                  <button
                    onClick={() => onEdit(debt)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(debt.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

