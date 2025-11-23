/**
 * Bills Page
 * Full page for managing bills
 */

import { useState } from 'react';
import { useBills } from '../hooks/useBills';
import { billService } from '../services/billService';
import { BillForm, BillList } from '../components';
import type { Bill } from '../types';

export function BillsPage() {
  const { bills, createBill, updateBill, deleteBill, refresh, loading } = useBills();
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingBill) {
      await updateBill(editingBill.id, data);
      setEditingBill(null);
    } else {
      await createBill(data);
    }
    setShowForm(false);
  };

  const handleEdit = (bill: Bill) => {
    setEditingBill(bill);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      await deleteBill(id);
    }
  };

  const handleMarkPaid = async (id: string) => {
    await billService.markBillAsPaid(id);
    // Refresh bills list
    await refresh();
  };

  const handleCancel = () => {
    setEditingBill(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bills</h1>
          <p className="text-gray-600 mt-1">Manage your recurring bills and payments</p>
        </div>
        <button
          onClick={() => {
            setEditingBill(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          {showForm ? 'Cancel' : 'Add Bill'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingBill ? 'Edit Bill' : 'Add New Bill'}
          </h2>
          <BillForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingBill || undefined}
            submitLabel={editingBill ? 'Update Bill' : 'Add Bill'}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Bills</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading bills...</div>
        ) : (
          <BillList
            bills={bills}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMarkPaid={handleMarkPaid}
          />
        )}
      </div>
    </div>
  );
}

