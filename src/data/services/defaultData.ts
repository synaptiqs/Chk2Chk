/**
 * Default Data Service
 * Provides default categories, settings, and initial data
 */

import type { Category, UserSettings } from '@/core/types';
import { dataRepository } from './DataRepository';

/**
 * Default expense categories
 */
export const DEFAULT_CATEGORIES: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>[] = [
  { name: 'Food & Dining', color: '#EF4444', icon: '🍔' },
  { name: 'Transportation', color: '#3B82F6', icon: '🚗' },
  { name: 'Housing', color: '#10B981', icon: '🏠' },
  { name: 'Utilities', color: '#F59E0B', icon: '💡' },
  { name: 'Shopping', color: '#8B5CF6', icon: '🛍️' },
  { name: 'Entertainment', color: '#EC4899', icon: '🎬' },
  { name: 'Healthcare', color: '#06B6D4', icon: '🏥' },
  { name: 'Education', color: '#6366F1', icon: '📚' },
  { name: 'Personal Care', color: '#F97316', icon: '💅' },
  { name: 'Bills & Fees', color: '#84CC16', icon: '📄' },
  { name: 'Savings', color: '#14B8A6', icon: '💰' },
  { name: 'Other', color: '#64748B', icon: '📦' },
];

/**
 * Default user settings
 */
export const DEFAULT_SETTINGS: Omit<UserSettings, 'id' | 'createdAt' | 'updatedAt'> = {
  currency: 'USD',
  payFrequency: 'weekly',
  savingsLimit: 1000,
  debtReminders: true,
  theme: 'light',
};

/**
 * Initialize default data
 * Creates default categories and settings if they don't exist
 */
export async function initializeDefaultData(): Promise<void> {
  try {
    // Check if categories already exist
    const existingCategories = await dataRepository.getAllCategories();
    
    // Only create defaults if no categories exist
    if (existingCategories.length === 0) {
      console.log('Initializing default categories...');
      for (const category of DEFAULT_CATEGORIES) {
        await dataRepository.createCategory(category);
      }
    }

    // Check if settings exist
    const existingSettings = await dataRepository.getSettings();
    
    // Only create defaults if no settings exist
    if (!existingSettings) {
      console.log('Initializing default settings...');
      await dataRepository.updateSettings(DEFAULT_SETTINGS);
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
    // Don't throw - allow app to continue even if defaults fail
  }
}

