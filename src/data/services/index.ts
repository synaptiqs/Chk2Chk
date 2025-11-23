/**
 * Data Services
 * Export data access layer
 */

export { dataRepository } from './DataRepository';
export type { IStorageRepository } from '../storage/repository';
export type { CompleteUserData } from '../storage/repository';
export { initializeDefaultData, DEFAULT_CATEGORIES, DEFAULT_SETTINGS } from './defaultData';
