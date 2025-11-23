/**
 * Income Page
 * Full page for managing income entries
 */

import { useState } from 'react';
import { useIncome } from '../hooks/useIncome';
import { IncomeForm, IncomeList } from '../components';
import type { Income } from '../types';

export function IncomePage() {
  const { incomes, createIncome, updateIncome, deleteIncome, loading } = useIncome();
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Parameters<typeof createIncome>[0]) => {
    if (editingIncome) {
      await updateIncome(editingIncome.id, data);
      setEditingIncome(null);
    } else {
      await createIncome(data);
    }
    setShowForm(false);
  };

  const handleEdit = (income: Income) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteIncome(id);
  };

  const handleCancel = () => {
    setEditingIncome(null);
    setShowForm(false);
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Income</h1>
          <p className="text-gray-600 mt-1">Track your income entries</p>
        </div>
        <button
          onClick={() => {
            setEditingIncome(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          {showForm ? 'Cancel' : 'Add Income'}
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <p className="text-3xl font-bold text-primary-600 mt-2">
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Entries</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {incomes.length}
            </p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingIncome ? 'Edit Income Entry' : 'Add New Income Entry'}
          </h2>
          <IncomeForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingIncome || undefined}
            submitLabel={editingIncome ? 'Update Income' : 'Add Income'}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Income Entries</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading income entries...</div>
        ) : (
          <IncomeList
            incomes={incomes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

