import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import crypto from 'node:crypto'
import { connectDatabase } from './config/db.js'
import { product } from './config/product.js'
import Order from './models/Order.js'
import paymentRoutes from './routes/payment.routes.js'
import { hashDownloadToken, getProductStream } from './services/delivery.service.js'

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) })

const app = express()
app.use(helmet())
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean)
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }))
app.use(express.json({ limit: '20kb' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: true }))

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'fieldnote-api' }))
app.get('/api/product/:id', (req, res) => req.params.id === product.id ? res.json({ id: product.id, name: product.name, amount: product.price, currency: product.currency }) : res.status(404).json({ message: 'Product not found.' }))
app.use('/api/payment', paymentRoutes)
app.get('/api/order/:orderId', async (req, res, next) => { try { const order = await Order.findOne({ $or: [{ _id: req.params.orderId }, { orderNumber: req.params.orderId }] }).select('orderNumber productName amount currency paymentStatus deliveryStatus paidAt'); if (!order) return res.status(404).json({ message: 'Order not found.' }); res.json(order) } catch (error) { next(error) } })
app.get('/api/download/:token', async (req, res, next) => { try { const tokenHash = hashDownloadToken(req.params.token); const order = await Order.findOne({ downloadTokenHash: tokenHash, paymentStatus: 'paid', downloadExpiresAt: { $gt: new Date() } }); if (!order) return res.status(404).json({ message: 'Download link is invalid or expired.' }); const stream = getProductStream(); if (!stream) return res.status(404).json({ message: 'Product file is unavailable.' }); res.setHeader('Content-Type', 'application/pdf'); res.setHeader('Content-Disposition', 'attachment; filename="ai-productivity-mastery-guide.pdf"'); stream.pipe(res); order.deliveryStatus = 'downloaded'; await order.save() } catch (error) { next(error) } })
app.use((error, _req, res, _next) => { console.error(error); res.status(error.status || 500).json({ message: 'Something went wrong. Please try again.' }) })

const port = process.env.PORT || 5000
connectDatabase().then(() => {
	app.listen(port, () => console.log(`MongoDB connected. Fieldnote API listening on ${port}`))
}).catch((error) => {
	console.warn(`MongoDB unavailable: ${error.message}`)
	console.warn('API started without database persistence. Replace MONGO_URI in backend/.env to enable orders and downloads.')
	app.listen(port, () => console.log(`Fieldnote API listening on ${port} (database disabled)`))
})

export default app
