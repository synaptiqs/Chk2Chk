/**
 * Debt Account Form Component
 * Form for creating/editing debt account entries
 */

import { useState } from 'react';
import type { DebtAccount } from '../types';

interface DebtAccountFormProps {
  onSubmit: (data: Omit<DebtAccount, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<DebtAccount>;
  submitLabel?: string;
}

export function DebtAccountForm({ onSubmit, onCancel, initialData, submitLabel = 'Add Debt Account' }: DebtAccountFormProps) {
  const [formData, setFormData] = useState<Omit<DebtAccount, 'id' | 'createdAt' | 'updatedAt'>>({
    name: initialData?.name || '',
    type: initialData?.type || 'credit_card',
    balance: initialData?.balance || 0,
    minimumPayment: initialData?.minimumPayment || 0,
    interestRate: initialData?.interestRate,
    dueDate: initialData?.dueDate || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        name: '',
        type: 'credit_card',
        balance: 0,
        minimumPayment: 0,
        interestRate: undefined,
        dueDate: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save debt account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Account Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="e.g., Chase Credit Card, Car Loan"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Debt Type *
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as 'credit_card' | 'loan' | 'other' })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="credit_card">Credit Card</option>
          <option value="loan">Loan</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">
            Current Balance *
          </label>
          <input
            type="number"
            id="balance"
            step="0.01"
            min="0"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="minimumPayment" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Payment *
          </label>
          <input
            type="number"
            id="minimumPayment"
            step="0.01"
            min="0"
            value={formData.minimumPayment}
            onChange={(e) => setFormData({ ...formData, minimumPayment: parseFloat(e.target.value) || 0 })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            step="0.01"
            min="0"
            max="100"
            value={formData.interestRate || ''}
            onChange={(e) => setFormData({ ...formData, interestRate: e.target.value ? parseFloat(e.target.value) : undefined })}
            placeholder="e.g., 18.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date (Day of Month)
          </label>
          <input
            type="number"
            id="dueDate"
            min="1"
            max="31"
            value={formData.dueDate || ''}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value || undefined })}
            placeholder="e.g., 15"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

