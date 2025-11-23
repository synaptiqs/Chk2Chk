/**
 * IndexedDB Storage Implementation
 * Export the repository instance
 */

export { IndexedDBRepository } from './IndexedDBRepository';

// Create and export singleton instance
import { IndexedDBRepository } from './IndexedDBRepository';
export const indexedDBRepository = new IndexedDBRepository();
