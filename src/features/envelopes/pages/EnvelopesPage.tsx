/**
 * Envelopes Page
 * Full page for managing envelopes
 */

import { useState } from 'react';
import { useEnvelopes } from '../hooks/useEnvelopes';
import { EnvelopeForm, EnvelopeList } from '../components';
import type { Envelope } from '../types';

export function EnvelopesPage() {
  const { envelopes, createEnvelope, updateEnvelope, deleteEnvelope, loading } = useEnvelopes();
  const [editingEnvelope, setEditingEnvelope] = useState<Envelope | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Omit<Envelope, 'id' | 'createdAt' | 'updatedAt' | 'balance'>) => {
    if (editingEnvelope) {
      await updateEnvelope(editingEnvelope.id, data);
      setEditingEnvelope(null);
    } else {
      await createEnvelope(data);
    }
    setShowForm(false);
  };

  const handleEdit = (envelope: Envelope) => {
    setEditingEnvelope(envelope);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this envelope? This will not affect your expenses.')) {
      await deleteEnvelope(id);
    }
  };

  const handleCancel = () => {
    setEditingEnvelope(null);
    setShowForm(false);
  };

  const totalAllocated = envelopes.reduce((sum, env) => sum + env.allocatedAmount, 0);
  const totalSpent = envelopes.reduce((sum, env) => sum + env.spentAmount, 0);
  const totalBalance = envelopes.reduce((sum, env) => sum + env.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Envelopes</h1>
          <p className="text-gray-600 mt-1">Allocate your income to different spending categories</p>
        </div>
        <button
          onClick={() => {
            setEditingEnvelope(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          {showForm ? 'Cancel' : 'Create Envelope'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Allocated</p>
          <p className="text-2xl font-bold text-primary-600 mt-2">
            ${totalAllocated.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Balance</p>
          <p className={`text-2xl font-bold mt-2 ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingEnvelope ? 'Edit Envelope' : 'Create New Envelope'}
          </h2>
          <EnvelopeForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingEnvelope || undefined}
            submitLabel={editingEnvelope ? 'Update Envelope' : 'Create Envelope'}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Envelopes</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading envelopes...</div>
        ) : (
          <EnvelopeList
            envelopes={envelopes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

