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

- **Current Phase:** Planning & Setup
- **MVP/Beta Launch:** January 1, 2025
- **1.0 Launch:** March 15, 2025

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

## Documentation

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for detailed project planning, architecture, and development phases.

## License

*To be determined*

