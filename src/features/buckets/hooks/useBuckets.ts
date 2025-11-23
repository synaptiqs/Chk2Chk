/**
 * Buckets Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { bucketService } from '../services/bucketService';
import type { Bucket } from '../types';

export function useBuckets() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadBuckets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bucketService.getAllBuckets();
      setBuckets(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load buckets'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBuckets();
  }, [loadBuckets]);

  const createBucket = useCallback(async (data: Omit<Bucket, 'id' | 'createdAt' | 'updatedAt' | 'balance'>) => {
    try {
      const newBucket = await bucketService.createBucket(data);
      setBuckets(prev => [...prev, newBucket]);
      return newBucket;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create bucket'));
      throw err;
    }
  }, []);

  const updateBucket = useCallback(async (id: string, data: Partial<Bucket>) => {
    try {
      const updated = await bucketService.updateBucket(id, data);
      setBuckets(prev => prev.map(bucket => bucket.id === id ? updated : bucket));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update bucket'));
      throw err;
    }
  }, []);

  const deleteBucket = useCallback(async (id: string) => {
    try {
      await bucketService.deleteBucket(id);
      setBuckets(prev => prev.filter(bucket => bucket.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete bucket'));
      throw err;
    }
  }, []);

  return {
    buckets,
    loading,
    error,
    createBucket,
    updateBucket,
    deleteBucket,
    refresh: loadBuckets,
  };
}
