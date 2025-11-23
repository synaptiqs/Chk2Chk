/**
 * Income List Component
 * Displays list of income entries
 */

import { format } from 'date-fns';
import { formatCurrency } from '@/core/utils';
import type { Income } from '../types';

interface IncomeListProps {
  incomes: Income[];
  onEdit?: (income: Income) => void;
  onDelete?: (id: string) => void;
}

export function IncomeList({ incomes, onEdit, onDelete }: IncomeListProps) {
  if (incomes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No income entries yet.</p>
        <p className="text-sm mt-2">Add your first income entry to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {incomes.map((income) => (
        <div
          key={income.id}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">{income.source}</h3>
                <span className="text-lg font-bold text-primary-600">
                  {formatCurrency(income.amount)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {format(new Date(income.date), 'MMM dd, yyyy')}
              </p>
              {income.notes && (
                <p className="text-sm text-gray-500 mt-1">{income.notes}</p>
              )}
            </div>
            {(onEdit || onDelete) && (
              <div className="flex gap-2 ml-4">
                {onEdit && (
                  <button
                    onClick={() => onEdit(income)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(income.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

