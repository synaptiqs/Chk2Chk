/**
 * Expense List Component
 * Displays list of expense entries
 */

import { format } from 'date-fns';
import { formatCurrency } from '@/core/utils';
import { dataRepository } from '@/data/services';
import type { Expense } from '../types';
import type { Category } from '@/core/types';
import { useState, useEffect } from 'react';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
  showCategory?: boolean;
}

export function ExpenseList({ expenses, onEdit, onDelete, showCategory = true }: ExpenseListProps) {
  const [categories, setCategories] = useState<Map<string, Category>>(new Map());

  useEffect(() => {
    dataRepository.getAllCategories().then(cats => {
      const categoryMap = new Map(cats.map(cat => [cat.id, cat]));
      setCategories(categoryMap);
    });
  }, []);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No expenses yet.</p>
        <p className="text-sm mt-2">Add your first expense to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => {
        const category = categories.get(expense.categoryId);
        return (
          <div
            key={expense.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {showCategory && category && (
                  <div className="flex items-center gap-2 mb-2">
                    {category.icon && <span className="text-lg">{category.icon}</span>}
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-600">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </p>
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
                {expense.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {expense.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {expense.notes && (
                  <p className="text-sm text-gray-500 mt-1">{expense.notes}</p>
                )}
              </div>
              {(onEdit || onDelete) && (
                <div className="flex gap-2 ml-4">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

