/**
 * Bucket Service
 * Business logic for bucket operations
 */

import { dataRepository } from '@/data/services';
import type { Bucket } from '../types';

export class BucketService {
  async createBucket(data: Omit<Bucket, 'id' | 'createdAt' | 'updatedAt' | 'balance'>): Promise<Bucket> {
    const bucket = {
      ...data,
      balance: data.allocatedAmount - data.spentAmount,
    };
    return dataRepository.createBucket(bucket);
  }

  async getAllBuckets(): Promise<Bucket[]> {
    return dataRepository.getAllBuckets();
  }

  async getBucketById(id: string): Promise<Bucket | null> {
    return dataRepository.getBucketById(id);
  }

  async updateBucket(id: string, data: Partial<Bucket>): Promise<Bucket> {
    const existing = await this.getBucketById(id);
    if (!existing) throw new Error('Bucket not found');

    const updated = {
      ...existing,
      ...data,
      balance: (data.allocatedAmount ?? existing.allocatedAmount) - (data.spentAmount ?? existing.spentAmount),
    };
    return dataRepository.updateBucket(id, updated);
  }

  async deleteBucket(id: string): Promise<void> {
    return dataRepository.deleteBucket(id);
  }

  async allocateToBucket(bucketId: string, amount: number): Promise<Bucket> {
    const bucket = await this.getBucketById(bucketId);
    if (!bucket) throw new Error('Bucket not found');

    return this.updateBucket(bucketId, {
      allocatedAmount: bucket.allocatedAmount + amount,
    });
  }

  async spendFromBucket(bucketId: string, amount: number): Promise<Bucket> {
    const bucket = await this.getBucketById(bucketId);
    if (!bucket) throw new Error('Bucket not found');

    if (bucket.balance < amount) {
      throw new Error('Insufficient balance in bucket');
    }

    return this.updateBucket(bucketId, {
      spentAmount: bucket.spentAmount + amount,
    });
  }
}

export const bucketService = new BucketService();
