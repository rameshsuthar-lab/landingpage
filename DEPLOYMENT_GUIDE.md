# Deployment Guide - Deploy Frontend & Backend to Live Server

## Overview
This guide will help you deploy your entire project (frontend + backend) to free servers that work together.

### Recommended Free Hosting:
- **Backend:** Render.com or Railway.app
- **Frontend:** Vercel or Netlify
- **Database:** MongoDB Atlas (free tier)

---

## Step 1: Set Up MongoDB Database (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)
4. In "Security" → "Database Access", create a new user
5. In "Security" → "Network Access", add IP `0.0.0.0/0` (allow all - for free tier)
6. Go to "Databases" and click "Connect"
7. Choose "Drivers" and copy the connection string
8. Replace `<username>` and `<password>` with your database user credentials
9. Save this URL - you'll need it later

Example: `mongodb+srv://user:password@cluster.mongodb.net/fieldnote?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend (Render.com - Recommended)

### 2A. Prepare Backend
1. Ensure your `backend/package.json` has correct "start" script:
   ```json
   "scripts": { "dev": "nodemon server.js", "start": "node server.js" }
   ```

2. Update `backend/server.js` to handle production environment

### 2B. Deploy to Render
1. Go to [Render.com](https://render.com/)
2. Sign up with GitHub account (or email)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name:** `fieldnote-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Choose closest to you
   - **Plan:** Free

6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGO_URI` = (paste your MongoDB connection string)
   - `RAZORPAY_KEY_ID` = (from Razorpay dashboard)
   - `RAZORPAY_KEY_SECRET` = (from Razorpay dashboard)
   - `FRONTEND_URLS` = (you'll update this after frontend deployment)

7. Click "Deploy" and wait 5-10 minutes
8. Once deployed, you'll get a URL like: `https://fieldnote-backend.onrender.com`
9. **Save this URL** - you need it for frontend configuration

---

## Step 3: Deploy Frontend (Vercel - Recommended)

### 3A. Prepare Frontend
1. Update `frontend/.env.production`:
   ```
   VITE_API_URL=https://fieldnote-backend.onrender.com/api
   ```
   (Replace with your actual backend URL from Step 2)

2. Ensure `frontend/vite.config.js` is correct (already looks good)

### 3B. Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Project Name:** `fieldnote-frontend` or your name
   - **Framework:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

6. Add Environment Variables:
   - `VITE_API_URL` = `https://fieldnote-backend.onrender.com/api`

7. Click "Deploy" and wait 2-5 minutes
8. Once deployed, you'll get a URL like: `https://fieldnote-frontend.vercel.app`
9. **Save this URL**

---

## Step 4: Update Backend CORS for Frontend URL

1. Go back to [Render.com](https://render.com/)
2. Click on your backend service: `fieldnote-backend`
3. Go to "Environment" tab
4. Update the `FRONTEND_URLS` variable:
   ```
   https://fieldnote-frontend.vercel.app,https://www.your-domain.com
   ```

5. Redeploy by clicking "Manual Deploy" or "Trigger Deploy"

---

## Step 5: Test Everything

1. Open your frontend URL in browser: `https://fieldnote-frontend.vercel.app`
2. Try the payment flow to ensure backend communication works
3. Check browser console for any errors
4. Check backend logs in Render dashboard

---

## Troubleshooting

### Backend not responding
- Check Render logs in dashboard
- Verify `FRONTEND_URLS` includes your frontend URL
- Verify MongoDB connection string is correct

### Frontend can't reach backend
- Check browser console for CORS errors
- Verify `VITE_API_BASE_URL` in .env.production
- Ensure backend URL is accessible

### Payment not working
- Verify Razorpay keys in backend environment variables
- Check Razorpay dashboard for API key status
- Verify CORS is allowing requests from frontend

---

## Custom Domain (Optional)

### For Backend (Render):
1. In Render dashboard, go to Settings
2. Add your domain
3. Follow DNS configuration steps

### For Frontend (Vercel):
1. In Vercel dashboard, go to Settings → Domains
2. Add your domain
3. Update DNS records as instructed

---

## Monitoring & Logs

- **Backend Logs:** Render dashboard → Logs tab
- **Frontend Logs:** Vercel dashboard → Deployments → Function Logs
- **Browser Logs:** Press F12 in browser → Console tab

---

## Alternative Hosting Options

### Backend Alternatives:
- **Railway.app** - Similar to Render, good free tier
- **Koyeb** - Great for Node.js apps, 2 free services
- **Heroku** - (No longer free, but similar workflow)

### Frontend Alternatives:
- **Netlify** - Similar to Vercel, drag-and-drop deployment
- **GitHub Pages** - For static sites (limited features)
- **Render** - Can host frontend too

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_url
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
FRONTEND_URLS=your_frontend_urls
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Set up monitoring/alerts
3. Configure custom domain
4. Set up automated deployments (usually auto in Vercel/Render)
5. Monitor error logs regularly
6. Back up your MongoDB data

---

## Getting Help

- **Render Support:** support.render.com
- **Vercel Support:** vercel.com/docs
- **MongoDB Atlas Help:** docs.atlas.mongodb.com
- **Your Project Issues:** Check backend/frontend logs first
