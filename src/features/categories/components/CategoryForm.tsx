/**
 * Category Form Component
 * Form for creating/editing categories
 */

import { useState } from 'react';
import type { Category } from '@/core/types';

interface CategoryFormProps {
  onSubmit: (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<Category>;
  submitLabel?: string;
}

// Predefined color options (solid colors only, no gradients)
const COLOR_OPTIONS = [
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Lime', value: '#84CC16' },
  { name: 'Green', value: '#10B981' },
  { name: 'Emerald', value: '#14B8A6' },
  { name: 'Teal', value: '#06B6D4' },
  { name: 'Cyan', value: '#0891B2' },
  { name: 'Sky', value: '#0EA5E9' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Fuchsia', value: '#D946EF' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Gray', value: '#64748B' },
  { name: 'Slate', value: '#475569' },
];

// Common icon options
const ICON_OPTIONS = [
  '🍔', '🍕', '☕', '🍎', '🥗', '🍰',
  '🚗', '🚕', '🚲', '✈️', '🚇', '⛽',
  '🏠', '🏢', '🏡', '🏘️', '🏰', '🏛️',
  '💡', '🔌', '💧', '🔥', '❄️', '🌡️',
  '🛍️', '👕', '👔', '👗', '👠', '👜',
  '🎬', '🎮', '🎵', '🎨', '📺', '🎪',
  '🏥', '💊', '🩺', '🏃', '🧘', '💪',
  '📚', '✏️', '📝', '🎓', '📖', '📊',
  '💅', '💇', '🧴', '🪒', '🧼', '🧴',
  '📄', '💳', '📧', '📱', '💻', '⌚',
  '💰', '💵', '💴', '💶', '💷', '💸',
  '📦', '📮', '📬', '📭', '📪', '📫',
];

export function CategoryForm({ onSubmit, onCancel, initialData, submitLabel = 'Create Category' }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    color: initialData?.color || COLOR_OPTIONS[0].value,
    icon: initialData?.icon || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        name: formData.name.trim(),
        color: formData.color,
        icon: formData.icon || undefined,
      });
      // Reset form
      setFormData({
        name: '',
        color: COLOR_OPTIONS[0].value,
        icon: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
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
          Category Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="e.g., Groceries, Gas, Rent"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <div className="grid grid-cols-6 gap-2">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData({ ...formData, color: color.value })}
              className={`h-10 w-full rounded border-2 ${
                formData.color === color.value
                  ? 'border-gray-900 ring-2 ring-primary-500'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
        <input
          type="text"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          placeholder="#000000"
        />
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
          Icon (optional)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Pick an emoji"
            maxLength={2}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-2xl text-center"
          />
        </div>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded border border-gray-200">
          {ICON_OPTIONS.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => setFormData({ ...formData, icon })}
              className={`text-2xl p-1 rounded hover:bg-gray-200 ${
                formData.icon === icon ? 'bg-primary-100 ring-2 ring-primary-500' : ''
              }`}
            >
              {icon}
            </button>
          ))}
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

