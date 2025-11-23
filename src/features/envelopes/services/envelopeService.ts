/**
 * Envelope Service
 * Business logic for envelope operations
 */

import { dataRepository } from '@/data/services';
import type { Envelope } from '../types';

export class EnvelopeService {
  async createEnvelope(data: Omit<Envelope, 'id' | 'createdAt' | 'updatedAt' | 'balance'>): Promise<Envelope> {
    const envelope = {
      ...data,
      balance: data.allocatedAmount - data.spentAmount,
    };
    return dataRepository.createEnvelope(envelope);
  }

  async getAllEnvelopes(): Promise<Envelope[]> {
    return dataRepository.getAllEnvelopes();
  }

  async getEnvelopeById(id: string): Promise<Envelope | null> {
    return dataRepository.getEnvelopeById(id);
  }

  async updateEnvelope(id: string, data: Partial<Envelope>): Promise<Envelope> {
    const existing = await this.getEnvelopeById(id);
    if (!existing) throw new Error('Envelope not found');

    const updated = {
      ...existing,
      ...data,
      balance: (data.allocatedAmount ?? existing.allocatedAmount) - (data.spentAmount ?? existing.spentAmount),
    };
    return dataRepository.updateEnvelope(id, updated);
  }

  async deleteEnvelope(id: string): Promise<void> {
    return dataRepository.deleteEnvelope(id);
  }

  async allocateToEnvelope(envelopeId: string, amount: number): Promise<Envelope> {
    const envelope = await this.getEnvelopeById(envelopeId);
    if (!envelope) throw new Error('Envelope not found');

    return this.updateEnvelope(envelopeId, {
      allocatedAmount: envelope.allocatedAmount + amount,
    });
  }

  async spendFromEnvelope(envelopeId: string, amount: number): Promise<Envelope> {
    const envelope = await this.getEnvelopeById(envelopeId);
    if (!envelope) throw new Error('Envelope not found');

    if (envelope.balance < amount) {
      throw new Error('Insufficient balance in envelope');
    }

    return this.updateEnvelope(envelopeId, {
      spentAmount: envelope.spentAmount + amount,
    });
  }
}

export const envelopeService = new EnvelopeService();

