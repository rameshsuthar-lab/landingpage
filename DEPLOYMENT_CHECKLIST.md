# Pre-Deployment Checklist

## Before You Deploy ✅

### 1. GitHub Repository
- [ ] Code is pushed to GitHub
- [ ] .env files are in .gitignore (NOT committed)
- [ ] All dependencies are in package.json
- [ ] No hardcoded secrets in code

### 2. Backend Preparation
- [ ] `backend/server.js` uses environment variables for ports
- [ ] `backend/package.json` has correct "start" script
- [ ] All dependencies are listed in package.json
- [ ] Error handling is in place
- [ ] CORS is configured for allowed origins

### 3. Frontend Preparation
- [ ] `frontend/vite.config.js` is properly configured
- [ ] `frontend/package.json` has "build" script
- [ ] All API calls use VITE_API_URL environment variable
- [ ] No hardcoded localhost URLs

### 4. Credentials Ready
- [ ] MongoDB Atlas account created
- [ ] MongoDB connection string copied
- [ ] Razorpay API keys available
- [ ] Razorpay account is in test mode (for testing)

---

## Deployment Steps

### Step 1: MongoDB Atlas (Free)
- [ ] Create account at mongodb.com
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP 0.0.0.0/0
- [ ] Copy connection string
- [ ] Test connection if possible

### Step 2: Deploy Backend to Render
- [ ] Create Render.com account
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Set Root Directory to `backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add all environment variables
- [ ] Deploy and wait for success
- [ ] Copy backend URL

### Step 3: Update Frontend .env.production
- [ ] Edit `frontend/.env.production`
- [ ] Set `VITE_API_URL=<backend-url>/api`
- [ ] Commit and push to GitHub

### Step 4: Deploy Frontend to Vercel
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set Root Directory to `frontend`
- [ ] Set Framework to Vite
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`
- [ ] Add VITE_API_URL environment variable
- [ ] Deploy and wait for success
- [ ] Copy frontend URL

### Step 5: Update Backend CORS
- [ ] Go to Render backend dashboard
- [ ] Update FRONTEND_URLS to include Vercel URL
- [ ] Trigger redeploy

---

## Post-Deployment Testing

### Testing Backend
- [ ] Open: `https://<backend-url>/api/health`
- [ ] Should see: `{"ok": true, "service": "fieldnote-api"}`

### Testing Frontend
- [ ] Open: `https://<frontend-url>`
- [ ] Page should load without errors
- [ ] Open DevTools (F12) → Console
- [ ] Should see no CORS errors

### Testing Payment Flow
- [ ] Click on payment button
- [ ] Should be redirected to Razorpay
- [ ] Use test card details (available on Razorpay dashboard)
- [ ] Complete test payment
- [ ] Should see success message

### Checking Logs
- [ ] Backend logs in Render dashboard
- [ ] Frontend logs in Vercel dashboard
- [ ] Browser console for errors

---

## Troubleshooting

### Backend not responding (504/502 error)
- [ ] Check Render logs for startup errors
- [ ] Verify MongoDB connection string
- [ ] Verify all required environment variables are set
- [ ] Check if backend is actually running

### CORS Errors in Console
- [ ] Check FRONTEND_URLS in backend environment
- [ ] Ensure frontend URL is included
- [ ] Redeploy backend after updating FRONTEND_URLS

### Payment not working
- [ ] Verify Razorpay keys are correct
- [ ] Check if Razorpay account is in test mode
- [ ] Check backend logs for Razorpay errors
- [ ] Verify webhook endpoint is configured

### Frontend builds but shows blank page
- [ ] Check browser console for JavaScript errors
- [ ] Verify VITE_API_URL is set correctly
- [ ] Check if backend URL is accessible
- [ ] Try clearing browser cache

### Timeout/Slow performance
- [ ] Check if backend is on free tier (may sleep if inactive)
- [ ] Verify MongoDB is not timing out
- [ ] Check for slow API calls in browser DevTools
- [ ] Consider upgrading to paid tier if traffic grows

---

## Monitoring After Deployment

### Daily/Weekly
- [ ] Check error logs in Render/Vercel
- [ ] Test critical payment flow
- [ ] Monitor API response times
- [ ] Check browser console for errors from users

### Database
- [ ] Monitor MongoDB storage usage
- [ ] Check for slow queries
- [ ] Back up important data periodically

### Security
- [ ] Ensure all secrets are in environment variables
- [ ] Check for exposed credentials in logs
- [ ] Update dependencies for security patches
- [ ] Monitor for failed payment attempts

---

## Need Help?

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Razorpay Test Cards:** https://razorpay.com/docs/payments/payment-gateway/test-card-details/
- **Backend Logs:** Check Render dashboard → Logs
- **Frontend Logs:** Check Vercel dashboard → Logs or browser F12

---

## Final Notes

✅ Your app is fully configured for production  
✅ Deployment guides are provided (see DEPLOYMENT_GUIDE.md and QUICK_START.md)  
✅ All environment variables are documented  
✅ Ready to go live!

Good luck! 🚀
