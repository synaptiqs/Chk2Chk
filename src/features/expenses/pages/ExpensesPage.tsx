/**
 * Expenses Management Page
 */

import { useState } from 'react';
import { FeatureErrorBoundary } from '@/app/error-boundaries';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { Card } from '@/ui/components/cards/Card';

export function ExpensesPage() {
  const { expenses, createExpense, updateExpense, deleteExpense, loading } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<typeof expenses[0] | null>(null);

  const handleSubmit = async (data: Parameters<typeof createExpense>[0]) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, data);
      setEditingExpense(null);
    } else {
      await createExpense(data);
    }
    setShowForm(false);
  };

  const handleEdit = (expense: typeof expenses[0]) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  return (
    <FeatureErrorBoundary moduleName="Expenses">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Expenses</h2>
          <p className="text-gray-600 mt-2">Track and manage your expenses</p>
        </div>

        {!showForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Add Expense
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading expenses...</div>
            ) : (
              <ExpenseList
                expenses={expenses}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showCategory={true}
              />
            )}
          </div>
        ) : (
          <Card title={editingExpense ? 'Edit Expense' : 'Add Expense'}>
            <ExpenseForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingExpense || undefined}
              submitLabel={editingExpense ? 'Update Expense' : 'Add Expense'}
            />
          </Card>
        )}
      </div>
    </FeatureErrorBoundary>
  );
}

