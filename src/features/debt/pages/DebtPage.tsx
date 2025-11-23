/**
 * Debt Page
 * Full page for managing debt accounts with savings limit warnings
 */

import { useState, useEffect } from 'react';
import { useDebt } from '../hooks/useDebt';
import { debtService } from '../services/debtService';
import { DebtAccountForm, DebtAccountList } from '../components';
import { MAX_SAVINGS_WITH_DEBT } from '@/core/constants';
import { formatCurrency } from '@/core/utils';
import type { DebtAccount } from '../types';

export function DebtPage() {
  const { debts, createDebt, updateDebt, deleteDebt, loading } = useDebt();
  const [editingDebt, setEditingDebt] = useState<DebtAccount | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [hasDebt, setHasDebt] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    const checkDebtStatus = async () => {
      const hasDebtStatus = await debtService.hasDebt();
      const total = await debtService.getTotalDebt();
      setHasDebt(hasDebtStatus);
      setTotalDebt(total);
    };
    checkDebtStatus();
  }, [debts]);

  const handleSubmit = async (data: Omit<DebtAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingDebt) {
      await updateDebt(editingDebt.id, data);
      setEditingDebt(null);
    } else {
      await createDebt(data);
    }
    setShowForm(false);
    // Refresh debt status
    const hasDebtStatus = await debtService.hasDebt();
    const total = await debtService.getTotalDebt();
    setHasDebt(hasDebtStatus);
    setTotalDebt(total);
  };

  const handleEdit = (debt: DebtAccount) => {
    setEditingDebt(debt);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this debt account?')) {
      await deleteDebt(id);
      // Refresh debt status
      const hasDebtStatus = await debtService.hasDebt();
      const total = await debtService.getTotalDebt();
      setHasDebt(hasDebtStatus);
      setTotalDebt(total);
    }
  };

  const handleCancel = () => {
    setEditingDebt(null);
    setShowForm(false);
  };

  const totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Debt Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your debt accounts</p>
        </div>
        <button
          onClick={() => {
            setEditingDebt(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          {showForm ? 'Cancel' : 'Add Debt Account'}
        </button>
      </div>

      {/* Savings Limit Warning */}
      {hasDebt && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Savings Limit Active
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You have active debt accounts. Your savings should not exceed{' '}
                  <strong>{formatCurrency(MAX_SAVINGS_WITH_DEBT)}</strong>.
                </p>
                <p className="mt-1">
                  Total debt: <strong>{formatCurrency(totalDebt)}</strong> | 
                  Minimum payments: <strong>{formatCurrency(totalMinimumPayments)}</strong>
                </p>
                <p className="mt-2 font-medium">
                  💡 Consider putting extra money toward debt payments instead of savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingDebt ? 'Edit Debt Account' : 'Add New Debt Account'}
          </h2>
          <DebtAccountForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingDebt || undefined}
            submitLabel={editingDebt ? 'Update Debt Account' : 'Add Debt Account'}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Debt Accounts</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading debt accounts...</div>
        ) : (
          <DebtAccountList
            debts={debts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

