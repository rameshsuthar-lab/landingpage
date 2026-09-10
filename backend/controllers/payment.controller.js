import crypto from 'node:crypto'
import Order from '../models/Order.js'
import { product } from '../config/product.js'
import { createRazorpayOrder } from '../services/razorpay.service.js'
import { createDownloadToken } from '../services/delivery.service.js'
import { verifyPaymentSignature, verifyWebhookSignature } from '../utils/verifySignature.js'

const clean = (value, max = 120) => String(value || '').trim().slice(0, max)

export async function createOrder(req, res, next) {
  try {
    const name = clean(req.body.name); const email = clean(req.body.email, 200).toLowerCase(); const phone = clean(req.body.phone)
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) return res.status(400).json({ message: 'Enter a valid name, email, and Indian phone number.' })
    const orderNumber = `FN-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`
    if (process.env.PAYMENT_MODE !== 'razorpay') return res.status(200).json({ demo: true, orderNumber, productName: product.name, amount: product.price, currency: product.currency, message: 'Demo order created. Set PAYMENT_MODE=razorpay to open Razorpay test checkout.' })
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return res.status(503).json({ message: 'Razorpay is not configured. Add test credentials to backend/.env or enable DEMO_MODE=true for local testing.' })
    const razorpayOrder = await createRazorpayOrder(product.price, product.currency, orderNumber)
    const order = await Order.create({ orderNumber, name, email, phone, productId: product.id, productName: product.name, amount: product.price, currency: product.currency, razorpayOrderId: razorpayOrder.id })
    res.status(201).json({ orderId: order._id, orderNumber, razorpayOrderId: razorpayOrder.id, amount: product.price, currency: product.currency, razorpayKeyId: process.env.RAZORPAY_KEY_ID })
  } catch (error) { next(error) }
}

export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, razorpay_signature: signature } = req.body
    const order = await Order.findOne({ razorpayOrderId })
    if (!order) return res.status(404).json({ message: 'Order not found.' })
    if (!verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, signature)) return res.status(400).json({ message: 'Payment verification failed.' })
    if (order.paymentStatus !== 'paid') { const token = createDownloadToken(); order.paymentStatus = 'paid'; order.razorpayPaymentId = razorpayPaymentId; order.paidAt = new Date(); order.downloadTokenHash = token.hash; order.downloadExpiresAt = token.expires; await order.save(); return res.json({ success: true, orderNumber: order.orderNumber, productName: order.productName, amount: order.amount, downloadToken: token.raw }) }
    res.json({ success: true, orderNumber: order.orderNumber, productName: order.productName, amount: order.amount })
  } catch (error) { next(error) }
}

export async function webhook(req, res, next) {
  try {
    if (!verifyWebhookSignature(req.body, req.headers['x-razorpay-signature'])) return res.status(400).json({ message: 'Invalid webhook signature.' })
    const payload = JSON.parse(req.body.toString('utf8')); const event = payload.event; const payment = payload.payload?.payment?.entity; const razorpayOrderId = payment?.order_id
    if (!razorpayOrderId) return res.json({ received: true })
    const order = await Order.findOne({ razorpayOrderId }); if (!order) return res.json({ received: true })
    if (['order.paid', 'payment.captured'].includes(event) && order.paymentStatus !== 'paid') { const token = createDownloadToken(); order.paymentStatus = 'paid'; order.razorpayPaymentId = payment.id; order.paidAt = new Date(); order.downloadTokenHash = token.hash; order.downloadExpiresAt = token.expires; await order.save() }
    if (event === 'payment.failed' && order.paymentStatus === 'pending') { order.paymentStatus = 'failed'; await order.save() }
    res.json({ received: true })
  } catch (error) { next(error) }
}
