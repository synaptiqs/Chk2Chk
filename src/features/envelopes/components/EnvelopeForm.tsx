/**
 * Envelope Form Component
 */

import { useState } from 'react';
import type { Envelope } from '../types';

interface EnvelopeFormProps {
  onSubmit: (data: Omit<Envelope, 'id' | 'createdAt' | 'updatedAt' | 'balance'>) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<Envelope>;
  submitLabel?: string;
}

export function EnvelopeForm({ onSubmit, onCancel, initialData, submitLabel = 'Create Envelope' }: EnvelopeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    allocatedAmount: initialData?.allocatedAmount || 0,
    spentAmount: initialData?.spentAmount || 0,
    categoryId: initialData?.categoryId || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        allocatedAmount: 0,
        spentAmount: 0,
        categoryId: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save envelope');
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
          Envelope Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="e.g., Groceries, Rent, Savings"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="allocatedAmount" className="block text-sm font-medium text-gray-700 mb-1">
          Initial Allocation
        </label>
        <input
          type="number"
          id="allocatedAmount"
          step="0.01"
          min="0"
          value={formData.allocatedAmount}
          onChange={(e) => setFormData({ ...formData, allocatedAmount: parseFloat(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
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

