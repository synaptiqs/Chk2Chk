/**
 * Bucket List Component
 */

import { formatCurrency } from '@/core/utils';
import type { Bucket } from '../types';

interface BucketListProps {
  buckets: Bucket[];
  onEdit?: (bucket: Bucket) => void;
  onAllocate?: (bucketId: string) => void;
  onDelete?: (id: string) => void;
}

export function BucketList({ buckets, onEdit, onAllocate, onDelete }: BucketListProps) {
  if (buckets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No buckets yet.</p>
        <p className="text-sm mt-2">Create buckets to allocate your income.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {buckets.map((bucket) => (
        <div
          key={bucket.id}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{bucket.name}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Allocated:</span>
                  <span className="font-medium">{formatCurrency(bucket.allocatedAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent:</span>
                  <span className="font-medium text-red-600">{formatCurrency(bucket.spentAmount)}</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Balance:</span>
                  <span className={`font-bold ${bucket.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(bucket.balance)}
                  </span>
                </div>
              </div>
            </div>
            {(onEdit || onAllocate || onDelete) && (
              <div className="flex gap-2 ml-4">
                {onEdit && (
                  <button
                    onClick={() => onEdit(bucket)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
                {onAllocate && (
                  <button
                    onClick={() => onAllocate(bucket.id)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Allocate
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(bucket.id)}
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
