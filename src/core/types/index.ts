/**
 * Core TypeScript types and interfaces
 * Shared across the entire application
 */

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Data model types (to be imported by repository interface)
export interface Income {
  id: string;
  date: string;
  amount: number;
  source: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  categoryId: string;
  description: string;
  tags: string[];
  notes?: string;
  recurringTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bucket {
  id: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  balance: number;
  categoryId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  frequency: 'monthly' | 'weekly' | 'yearly';
  categoryId: string;
  isPaid: boolean;
  lastPaidDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DebtAccount {
  id: string;
  name: string;
  type: 'credit_card' | 'loan' | 'other';
  balance: number;
  minimumPayment: number;
  interestRate?: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecurringTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  categoryId?: string;
  nextDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string; // Hex color (solid colors only)
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings extends BaseEntity {
  currency: string; // 'USD', 'EUR', etc.
  payFrequency: 'daily' | 'weekly' | 'biweekly';
  savingsLimit: number; // Default 1000, enforced if debt exists
  debtReminders: boolean;
  theme: 'light' | 'dark';
}

// Common utility types
export type ID = string;
export type Timestamp = string; // ISO date string
