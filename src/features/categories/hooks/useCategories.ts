/**
 * Categories Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/categoryService';
import type { Category } from '@/core/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load categories'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const createCategory = useCallback(async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newCategory = await categoryService.createCategory(data);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create category'));
      throw err;
    }
  }, []);

  const updateCategory = useCallback(async (id: string, data: Partial<Category>) => {
    try {
      const updated = await categoryService.updateCategory(id, data);
      setCategories(prev => prev.map(cat => cat.id === id ? updated : cat));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update category'));
      throw err;
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete category'));
      throw err;
    }
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refresh: loadCategories,
  };
}

