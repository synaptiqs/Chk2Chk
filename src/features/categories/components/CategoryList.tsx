/**
 * Category List Component
 * Displays list of categories
 */

import type { Category } from '@/core/types';

interface CategoryListProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (id: string) => void;
}

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No categories yet.</p>
        <p className="text-sm mt-2">Create categories to organize your expenses.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            {category.icon && (
              <span className="text-2xl">{category.icon}</span>
            )}
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </div>
            {(onEdit || onDelete) && (
              <div className="flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(category)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(category.id)}
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

