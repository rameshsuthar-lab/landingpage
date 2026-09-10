# Fieldnote digital product

A premium React/Vite product landing page with a separate Express API boundary for Razorpay orders, payment verification, MongoDB order storage, and expiring download tokens.

## 🚀 Deployment to Live Server

This project is ready to deploy to free servers! Full deployment guides are included:

- **Quick Start:** See [QUICK_START.md](QUICK_START.md) for a 5-minute deployment summary
- **Detailed Guide:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions
- **Checklist:** Use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) before deploying
- **Commands:** See [COMMANDS.md](COMMANDS.md) for useful CLI commands

### Recommended Free Hosting
- **Backend:** Render.com (Node.js)
- **Frontend:** Vercel (React/Vite)  
- **Database:** MongoDB Atlas (NoSQL)

[Read QUICK_START.md to get started in 5 minutes →](QUICK_START.md)

---

## Run locally

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Backend:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:5000`.

## Production configuration

Fill `backend/.env` with MongoDB Atlas, Razorpay test credentials, webhook secret, mail transport, and the path to the private PDF. The paid file must remain outside `frontend/public` and `backend/.gitignore` excludes `private-product/`.

The backend determines the product price from `backend/config/product.js`; it never trusts a price or product name from the browser. Razorpay secret operations and signature verification stay server-side. Configure `VITE_API_URL` only when the API is deployed away from localhost.

---

## File Structure

```
├── frontend/              # React + Vite web app
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.production   # Use for production API URL
│
├── backend/              # Express.js API server
│   ├── server.js         # Main server file
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   ├── package.json
│   └── .env              # Local development
│
├── QUICK_START.md        # 5-minute deployment
├── DEPLOYMENT_GUIDE.md   # Detailed guide
├── DEPLOYMENT_CHECKLIST.md # Pre-deployment checklist
└── COMMANDS.md           # Useful commands
```

---

## Key Features

- ✅ Razorpay payment integration
- ✅ MongoDB order storage
- ✅ Automatic download link expiration
- ✅ Server-side security (no price tampering)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Production-ready code
- ✅ Ready for live deployment

---

## Environment Variables

### Backend (backend/.env)
```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/fieldnote
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URLS=https://your-frontend-url.com
```

### Frontend (frontend/.env.production)
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## Next Steps

1. **Local Testing:** Follow "Run locally" section above
2. **Deploy:** Follow [QUICK_START.md](QUICK_START.md)
3. **Monitor:** Check logs in Render and Vercel dashboards
4. **Add Domain:** Connect custom domain (optional)
5. **Scale:** Upgrade to paid plans as needed

---

For issues or questions, check [COMMANDS.md](COMMANDS.md) for troubleshooting tips.

## Current routes

- `/` product landing page
- `/checkout` customer details and order creation surface
- `GET /api/health` API health
- `GET /api/product/:id` trusted product metadata
- `POST /api/payment/create-order` server-priced Razorpay order creation
- `POST /api/payment/verify` HMAC payment verification
- `POST /api/payment/webhook` raw-body webhook verification and idempotent status updates
- `GET /api/download/:token` paid, expiring PDF stream
