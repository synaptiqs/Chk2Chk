/**
 * Settings Page
 * Full page for managing user settings, data export/import, and app preferences
 */

import { useState, useEffect } from 'react';
import { dataRepository } from '@/data/services';
import { exportService } from '@/features/export/services/exportService';
import type { UserSettings } from '@/core/types';
import { formatCurrency } from '@/core/utils';

export function SettingsPage() {
  const [, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UserSettings>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const currentSettings = await dataRepository.getSettings();
      if (currentSettings) {
        setSettings(currentSettings);
        setFormData({
          currency: currentSettings.currency,
          payFrequency: currentSettings.payFrequency,
          savingsLimit: currentSettings.savingsLimit,
          debtReminders: currentSettings.debtReminders,
          theme: currentSettings.theme,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      const updated = await dataRepository.updateSettings(formData);
      setSettings(updated);
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    try {
      setError(null);
      await exportService.exportToJSON();
      setSuccess('Data exported successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export data');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      const text = await file.text();
      const data = JSON.parse(text);
      await exportService.importFromJSON(data);
      setSuccess('Data imported successfully!');
      await loadSettings(); // Reload settings after import
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import data');
    } finally {
      // Reset file input
      event.target.value = '';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading settings...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your preferences and data</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {/* User Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">User Preferences</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              id="currency"
              value={formData.currency || 'USD'}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
            </select>
          </div>

          <div>
            <label htmlFor="payFrequency" className="block text-sm font-medium text-gray-700 mb-1">
              Pay Frequency
            </label>
            <select
              id="payFrequency"
              value={formData.payFrequency || 'weekly'}
              onChange={(e) => setFormData({ ...formData, payFrequency: e.target.value as 'daily' | 'weekly' | 'biweekly' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
            </select>
          </div>

          <div>
            <label htmlFor="savingsLimit" className="block text-sm font-medium text-gray-700 mb-1">
              Savings Limit
            </label>
            <input
              type="number"
              id="savingsLimit"
              step="100"
              min="0"
              value={formData.savingsLimit || 1000}
              onChange={(e) => setFormData({ ...formData, savingsLimit: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum savings allowed. If you have debt, this is automatically capped at {formatCurrency(1000)}.
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="debtReminders"
              checked={formData.debtReminders ?? true}
              onChange={(e) => setFormData({ ...formData, debtReminders: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="debtReminders" className="ml-2 block text-sm text-gray-700">
              Enable debt payment reminders
            </label>
          </div>

          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              id="theme"
              value={formData.theme || 'light'}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value as 'light' | 'dark' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark (Coming Soon)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Export Data</h3>
            <p className="text-sm text-gray-600 mb-3">
              Download all your data as a JSON file. This includes income, expenses, bills, debt, categories, and settings.
            </p>
            <button
              onClick={handleExport}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Export Data
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Import Data</h3>
            <p className="text-sm text-gray-600 mb-3">
              Import previously exported data. This will replace all existing data.
            </p>
            <label className="block">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              ⚠️ Warning: Importing will replace all your current data. Make sure to export first if you want to keep a backup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

