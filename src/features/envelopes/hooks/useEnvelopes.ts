/**
 * Envelopes Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { envelopeService } from '../services/envelopeService';
import type { Envelope } from '../types';

export function useEnvelopes() {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadEnvelopes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await envelopeService.getAllEnvelopes();
      setEnvelopes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load envelopes'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEnvelopes();
  }, [loadEnvelopes]);

  const createEnvelope = useCallback(async (data: Omit<Envelope, 'id' | 'createdAt' | 'updatedAt' | 'balance'>) => {
    try {
      const newEnvelope = await envelopeService.createEnvelope(data);
      setEnvelopes(prev => [...prev, newEnvelope]);
      return newEnvelope;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create envelope'));
      throw err;
    }
  }, []);

  const updateEnvelope = useCallback(async (id: string, data: Partial<Envelope>) => {
    try {
      const updated = await envelopeService.updateEnvelope(id, data);
      setEnvelopes(prev => prev.map(env => env.id === id ? updated : env));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update envelope'));
      throw err;
    }
  }, []);

  const deleteEnvelope = useCallback(async (id: string) => {
    try {
      await envelopeService.deleteEnvelope(id);
      setEnvelopes(prev => prev.filter(env => env.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete envelope'));
      throw err;
    }
  }, []);

  return {
    envelopes,
    loading,
    error,
    createEnvelope,
    updateEnvelope,
    deleteEnvelope,
    refresh: loadEnvelopes,
  };
}

