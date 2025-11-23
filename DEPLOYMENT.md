# Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed
- [x] All code committed to git
- [x] Railway configuration files in place (`railway.json`, `railway.toml`)
- [x] Build successful (`npm run build` passes)
- [x] TypeScript compilation passing
- [x] All dependencies installed
- [x] Environment variables documented

### Railway Configuration

The project is configured for Railway deployment with:
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm run start` (serves the built static files)
- **Health Check:** Automatic on `/` path

## Deployment Steps

### Option 1: Railway Dashboard (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up or log in

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or GitLab/Bitbucket)
   - Connect your repository

3. **Configure Service**
   - Railway will auto-detect the project
   - It will use the `railway.json` configuration
   - No additional setup needed for MVP

4. **Deploy**
   - Railway will automatically build and deploy
   - Monitor the deployment in the dashboard
   - Get your deployment URL

### Option 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project (if you have one)
railway link

# Deploy
railway up
```

## Environment Variables

### MVP (Current - No Variables Needed)
The MVP uses IndexedDB (local storage), so no environment variables are required.

### Future (Membership Model)
When transitioning to cloud database, add these in Railway dashboard:

```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

**To add variables:**
1. Go to Railway dashboard
2. Select your project
3. Go to "Variables" tab
4. Add each variable

## Build Configuration

### Current Setup
- **Framework:** React + Vite
- **Build Output:** `dist/` directory
- **Static Files:** Served via Vite preview server

### Railway Auto-Detection
Railway will:
- Detect `package.json`
- Run `npm install` (or `npm ci` if `package-lock.json` exists)
- Run build command from `railway.json`
- Serve the built files

## Post-Deployment

### Verify Deployment
1. Check Railway dashboard for deployment status
2. Visit the provided URL
3. Test core functionality:
   - Add income entry
   - Add expense entry
   - Verify data persists (IndexedDB)

### Monitoring
- View logs in Railway dashboard
- Check for errors
- Monitor resource usage

### Custom Domain (Optional)
1. In Railway dashboard → Settings → Domains
2. Add your custom domain
3. Railway automatically provisions SSL

## Troubleshooting

### Build Fails
- Check Railway logs for errors
- Verify `package.json` has correct scripts
- Ensure all dependencies are listed

### App Doesn't Load
- Check if build completed successfully
- Verify start command is correct
- Check browser console for errors

### Data Not Persisting
- IndexedDB requires HTTPS in production
- Railway provides HTTPS automatically
- Check browser DevTools → Application → IndexedDB

## Rollback

If deployment has issues:
1. Go to Railway dashboard
2. Select your service
3. Go to "Deployments" tab
4. Click "Redeploy" on previous successful deployment

## Next Steps

After successful deployment:
1. Test all features
2. Monitor performance
3. Collect user feedback
4. Plan for 1.0 features (Income Forecasting, etc.)

