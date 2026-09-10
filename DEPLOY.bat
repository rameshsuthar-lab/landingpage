@echo off
REM Deployment Guide - Windows PowerShell Version

echo.
echo ==========================================
echo   FIELDNOTE APP - DEPLOYMENT GUIDE
echo ==========================================
echo.

echo Step 1: PUSH CODE TO GITHUB
echo ============================
echo.
echo Your code is ready to push! Follow these steps:
echo.
echo 1. Open browser and go to: https://github.com/new
echo 2. Create new repository named "fieldnote-app"
echo 3. DON'T check "Initialize with README"
echo 4. Click "Create Repository"
echo 5. Run these commands in PowerShell:
echo.
echo     git remote add origin https://github.com/YOUR_USERNAME/fieldnote-app.git
echo     git branch -M main
echo     git push -u origin main
echo.
echo After pushing, continue to Step 2...
echo.
pause

echo.
echo Step 2: DEPLOY BACKEND TO RENDER.COM
echo ===================================== 
echo.
echo 1. Go to: https://render.com
echo 2. Click "New Web Service"
echo 3. Connect your GitHub account
echo 4. Select "fieldnote-app" repository
echo.
echo Configuration:
echo   - Name: fieldnote-backend
echo   - Environment: Node
echo   - Build Command: npm install
echo   - Start Command: npm start
echo   - Root Directory: backend
echo   - Plan: Free
echo.
echo Environment Variables (click "Add"):
echo   - NODE_ENV = production
echo   - PORT = 5000
echo   - MONGO_URI = (get from MongoDB Atlas)
echo   - RAZORPAY_KEY_ID = (get from Razorpay)
echo   - RAZORPAY_KEY_SECRET = (get from Razorpay)
echo   - FRONTEND_URLS = (add after Vercel deployment)
echo.
echo 5. Click "Deploy"
echo 6. Wait 5-10 minutes for deployment
echo 7. Copy your backend URL when ready
echo.
echo Note: You need MongoDB Atlas and Razorpay accounts first!
echo   - MongoDB: https://www.mongodb.com/cloud/atlas
echo   - Razorpay: https://razorpay.com
echo.
pause

echo.
echo Step 3: DEPLOY FRONTEND TO VERCEL
echo ==================================
echo.
echo 1. Go to: https://vercel.com
echo 2. Click "Add New" then "Project"
echo 3. Select "fieldnote-app" repository
echo.
echo Configuration:
echo   - Framework: Vite
echo   - Root Directory: frontend
echo   - Build Command: npm run build
echo   - Output Directory: dist
echo.
echo Environment Variable:
echo   - VITE_API_URL = (your Render backend URL)/api
echo   Example: https://fieldnote-backend.onrender.com/api
echo.
echo 4. Click "Deploy"
echo 5. Wait 2-5 minutes
echo 6. Copy your frontend URL
echo.
pause

echo.
echo Step 4: UPDATE BACKEND CORS SETTINGS
echo ====================================
echo.
echo 1. Go back to Render.com
echo 2. Click your backend service
echo 3. Go to "Environment" tab
echo 4. Find FRONTEND_URLS variable
echo 5. Update it to: (your Vercel frontend URL)
echo 6. Click "Manual Deploy"
echo.
pause

echo.
echo ==========================================
echo   DEPLOYMENT COMPLETE! Your app is LIVE!
echo ==========================================
echo.
echo Frontend URL: https://your-app.vercel.app
echo Backend URL: https://your-app.onrender.com
echo.
echo Test it by opening frontend URL and trying payment!
echo.
echo Having issues?
echo   - Check backend logs in Render dashboard
echo   - Check browser console (F12) for errors
echo   - Check Vercel deployment logs
echo.
pause
