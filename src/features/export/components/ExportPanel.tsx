/**
 * Export Panel Component
 */

import { useState } from 'react';
import { exportService } from '../services/exportService';
import { Button } from '@/ui/components/buttons/Button';
import { Card } from '@/ui/components/cards/Card';

export function ExportPanel() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (type: 'income' | 'expenses' | 'all', format: 'csv' | 'pdf') => {
    setLoading(`${type}-${format}`);
    setError(null);

    try {
      if (format === 'csv') {
        await exportService.downloadCSV(type);
      } else {
        await exportService.downloadPDF(type);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card title="Export Data">
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Export Income</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => handleExport('income', 'csv')}
              disabled={loading === 'income-csv'}
              size="sm"
            >
              {loading === 'income-csv' ? 'Exporting...' : 'CSV'}
            </Button>
            <Button
              onClick={() => handleExport('income', 'pdf')}
              disabled={loading === 'income-pdf'}
              size="sm"
              variant="secondary"
            >
              {loading === 'income-pdf' ? 'Exporting...' : 'PDF'}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Export Expenses</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => handleExport('expenses', 'csv')}
              disabled={loading === 'expenses-csv'}
              size="sm"
            >
              {loading === 'expenses-csv' ? 'Exporting...' : 'CSV'}
            </Button>
            <Button
              onClick={() => handleExport('expenses', 'pdf')}
              disabled={loading === 'expenses-pdf'}
              size="sm"
              variant="secondary"
            >
              {loading === 'expenses-pdf' ? 'Exporting...' : 'PDF'}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Export All Data</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => handleExport('all', 'csv')}
              disabled={loading === 'all-csv'}
              size="sm"
            >
              {loading === 'all-csv' ? 'Exporting...' : 'CSV'}
            </Button>
            <Button
              onClick={() => handleExport('all', 'pdf')}
              disabled={loading === 'all-pdf'}
              size="sm"
              variant="secondary"
            >
              {loading === 'all-pdf' ? 'Exporting...' : 'PDF'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

