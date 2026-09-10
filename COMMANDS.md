# Useful Commands for Deployment

## Local Development

### Start Backend (from project root)
```bash
cd backend
npm install
npm run dev    # Uses nodemon for auto-reload
# or
npm start      # Direct start
```

### Start Frontend (from project root)
```bash
cd frontend
npm install
npm run dev    # Vite dev server
```

### Build Frontend for Production
```bash
cd frontend
npm run build   # Creates dist/ folder
npm run preview # Preview production build locally
```

---

## Testing Backend Locally

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get Product Info
```bash
curl http://localhost:5000/api/product/ai-productivity-guide
```

### Check If Database Connected
- Look at console output from `npm run dev`
- Should say "MongoDB connected" if connected
- If no MongoDB: "MongoDB unavailable" is OK for testing

---

## Git Commands (Before Deployment)

### Initialize/Update Git
```bash
# If not yet in git
git init
git add .
git commit -m "Initial commit"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Daily Deploy Updates
```bash
# After making changes
git add .
git commit -m "Describe your changes"
git push   # Automatically deploys in Render/Vercel
```

---

## Checking Deployment Status

### Backend Health Check (Production)
```bash
curl https://<your-backend-url>/api/health
```

### Frontend Access
Just open `https://<your-frontend-url>` in browser

---

## Environment Variable Management

### Render.com (Backend)
```
Dashboard → Your Service → Environment
- Add/Edit variables there
- Click "Manual Deploy" to apply changes
```

### Vercel (Frontend)
```
Dashboard → Settings → Environment Variables
- Add/Edit variables there
- Auto-deploys when changed
```

---

## Viewing Logs

### Render Backend Logs
1. Go to Render.com dashboard
2. Click on your backend service
3. Go to "Logs" tab
4. Scroll to see real-time logs
5. Errors appear in red

### Vercel Frontend Logs
1. Go to Vercel.com dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click latest deployment
5. View build logs and function logs

### Browser Console (Frontend)
Press `F12` → Console tab → Check for errors

---

## Restart/Redeploy

### Render Backend
1. Dashboard → Service
2. Click "Manual Deploy"
3. Wait for redeployment

### Vercel Frontend
1. Dashboard → Project
2. Latest deployment has options
3. Can click "Redeploy" if needed
4. Auto-deploys on git push

---

## Database Commands (MongoDB)

### Connect to MongoDB Atlas
```bash
# Use MongoDB Compass GUI
# Or connect via shell (if installed)
mongosh "mongodb+srv://username:password@cluster.mongodb.net/fieldnote"
```

### View Database (from MongoDB Atlas Dashboard)
1. Collections tab shows all data
2. Can view orders, payments
3. Can view stats and metrics

---

## Clearing Cache

### Browser Cache
- Firefox: Ctrl+Shift+Delete
- Chrome: Ctrl+Shift+Delete
- Safari: Cmd+Shift+Delete

### Vercel Cache
- Settings → Git → Clearing Build Cache
- Redeploy after clearing

### Render Cache
Usually not needed, but can:
1. Delete and recreate service
2. Or trigger new deploy

---

## Rolling Back (If Deployment Fails)

### Render (Backend)
1. Dashboard → Service → Deployments tab
2. Find previous successful deployment
3. Click "Redeploy"

### Vercel (Frontend)
1. Dashboard → Deployments
2. Find previous successful deployment
3. Click "Promote to Production"

---

## Useful Links

- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Razorpay Dashboard:** https://dashboard.razorpay.com
- **GitHub:** https://github.com

---

## Performance Tips

### Optimize Backend
- Use caching for frequently accessed data
- Optimize database queries
- Add database indexes for common searches

### Optimize Frontend
- Lazy load routes
- Compress images
- Minimize bundle size
- Use CDN for static assets

### Monitor Usage
- Free tiers have usage limits
- Render: ~750 hours free/month
- Vercel: 100GB bandwidth/month
- MongoDB: 512MB storage free
- Check usage regularly and upgrade if needed

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "ENOENT: no such file or directory" | Check working directory, ensure you're in correct folder |
| "Cannot find module" | Run `npm install` in that directory |
| "Port already in use" | Change PORT in .env or kill process on that port |
| "MongoDB connection timeout" | Check connection string, whitelist IP, check credentials |
| "CORS error" | Update FRONTEND_URLS in backend .env |
| "Blank page on frontend" | Check browser console (F12), check API_URL env var |
| "Payment not working" | Verify Razorpay keys, check backend logs |
| "Timeout when deploying" | Free tier might be slow, check logs for errors |

---

## Next Steps After Launch

1. **Monitor** - Watch error logs daily
2. **Backup** - Set up MongoDB backups
3. **Update** - Keep dependencies updated
4. **Domain** - Add custom domain when ready
5. **Scale** - Upgrade to paid if traffic grows
6. **Security** - Review security regularly
7. **Analytics** - Add error tracking (Sentry, etc.)
8. **Alerts** - Set up alerts for errors

---

Keep this file handy for quick reference! 📚
