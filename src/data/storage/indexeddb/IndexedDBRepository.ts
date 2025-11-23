/**
 * IndexedDB Storage Implementation
 * Complete implementation of the storage repository interface
 */

import type { IStorageRepository, CompleteUserData } from '../repository';
import type { Income, Expense, Envelope, Bill, DebtAccount, Category, UserSettings, RecurringTransaction } from '@/core/types';
import { STORAGE_DB_NAME, STORAGE_DB_VERSION } from '@/core/constants';
import { getCurrentTimestamp, generateId } from '@/core/utils';

const DB_NAME = STORAGE_DB_NAME;
const DB_VERSION = STORAGE_DB_VERSION;

// Store names
const STORES = {
  INCOME: 'income',
  EXPENSES: 'expenses',
  ENVELOPES: 'envelopes',
  BILLS: 'bills',
  DEBTS: 'debts',
  CATEGORIES: 'categories',
  RECURRING: 'recurring',
  SETTINGS: 'settings',
} as const;

export class IndexedDBRepository implements IStorageRepository {
  private db: IDBDatabase | null = null;

  /**
   * Initialize database connection
   */
  private async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains(STORES.INCOME)) {
          db.createObjectStore(STORES.INCOME, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.EXPENSES)) {
          db.createObjectStore(STORES.EXPENSES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.ENVELOPES)) {
          db.createObjectStore(STORES.ENVELOPES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.BILLS)) {
          db.createObjectStore(STORES.BILLS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.DEBTS)) {
          db.createObjectStore(STORES.DEBTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.CATEGORIES)) {
          db.createObjectStore(STORES.CATEGORIES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.RECURRING)) {
          db.createObjectStore(STORES.RECURRING, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: 'id' });
        }
      };
    });
  }

  /**
   * Generic CRUD operations
   */
  private async create<T extends { id: string }>(storeName: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const db = await this.initDB();
    const now = getCurrentTimestamp();
    const entity = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    } as unknown as T;

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(entity);

      request.onsuccess = () => resolve(entity);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Direct insert with preserved IDs and timestamps (for import)
   */
  private async insertWithOriginalData<T extends { id: string; createdAt: string; updatedAt: string }>(
    storeName: string,
    entity: T
  ): Promise<T> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(entity);

      request.onsuccess = () => resolve(entity);
      request.onerror = () => reject(request.error);
    });
  }

  private async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getById<T>(storeName: string, id: string): Promise<T | null> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  private async update<T extends { id: string; updatedAt: string }>(storeName: string, id: string, data: Partial<T>): Promise<T> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const existing = getRequest.result;
        if (!existing) {
          reject(new Error(`Entity with id ${id} not found`));
          return;
        }

        const updated = {
          ...existing,
          ...data,
          id,
          updatedAt: getCurrentTimestamp(),
        } as T;

        const putRequest = store.put(updated);
        putRequest.onsuccess = () => resolve(updated);
        putRequest.onerror = () => reject(putRequest.error);
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  private async delete(storeName: string, id: string): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Income operations
  async createIncome(data: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>): Promise<Income> {
    return this.create<Income>(STORES.INCOME, data);
  }

  async getAllIncomes(): Promise<Income[]> {
    return this.getAll<Income>(STORES.INCOME);
  }

  async getIncomeById(id: string): Promise<Income | null> {
    return this.getById<Income>(STORES.INCOME, id);
  }

  async updateIncome(id: string, data: Partial<Income>): Promise<Income> {
    return this.update<Income>(STORES.INCOME, id, data);
  }

  async deleteIncome(id: string): Promise<void> {
    return this.delete(STORES.INCOME, id);
  }

  // Expense operations
  async createExpense(data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense> {
    return this.create<Expense>(STORES.EXPENSES, data);
  }

  async getAllExpenses(): Promise<Expense[]> {
    return this.getAll<Expense>(STORES.EXPENSES);
  }

  async getExpenseById(id: string): Promise<Expense | null> {
    return this.getById<Expense>(STORES.EXPENSES, id);
  }

  async updateExpense(id: string, data: Partial<Expense>): Promise<Expense> {
    return this.update<Expense>(STORES.EXPENSES, id, data);
  }

  async deleteExpense(id: string): Promise<void> {
    return this.delete(STORES.EXPENSES, id);
  }

  // Envelope operations
  async createEnvelope(data: Omit<Envelope, 'id' | 'createdAt' | 'updatedAt'>): Promise<Envelope> {
    return this.create<Envelope>(STORES.ENVELOPES, data);
  }

  async getAllEnvelopes(): Promise<Envelope[]> {
    return this.getAll<Envelope>(STORES.ENVELOPES);
  }

  async getEnvelopeById(id: string): Promise<Envelope | null> {
    return this.getById<Envelope>(STORES.ENVELOPES, id);
  }

  async updateEnvelope(id: string, data: Partial<Envelope>): Promise<Envelope> {
    return this.update<Envelope>(STORES.ENVELOPES, id, data);
  }

  async deleteEnvelope(id: string): Promise<void> {
    return this.delete(STORES.ENVELOPES, id);
  }

  // Bill operations
  async createBill(data: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill> {
    return this.create<Bill>(STORES.BILLS, data);
  }

  async getAllBills(): Promise<Bill[]> {
    return this.getAll<Bill>(STORES.BILLS);
  }

  async getBillById(id: string): Promise<Bill | null> {
    return this.getById<Bill>(STORES.BILLS, id);
  }

  async updateBill(id: string, data: Partial<Bill>): Promise<Bill> {
    return this.update<Bill>(STORES.BILLS, id, data);
  }

  async deleteBill(id: string): Promise<void> {
    return this.delete(STORES.BILLS, id);
  }

  // Debt operations
  async createDebt(data: Omit<DebtAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<DebtAccount> {
    return this.create<DebtAccount>(STORES.DEBTS, data);
  }

  async getAllDebts(): Promise<DebtAccount[]> {
    return this.getAll<DebtAccount>(STORES.DEBTS);
  }

  async getDebtById(id: string): Promise<DebtAccount | null> {
    return this.getById<DebtAccount>(STORES.DEBTS, id);
  }

  async updateDebt(id: string, data: Partial<DebtAccount>): Promise<DebtAccount> {
    return this.update<DebtAccount>(STORES.DEBTS, id, data);
  }

  async deleteDebt(id: string): Promise<void> {
    return this.delete(STORES.DEBTS, id);
  }

  // Category operations
  async createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    return this.create<Category>(STORES.CATEGORIES, data);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.getAll<Category>(STORES.CATEGORIES);
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.getById<Category>(STORES.CATEGORIES, id);
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    return this.update<Category>(STORES.CATEGORIES, id, data);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.delete(STORES.CATEGORIES, id);
  }

  // Settings operations
  async getSettings(): Promise<UserSettings | null> {
    const settings = await this.getAll<UserSettings>(STORES.SETTINGS);
    return settings[0] || null;
  }

  async updateSettings(data: Partial<UserSettings>): Promise<UserSettings> {
    const existing = await this.getSettings();

    if (existing) {
      return this.update<UserSettings>(STORES.SETTINGS, existing.id, data);
    } else {
      // Create default settings
      const defaultSettings: Omit<UserSettings, 'id' | 'createdAt' | 'updatedAt'> = {
        currency: 'USD',
        payFrequency: 'weekly',
        savingsLimit: 1000,
        debtReminders: true,
        theme: 'light',
        ...data,
      };
      return this.create<UserSettings>(STORES.SETTINGS, defaultSettings);
    }
  }

  // Migration support
  async exportAllData(): Promise<CompleteUserData> {
    const [income, expenses, envelopes, bills, debts, categories, recurring, settings] = await Promise.all([
      this.getAllIncomes(),
      this.getAllExpenses(),
      this.getAllEnvelopes(),
      this.getAllBills(),
      this.getAllDebts(),
      this.getAllCategories(),
      this.getAll<RecurringTransaction>(STORES.RECURRING),
      this.getSettings(),
    ]);

    const allDates = [
      ...income.map(i => i.date),
      ...expenses.map(e => e.date),
    ].filter(Boolean).sort();

    const totalRecords = income.length + expenses.length + envelopes.length + bills.length + debts.length + categories.length + recurring.length;

    return {
      version: '1.0.0',
      exportedAt: getCurrentTimestamp(),
      user: {
        settings: settings || {
          id: generateId(),
          currency: 'USD',
          payFrequency: 'weekly',
          savingsLimit: 1000,
          debtReminders: true,
          theme: 'light',
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        },
      },
      income,
      expenses,
      envelopes,
      bills,
      debts,
      recurringTransactions: recurring,
      categories,
      metadata: {
        totalRecords,
        dateRange: {
          start: allDates[0] || getCurrentTimestamp(),
          end: allDates[allDates.length - 1] || getCurrentTimestamp(),
        },
        checksum: `${totalRecords}-${Date.now()}`,
      },
    };
  }

  async importAllData(data: CompleteUserData): Promise<void> {
    const db = await this.initDB();

    // Clear existing data
    const storeNames = Object.values(STORES);
    for (const storeName of storeNames) {
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    // Import new data with preserved IDs and timestamps
    // This is critical for maintaining data integrity and relationships
    const transactions: Promise<any>[] = [
      ...data.income.map(item => this.insertWithOriginalData<Income>(STORES.INCOME, item)),
      ...data.expenses.map(item => this.insertWithOriginalData<Expense>(STORES.EXPENSES, item)),
      ...data.envelopes.map(item => this.insertWithOriginalData<Envelope>(STORES.ENVELOPES, item)),
      ...data.bills.map(item => this.insertWithOriginalData<Bill>(STORES.BILLS, item)),
      ...data.debts.map(item => this.insertWithOriginalData<DebtAccount>(STORES.DEBTS, item)),
      ...data.categories.map(item => this.insertWithOriginalData<Category>(STORES.CATEGORIES, item)),
      ...data.recurringTransactions.map(item => this.insertWithOriginalData<RecurringTransaction>(STORES.RECURRING, item)),
    ];

    // Settings need special handling since they might not have an ID in the export
    if (data.user.settings) {
      // If settings already have an ID, use insertWithOriginalData, otherwise create new
      if (data.user.settings.id) {
        transactions.push(this.insertWithOriginalData<UserSettings>(STORES.SETTINGS, data.user.settings));
      } else {
        // Create new settings if no ID (backward compatibility)
        transactions.push(this.updateSettings(data.user.settings) as Promise<any>);
      }
    }

    await Promise.all(transactions);
  }

  async validateDataIntegrity(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    try {
      const [expenses, envelopes] = await Promise.all([
        this.getAllExpenses(),
        this.getAllEnvelopes(),
      ]);

      // Validate envelope balances
      for (const envelope of envelopes) {
        const calculatedBalance = envelope.allocatedAmount - envelope.spentAmount;
        if (Math.abs(envelope.balance - calculatedBalance) > 0.01) {
          errors.push(`Envelope ${envelope.id} has incorrect balance calculation`);
        }
      }

      // Validate expense categories exist
      const categories = await this.getAllCategories();
      const categoryIds = new Set(categories.map(c => c.id));
      for (const expense of expenses) {
        if (!categoryIds.has(expense.categoryId)) {
          errors.push(`Expense ${expense.id} references non-existent category ${expense.categoryId}`);
        }
      }

      return {
        valid: errors.length === 0,
        errors,
      };
    } catch (error) {
      errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { valid: false, errors };
    }
  }
}

