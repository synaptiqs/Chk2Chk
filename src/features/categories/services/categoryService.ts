/**
 * Category Service
 */

import { dataRepository } from '@/data/services';
import type { Category } from '@/core/types';

export class CategoryService {
  async createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    return dataRepository.createCategory(data);
  }

  async getAllCategories(): Promise<Category[]> {
    return dataRepository.getAllCategories();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return dataRepository.getCategoryById(id);
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    return dataRepository.updateCategory(id, data);
  }

  async deleteCategory(id: string): Promise<void> {
    return dataRepository.deleteCategory(id);
  }
}

export const categoryService = new CategoryService();

