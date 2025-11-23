/**
 * Storage Repository Interface
 * Abstract interface for data storage - allows swapping implementations
 */

import type { Income, Expense, Envelope, Bill, DebtAccount, RecurringTransaction, Category, UserSettings } from '@/core/types';

/**
 * Complete user data package for migration
 */
export interface CompleteUserData {
  version: string;
  exportedAt: string;
  user: {
    settings: UserSettings;
  };
  income: Income[];
  expenses: Expense[];
  envelopes: Envelope[];
  bills: Bill[];
  debts: DebtAccount[];
  recurringTransactions: RecurringTransaction[];
  categories: Category[];
  metadata: {
    totalRecords: number;
    dateRange: { start: string; end: string };
    checksum: string;
  };
}

/**
 * Storage repository interface
 * Implementations: IndexedDBRepository (MVP), PostgreSQLRepository (Future)
 */
export interface IStorageRepository {
  // Income operations
  createIncome(data: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>): Promise<Income>;
  getAllIncomes(): Promise<Income[]>;
  getIncomeById(id: string): Promise<Income | null>;
  updateIncome(id: string, data: Partial<Income>): Promise<Income>;
  deleteIncome(id: string): Promise<void>;

  // Expense operations
  createExpense(data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense>;
  getAllExpenses(): Promise<Expense[]>;
  getExpenseById(id: string): Promise<Expense | null>;
  updateExpense(id: string, data: Partial<Expense>): Promise<Expense>;
  deleteExpense(id: string): Promise<void>;

  // Envelope operations
  createEnvelope(data: Omit<Envelope, 'id' | 'createdAt' | 'updatedAt'>): Promise<Envelope>;
  getAllEnvelopes(): Promise<Envelope[]>;
  getEnvelopeById(id: string): Promise<Envelope | null>;
  updateEnvelope(id: string, data: Partial<Envelope>): Promise<Envelope>;
  deleteEnvelope(id: string): Promise<void>;

  // Bill operations
  createBill(data: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill>;
  getAllBills(): Promise<Bill[]>;
  getBillById(id: string): Promise<Bill | null>;
  updateBill(id: string, data: Partial<Bill>): Promise<Bill>;
  deleteBill(id: string): Promise<void>;

  // Debt operations
  createDebt(data: Omit<DebtAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<DebtAccount>;
  getAllDebts(): Promise<DebtAccount[]>;
  getDebtById(id: string): Promise<DebtAccount | null>;
  updateDebt(id: string, data: Partial<DebtAccount>): Promise<DebtAccount>;
  deleteDebt(id: string): Promise<void>;

  // Category operations
  createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  updateCategory(id: string, data: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;

  // Settings operations
  getSettings(): Promise<UserSettings | null>;
  updateSettings(data: Partial<UserSettings>): Promise<UserSettings>;

  // Migration support
  exportAllData(): Promise<CompleteUserData>;
  importAllData(data: CompleteUserData): Promise<void>;
  validateDataIntegrity(): Promise<{ valid: boolean; errors: string[] }>;
}

