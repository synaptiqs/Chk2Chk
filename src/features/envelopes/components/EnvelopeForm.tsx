/**
 * Envelope Form Component
 */

import { useState, useEffect } from 'react';
import { dataRepository } from '@/data/services';
import type { Envelope } from '../types';
import type { Category } from '@/core/types';

interface EnvelopeFormProps {
  onSubmit: (data: Omit<Envelope, 'id' | 'createdAt' | 'updatedAt' | 'balance'>) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<Envelope>;
  submitLabel?: string;
}

export function EnvelopeForm({ onSubmit, onCancel, initialData, submitLabel = 'Create Envelope' }: EnvelopeFormProps) {
  const [formData, setFormData] = useState<{
    name: string;
    allocatedAmount: number;
    spentAmount: number;
    categoryId: string;
  }>({
    name: initialData?.name || '',
    allocatedAmount: initialData?.allocatedAmount || 0,
    spentAmount: initialData?.spentAmount || 0,
    categoryId: initialData?.categoryId || '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dataRepository.getAllCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        name: formData.name,
        allocatedAmount: formData.allocatedAmount,
        spentAmount: formData.spentAmount,
        categoryId: formData.categoryId || undefined,
      });
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Envelope Name *
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
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
          Category (Optional)
        </label>
        <select
          id="categoryId"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">No category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="allocatedAmount" className="block text-sm font-medium text-gray-700 mb-1">
          Initial Allocation *
        </label>
        <input
          type="number"
          id="allocatedAmount"
          step="0.01"
          min="0"
          value={formData.allocatedAmount}
          onChange={(e) => setFormData({ ...formData, allocatedAmount: parseFloat(e.target.value) || 0 })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <p className="text-xs text-gray-500 mt-1">Amount to initially allocate to this envelope</p>
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

