/**
 * Buckets Page
 * Full page for managing buckets
 */

import { useState } from 'react';
import { useBuckets } from '../hooks/useBuckets';
import { BucketForm, BucketList } from '../components';
import type { Bucket } from '../types';

export function BucketsPage() {
  const { buckets, createBucket, updateBucket, deleteBucket, loading } = useBuckets();
  const [editingBucket, setEditingBucket] = useState<Bucket | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Omit<Bucket, 'id' | 'createdAt' | 'updatedAt' | 'balance'>) => {
    if (editingBucket) {
      await updateBucket(editingBucket.id, data);
      setEditingBucket(null);
    } else {
      await createBucket(data);
    }
    setShowForm(false);
  };

  const handleEdit = (bucket: Bucket) => {
    setEditingBucket(bucket);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this bucket? This will not affect your expenses.')) {
      await deleteBucket(id);
    }
  };

  const handleCancel = () => {
    setEditingBucket(null);
    setShowForm(false);
  };

  const totalAllocated = buckets.reduce((sum, bucket) => sum + bucket.allocatedAmount, 0);
  const totalSpent = buckets.reduce((sum, bucket) => sum + bucket.spentAmount, 0);
  const totalBalance = buckets.reduce((sum, bucket) => sum + bucket.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buckets</h1>
          <p className="text-gray-600 mt-1">Allocate your income to different spending categories</p>
        </div>
        <button
          onClick={() => {
            setEditingBucket(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          {showForm ? 'Cancel' : 'Create Bucket'}
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
            {editingBucket ? 'Edit Bucket' : 'Create New Bucket'}
          </h2>
          <BucketForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingBucket || undefined}
            submitLabel={editingBucket ? 'Update Bucket' : 'Create Bucket'}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Buckets</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading buckets...</div>
        ) : (
          <BucketList
            buckets={buckets}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
