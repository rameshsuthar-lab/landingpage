# Quick Start Deployment (5 Minutes)

## TL;DR - Fastest Way to Deploy

### 1. MongoDB Setup (2 min)
- Go to https://www.mongodb.com/cloud/atlas
- Create free account → Create cluster
- Get connection string

### 2. Razorpay Setup (1 min)
- If you don't have account: https://razorpay.com
- Get API keys from dashboard

### 3. Backend to Render (1 min)
```
1. Go to https://render.com
2. Click "New Web Service"
3. Connect GitHub repo
4. Set Start Command: npm start
5. Root Directory: backend
6. Add env vars:
   - MONGO_URI = your_mongodb_url
   - RAZORPAY_KEY_ID = your_id
   - RAZORPAY_KEY_SECRET = your_secret
   - FRONTEND_URLS = (add after frontend deployed)
7. Deploy
8. Wait 5-10 min, copy backend URL
```

### 4. Update Frontend (1 min)
- Edit `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url-from-step-3.onrender.com/api
```

### 5. Frontend to Vercel (1 min)
```
1. Go to https://vercel.com
2. Click "Add Project"
3. Import GitHub repo
4. Framework: Vite
5. Root Directory: frontend
6. Add env var:
   - VITE_API_URL = your backend URL/api
7. Deploy
```

### 6. Final Backend Update
- Go back to Render backend settings
- Update FRONTEND_URLS to your Vercel URL
- Redeploy

---

## Done! ✅

Your app is now live and working together!

**Backend:** https://your-backend-url.onrender.com  
**Frontend:** 0

Test it by opening frontend URL and trying payment flow.

---

## Having Issues?

**Backend not working?**
- Check Render logs
- Verify MongoDB connection string

**Frontend can't reach backend?**
- Check browser console (F12)
- Verify VITE_API_BASE_URL is correct

**Payment failing?**
- Verify Razorpay keys are correct
- Check backend environment variables
