/**
 * Bill List Component
 * Displays list of bill entries
 */

import { formatCurrency } from '@/core/utils';
import type { Bill } from '../types';
import type { Category } from '@/core/types';
import { useState, useEffect } from 'react';
import { dataRepository } from '@/data/services';

interface BillListProps {
  bills: Bill[];
  onEdit?: (bill: Bill) => void;
  onDelete?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
}

export function BillList({ bills, onEdit, onDelete, onMarkPaid }: BillListProps) {
  const [categories, setCategories] = useState<Map<string, Category>>(new Map());

  useEffect(() => {
    dataRepository.getAllCategories().then(cats => {
      const categoryMap = new Map(cats.map(cat => [cat.id, cat]));
      setCategories(categoryMap);
    });
  }, []);

  if (bills.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No bills yet.</p>
        <p className="text-sm mt-2">Add your first bill to get started.</p>
      </div>
    );
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return 'Monthly';
      case 'weekly': return 'Weekly';
      case 'yearly': return 'Yearly';
      default: return frequency;
    }
  };

  return (
    <div className="space-y-2">
      {bills.map((bill) => {
        const category = categories.get(bill.categoryId);
        return (
          <div
            key={bill.id}
            className={`bg-white p-4 rounded-lg border ${
              bill.isPaid 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 hover:shadow-md'
            } transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{bill.name}</h3>
                  {bill.isPaid && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">
                      Paid
                    </span>
                  )}
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(bill.amount)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {category && (
                    <div className="flex items-center gap-1">
                      {category.icon && <span>{category.icon}</span>}
                      <span>{category.name}</span>
                    </div>
                  )}
                  <span>Due: Day {bill.dueDate}</span>
                  <span>{getFrequencyLabel(bill.frequency)}</span>
                </div>
                {bill.lastPaidDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Last paid: {new Date(bill.lastPaidDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                {onMarkPaid && !bill.isPaid && (
                  <button
                    onClick={() => onMarkPaid(bill.id)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Mark Paid
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(bill)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(bill.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

