/**
 * Bill Service
 */

import { dataRepository } from '@/data/services';
import type { Bill } from '../types';

export class BillService {
  async createBill(data: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill> {
    return dataRepository.createBill(data);
  }

  async getAllBills(): Promise<Bill[]> {
    return dataRepository.getAllBills();
  }

  async getBillById(id: string): Promise<Bill | null> {
    return dataRepository.getBillById(id);
  }

  async updateBill(id: string, data: Partial<Bill>): Promise<Bill> {
    return dataRepository.updateBill(id, data);
  }

  async deleteBill(id: string): Promise<void> {
    return dataRepository.deleteBill(id);
  }

  async markBillAsPaid(id: string): Promise<Bill> {
    const bill = await this.getBillById(id);
    if (!bill) throw new Error('Bill not found');
    return this.updateBill(id, { isPaid: true, lastPaidDate: new Date().toISOString() });
  }
}

export const billService = new BillService();

