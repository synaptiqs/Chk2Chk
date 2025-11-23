# Chk2Chk

A budgeting application designed specifically for people who get paid weekly or daily.

## Overview

Chk2Chk addresses the unique challenges faced by gig workers, freelancers, hourly workers, and anyone with non-monthly income. Traditional monthly budgeting apps don't work well for this demographic, so Chk2Chk provides a solution tailored to their needs.

## Key Features

### MVP Features (Beta Launch - Jan 1, 2025)
- ✅ Income tracking (weekly/daily, variable amounts)
- ✅ Expense tracking with categories/tags
- ✅ Envelope budgeting method (every dollar allocated)
- ✅ Debt management (savings limit enforcement)
- ✅ Bill reminders and scheduling
- ✅ Recurring transactions
- ✅ Spending visualization
- ✅ Data export (CSV/PDF)

### 1.0 Features (Launch - March 15, 2025)
- 📊 Income forecasting (after 90 days of data)
- 🎯 Enhanced savings goals
- 📈 Advanced analytics and reporting

## Technology Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Storage:** IndexedDB (MVP) → PostgreSQL (Future)
- **Deployment:** Railway (full-stack platform)

## Project Status

- **Current Phase:** MVP Development Complete - Ready for Beta Testing
- **MVP/Beta Launch:** January 1, 2025
- **1.0 Launch:** March 15, 2025
- **Last Updated:** December 2024

## Architecture

This project is built with a **modular architecture** where:
- Each feature module is isolated and self-contained
- Modules can fail independently without breaking the app
- Easy to update individual packages without affecting others
- Data layer is abstracted for easy migration from local storage to cloud

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Development Setup
```bash
# Clone the repository
git clone <repository-url>
cd Chk2Chk

# Install dependencies (when package.json is created)
npm install

# Start development server
npm run dev
```

## Deployment

### Railway Deployment

Chk2Chk is configured to deploy on Railway, a full-stack platform that supports:
- Frontend hosting (React app)
- PostgreSQL database (when transitioning to membership model)
- Automatic SSL certificates
- Git-based deployments

#### Initial Setup

1. **Install Railway CLI** (optional, for local testing):
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Create a new project**:
   ```bash
   railway init
   ```

4. **Deploy**:
   ```bash
   railway up
   ```

#### Railway Dashboard Setup

1. Go to [railway.app](https://railway.app) and create an account
2. Create a new project
3. Connect your Git repository (GitHub, GitLab, etc.)
4. Railway will automatically detect the project and deploy

#### Environment Variables

For MVP (local storage): No environment variables needed.

For future (membership model):
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - For authentication
- `NODE_ENV` - Set to `production`

Set these in Railway dashboard: Project → Variables

#### Custom Domain (Optional)

1. In Railway dashboard, go to your service
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Railway automatically provisions SSL certificate

#### Monitoring

- View logs in Railway dashboard
- Monitor usage and costs
- Set up alerts for errors

See [STRUCTURE.md](./STRUCTURE.md) for project architecture details.

## Development Progress

### ✅ Completed Features (MVP Ready)

#### Core Infrastructure
- ✅ React + TypeScript + Vite project setup
- ✅ Tailwind CSS configured with custom color palette
- ✅ Modular architecture with feature isolation
- ✅ Error boundaries and fault tolerance
- ✅ TypeScript path aliases (`@/` for `src/`)

#### Data Layer
- ✅ IndexedDB storage repository fully implemented
- ✅ Storage abstraction layer (`IStorageRepository` interface)
- ✅ Complete CRUD operations for all entities:
  - Income, Expenses, Envelopes, Bills, Debt Accounts
  - Categories, User Settings, Recurring Transactions
- ✅ Data export/import functionality (preserves IDs and timestamps)
- ✅ Default data initialization (12 default categories)

#### Feature Modules Implemented

1. **Income Tracking** ✅
   - Full CRUD operations with UI
   - IncomeForm and IncomeList components
   - Support for multiple income sources
   - Variable amount handling

2. **Expense Tracking** ✅
   - Full CRUD operations with UI
   - ExpenseForm and ExpenseList components
   - **Required fields:** Amount, Category, Description
   - Tags and notes support
   - Category-based organization

3. **Category Management** ✅
   - CategoryForm and CategoryList components
   - Full CRUD operations
   - Color and icon customization
   - CategoriesPage with full UI

4. **Envelope Budgeting** ✅
   - EnvelopesPage with full UI
   - EnvelopeForm and EnvelopeList components
   - Create, edit, and delete envelopes
   - Category association
   - Summary cards (allocated, spent, balance)
   - Allocation logic (service layer)

5. **Bills Management** ✅
   - Service layer and hooks implemented
   - Bill tracking and scheduling

6. **Debt Management** ✅
   - Service layer with debt rules enforcement
   - Savings limit enforcement ($1,000 max when debt exists)
   - Debt payment reminders

7. **Analytics** ✅
   - Analytics service with spending analysis
   - Average calculations
   - Trend analysis foundation

8. **Data Export** ✅
   - ExportPanel component
   - CSV export functionality
   - PDF export functionality (jsPDF)

#### UI Components
- ✅ Dashboard with real-time summaries
- ✅ Layout component with navigation
- ✅ Button and Card components
- ✅ Responsive design foundation
- ✅ Routing setup (React Router)

#### Deployment & Version Control
- ✅ Railway configuration files (`railway.json`, `railway.toml`)
- ✅ Git repository initialized and pushed to GitHub
- ✅ Build scripts configured for Railway
- ✅ Environment variable handling

### 🔧 Recent Changes (Latest Session)

**Envelopes Management UI** (December 2024):
- ✅ Created EnvelopesPage component with full CRUD functionality
- ✅ Enhanced EnvelopeForm with category selection
- ✅ Added summary cards (Total Allocated, Total Spent, Total Balance)
- ✅ Full create, edit, and delete functionality
- ✅ Route and navigation added

**Debt Management UI** (December 2024):
- ✅ Created DebtPage component with full CRUD functionality
- ✅ Built DebtAccountForm and DebtAccountList components
- ✅ Implemented savings limit warnings ($1,000 max when debt exists)
- ✅ Added debt summary cards (total debt, minimum payments)
- ✅ Real-time debt status tracking and reminders
- ✅ Route and navigation added

**Bill Management UI** (December 2024):
- ✅ Created BillsPage component with full CRUD functionality
- ✅ Built BillForm and BillList components
- ✅ Implemented "Mark as Paid" functionality
- ✅ Visual indicators for paid vs unpaid bills
- ✅ Route and navigation added

**Expense Description Field** (December 2024):
- Added required `description` field to Expense type
- Updated ExpenseForm with description input (positioned below category)
- Updated ExpenseList to display description
- All required fields now marked: Amount *, Category *, Description *
- Description helps with granularity and trend analysis

**Data Migration Fix**:
- Fixed `importAllData` to preserve original IDs and timestamps
- Added `insertWithOriginalData` method for data integrity
- Ensures zero data loss during migration

### 📋 Next Steps for Development

#### Immediate Priorities (Pre-Beta)
1. ✅ **Bill Management UI** - COMPLETE
   - ✅ BillsPage component created
   - ✅ BillForm and BillList components built
   - ✅ Mark as paid functionality implemented
   - ⏳ Bill reminder UI (future enhancement)
   - ⏳ Bill scheduling interface (future enhancement)

2. ✅ **Debt Management UI** - COMPLETE
   - ✅ DebtPage component created
   - ✅ DebtAccountForm and DebtAccountList built
   - ✅ Debt payment tracking UI implemented
   - ✅ Savings limit warnings added

3. **Settings Page**
   - User settings UI (currency, pay frequency, savings limit)
   - Default category management
   - Data export/import UI
   - App preferences

4. **Recurring Transactions UI**
   - RecurringTransactionForm component
   - Recurring transaction list
   - Auto-creation of transactions from recurring templates

5. **Envelope Allocation UI**
   - Visual envelope allocation interface
   - Drag-and-drop or form-based allocation
   - Envelope balance tracking

#### Post-Beta Enhancements (1.0 Launch)
6. **Income Forecasting**
   - Implement forecasting algorithm (after 90 days of data)
   - Forecasting UI components
   - Pattern recognition for variable income

7. **Enhanced Analytics**
   - Spending visualization charts
   - Category breakdowns
   - Income vs. expense trends
   - Time-based analysis

8. **Advanced Features**
   - Savings goals tracking
   - Enhanced reporting
   - Mobile optimization
   - Offline support improvements

### 🚀 Instructions for Next Agent

**Quick Start Checklist:**
- ✅ Run `npm install` to ensure dependencies are installed
- ✅ Run `npm run dev` to start development server
- ✅ Review completed features: Income, Expenses, Categories, Bills, Debt
- ✅ Next task: Settings Page (see priority order below)
- ✅ Reference existing implementations: `src/features/bills/` or `src/features/debt/` for recent patterns

**To Continue Development:**

1. **Review Current State**
   - Check `MILESTONE_CHECKS.md` for detailed progress
   - Review `PROJECT_PLAN.md` for architecture and requirements
   - Run `npm install` to ensure dependencies are up to date

2. **Development Environment**
   ```bash
   npm install          # Install dependencies
   npm run dev         # Start development server
   npm run build       # Verify build works
   ```

3. **Key Files to Understand**
   - `src/data/storage/indexeddb/IndexedDBRepository.ts` - Data layer (CRUD operations)
   - `src/data/services/index.ts` - Exports `dataRepository` (use this, not IndexedDB directly)
   - `src/core/types/index.ts` - Type definitions (BaseEntity, all entity interfaces)
   - `src/core/utils/index.ts` - Utility functions (formatCurrency, generateId, etc.)
   - `src/core/constants/index.ts` - App constants (MAX_SAVINGS_WITH_DEBT, etc.)
   - `src/features/*/` - Feature modules (modular architecture)
   - `src/app/routes/AppRoutes.tsx` - Routing configuration
   - `src/ui/layout/Layout.tsx` - Main layout with navigation
   - **Example implementations to reference:**
     - `src/features/expenses/` - Full CRUD with form/list pattern
     - `src/features/bills/` - Recent implementation with paid status
     - `src/features/debt/` - Recent implementation with warnings

4. **Architecture Principles**
   - **Modular Design:** Each feature in `src/features/` is isolated
   - **Data Abstraction:** Use `dataRepository` from `@/data/services`
   - **Type Safety:** All entities extend `BaseEntity` with `id`, `createdAt`, `updatedAt`
   - **Error Boundaries:** Components wrapped in `FeatureErrorBoundary`

5. **Adding New Features**
   - Create feature folder in `src/features/[feature-name]/`
   - Structure: `components/`, `hooks/`, `services/`, `types/`, `pages/`
   - Follow existing patterns (see `expenses`, `income`, `bills`, or `debt` modules)
   - **Example structure:**
     ```
     src/features/[feature-name]/
       ├── components/
       │   ├── [Feature]Form.tsx
       │   ├── [Feature]List.tsx
       │   └── index.ts (barrel export)
       ├── hooks/
       │   └── use[Feature].ts
       ├── services/
       │   └── [feature]Service.ts
       ├── types/
       │   └── index.ts
       ├── pages/
       │   └── [Feature]Page.tsx
       └── index.ts (barrel export)
     ```
   - Add route in `AppRoutes.tsx`: `<Route path="/[feature]" element={<[Feature]Page />} />`
   - Update navigation in `Layout.tsx`: Add link to nav menu
   - **Key patterns:**
     - Forms use controlled inputs with `useState`
     - Lists display data with edit/delete actions
     - Services use `dataRepository` from `@/data/services`
     - Hooks manage loading/error states
     - All entities extend `BaseEntity` (id, createdAt, updatedAt)

6. **Data Model**
   - All entities stored in IndexedDB (local storage)
   - Migration path ready for PostgreSQL (future)
   - Export/import preserves all data including IDs
   - **Key entity types** (see `src/core/types/index.ts`):
     - `Income`: date, amount, source, notes
     - `Expense`: date, amount, categoryId, description (required), tags, notes
     - `Bill`: name, amount, dueDate (day of month), frequency, categoryId, isPaid
     - `DebtAccount`: name, type, balance, minimumPayment, interestRate, dueDate
     - `Category`: name, color, icon
     - `Envelope`: name, allocatedAmount, categoryId
     - `UserSettings`: currency, payFrequency, savingsLimit
   - All entities have: `id: string`, `createdAt: string`, `updatedAt: string`

7. **Testing Before Committing**
   ```bash
   npm run build       # Check for TypeScript errors
   npm run lint        # Check code quality
   ```

8. **Deployment**
   - Railway is configured and ready
   - Push to GitHub triggers deployment (if connected)
   - Check Railway dashboard for deployment status

**Current Codebase Status:**
- ✅ All core MVP features implemented
- ✅ Data layer complete and tested
- ✅ UI components functional
- ✅ Build passing, no critical errors
- ✅ Bill Management UI complete
- ✅ Debt Management UI complete
- ✅ Ready for remaining feature pages (Settings, Recurring Transactions, Envelope Allocation)

**Priority Order:**
1. ✅ Bill Management UI - COMPLETE
2. ✅ Debt Management UI - COMPLETE
3. Settings Page (next priority)
4. Recurring Transactions UI
5. Envelope Allocation UI

**Progress: 2 of 5 immediate priorities complete (40%)**

---

### 📝 Important: Keep README Updated

**When making changes to the project, please update this README file:**

1. **After completing features:**
   - Add entry to "Recent Changes" section with date
   - Update "Next Steps" section to mark completed items
   - Update "Current Codebase Status" section
   - Update progress percentage if applicable

2. **After significant changes:**
   - Document new features, fixes, or improvements
   - Update architecture notes if structure changes
   - Add new instructions if processes change

3. **Before committing:**
   - Ensure README reflects current state
   - Verify all links and references are accurate
   - Update "Last Updated" date if needed

This helps future developers (and future you!) understand the project state quickly.

## Documentation

- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Detailed project planning, architecture, and development phases
- [MILESTONE_CHECKS.md](./MILESTONE_CHECKS.md) - Development milestone progress tracking
- [STRUCTURE.md](./STRUCTURE.md) - Project file structure and architecture

## License

*To be determined*

