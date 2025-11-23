/**
 * Envelope List Component
 */

import { formatCurrency } from '@/core/utils';
import type { Envelope } from '../types';

interface EnvelopeListProps {
  envelopes: Envelope[];
  onAllocate?: (envelopeId: string) => void;
  onDelete?: (id: string) => void;
}

export function EnvelopeList({ envelopes, onAllocate, onDelete }: EnvelopeListProps) {
  if (envelopes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No envelopes yet.</p>
        <p className="text-sm mt-2">Create envelopes to allocate your income.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {envelopes.map((envelope) => (
        <div
          key={envelope.id}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{envelope.name}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Allocated:</span>
                  <span className="font-medium">{formatCurrency(envelope.allocatedAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent:</span>
                  <span className="font-medium text-red-600">{formatCurrency(envelope.spentAmount)}</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Balance:</span>
                  <span className={`font-bold ${envelope.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(envelope.balance)}
                  </span>
                </div>
              </div>
            </div>
            {(onAllocate || onDelete) && (
              <div className="flex gap-2 ml-4">
                {onAllocate && (
                  <button
                    onClick={() => onAllocate(envelope.id)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Allocate
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(envelope.id)}
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

