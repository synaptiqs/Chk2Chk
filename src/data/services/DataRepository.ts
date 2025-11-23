/**
 * Data Repository Service
 * Provides access to the storage repository
 * This abstraction allows swapping implementations
 */

import { IndexedDBRepository } from '../storage/indexeddb';
import type { IStorageRepository } from '../storage/repository';

// Export the current repository implementation
// In the future, this can be swapped for PostgreSQLRepository
export const dataRepository: IStorageRepository = new IndexedDBRepository();

