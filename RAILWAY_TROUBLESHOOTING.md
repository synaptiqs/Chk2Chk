# Railway Troubleshooting Guide

## "Not Found" Error - Fixed! ✅

### Issue
Railway was showing "Not Found" because the Vite preview server wasn't binding to Railway's PORT environment variable.

### Solution Applied
Updated `package.json` start command to:
```json
"start": "vite preview --host 0.0.0.0 --port ${PORT:-3000}"
```

This ensures:
- ✅ Server binds to `0.0.0.0` (required for Railway)
- ✅ Uses Railway's `PORT` environment variable
- ✅ Falls back to 3000 if PORT not set

### Next Steps

1. **Wait for Railway to Redeploy**
   - Railway should automatically detect the new commit
   - It will rebuild and redeploy
   - Check Railway dashboard → Deployments

2. **If Auto-Deploy Doesn't Trigger**
   - Go to Railway dashboard
   - Click on your service
   - Click "Redeploy" button

3. **Check Build Logs**
   - In Railway dashboard → Deployments
   - Click on the latest deployment
   - Check "Build Logs" for any errors
   - Check "Deploy Logs" for runtime issues

4. **Verify Service is Running**
   - Check "Metrics" tab in Railway
   - Should show CPU/Memory usage
   - Should show network traffic

## Common Railway Issues

### Build Fails
- Check build logs for TypeScript errors
- Verify all dependencies are in `package.json`
- Ensure `npm ci` runs successfully

### Service Won't Start
- Verify start command works locally: `npm run start`
- Check that PORT environment variable is set
- Ensure server binds to `0.0.0.0`, not `localhost`

### Still Getting "Not Found"
1. Check Railway dashboard → Settings → Network
2. Verify domain is provisioned
3. Check if service is actually running (Metrics tab)
4. Try accessing via Railway's generated URL

### Check Deployment Status
In Railway dashboard:
- **Deployments Tab**: See all deployments
- **Metrics Tab**: See if service is running
- **Logs Tab**: See real-time logs
- **Settings Tab**: Check configuration

## Verification Checklist

After redeploy:
- [ ] Build completes successfully
- [ ] Service shows as "Active" in Railway
- [ ] Metrics show CPU/Memory usage
- [ ] Can access URL without "Not Found"
- [ ] App loads in browser
- [ ] IndexedDB works (check DevTools)

## Still Having Issues?

1. **Check Railway Logs**
   - Dashboard → Your Service → Logs
   - Look for error messages

2. **Test Locally First**
   ```bash
   npm run build
   npm run start
   # Should work on http://localhost:3000
   ```

3. **Verify Configuration**
   - `railway.json` is correct
   - `package.json` has start script
   - Build output exists in `dist/`

4. **Contact Railway Support**
   - Check Railway status page
   - Railway dashboard → Help → Support

