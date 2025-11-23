/**
 * Categories Management Page
 */

import { useState } from 'react';
import { FeatureErrorBoundary } from '@/app/error-boundaries';
import { useCategories } from '../hooks/useCategories';
import { CategoryForm } from '../components/CategoryForm';
import { CategoryList } from '../components/CategoryList';
import { Card } from '@/ui/components/cards/Card';

export function CategoriesPage() {
  const { categories, createCategory, updateCategory, deleteCategory, loading } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof categories[0] | null>(null);

  const handleSubmit = async (data: Parameters<typeof createCategory>[0]) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, data);
      setEditingCategory(null);
    } else {
      await createCategory(data);
    }
    setShowForm(false);
  };

  const handleEdit = (category: typeof categories[0]) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <FeatureErrorBoundary moduleName="Categories">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
          <p className="text-gray-600 mt-2">Manage your expense categories</p>
        </div>

        {!showForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Add Category
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading categories...</div>
            ) : (
              <CategoryList
                categories={categories}
                onEdit={handleEdit}
                onDelete={deleteCategory}
              />
            )}
          </div>
        ) : (
          <Card title={editingCategory ? 'Edit Category' : 'Create Category'}>
            <CategoryForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingCategory || undefined}
              submitLabel={editingCategory ? 'Update Category' : 'Create Category'}
            />
          </Card>
        )}
      </div>
    </FeatureErrorBoundary>
  );
}

