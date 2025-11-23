# Project Structure

This document outlines the modular architecture of Chk2Chk.

## Directory Structure

```
Chk2Chk/
├── src/
│   ├── core/                    # Core utilities (shared, minimal dependencies)
│   │   ├── types/              # TypeScript interfaces and types
│   │   ├── utils/              # Pure utility functions
│   │   └── constants/          # App-wide constants
│   │
│   ├── data/                    # Data layer (isolated, swappable)
│   │   ├── storage/            # Storage abstraction
│   │   │   ├── indexeddb/     # IndexedDB implementation (MVP)
│   │   │   ├── repository/    # Repository pattern interface
│   │   │   └── migration/     # Data migration utilities
│   │   ├── models/            # Data models/entities
│   │   └── services/          # Data service layer
│   │
│   ├── features/                # Feature modules (independent)
│   │   ├── income/            # Income tracking module
│   │   ├── expenses/          # Expense tracking module
│   │   ├── envelopes/         # Envelope budgeting module
│   │   ├── bills/             # Bill management module
│   │   ├── debt/              # Debt management module
│   │   ├── analytics/         # Analytics/visualization module
│   │   ├── export/            # Data export module
│   │   └── forecasting/       # Income forecasting module
│   │
│   ├── ui/                      # UI components (isolated, reusable)
│   │   ├── components/        # Shared UI components
│   │   │   ├── buttons/
│   │   │   ├── forms/
│   │   │   ├── cards/
│   │   │   └── charts/        # Chart wrapper (isolates chart library)
│   │   ├── layout/            # Layout components
│   │   └── theme/             # Theme/styling system
│   │
│   ├── hooks/                   # Shared React hooks
│   ├── context/                 # React context providers (isolated)
│   └── app/                     # App-level orchestration
│       ├── routes/             # Routing configuration
│       ├── providers/          # App-level providers
│       └── error-boundaries/   # Error boundary components
│
├── public/                      # Static assets
├── railway.json                 # Railway deployment config
├── railway.toml                 # Railway additional config
├── tsconfig.json                # TypeScript configuration
└── PROJECT_PLAN.md              # Detailed project plan
```

## Module Isolation Principles

1. **No Cross-Feature Imports**: Features don't import directly from other features
2. **Data Layer Abstraction**: All data access goes through the storage repository interface
3. **Error Boundaries**: Each feature module wrapped in error boundary
4. **Adapter Pattern**: Third-party libraries wrapped in adapters

## Import Paths

Use path aliases for clean imports:

```typescript
// ✅ GOOD: Using path aliases
import { Income } from '@/features/income';
import { formatCurrency } from '@/core/utils';
import { IStorageRepository } from '@/data/storage/repository';

// ❌ BAD: Relative imports across modules
import { Income } from '../../features/income';
```

## Adding New Features

1. Create feature directory: `src/features/newfeature/`
2. Add subdirectories: `components/`, `hooks/`, `services/`, `types/`
3. Create `index.ts` barrel export
4. Wrap feature in `FeatureErrorBoundary`
5. Access data through `IStorageRepository` interface

## Storage Migration

The storage layer is abstracted, allowing easy swap:
- **MVP**: `IndexedDBRepository` (local storage)
- **Future**: `PostgreSQLRepository` (cloud database)

Both implement the same `IStorageRepository` interface.

