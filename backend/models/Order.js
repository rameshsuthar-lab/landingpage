import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  razorpayOrderId: { type: String, unique: true, sparse: true },
  razorpayPaymentId: String,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  deliveryStatus: { type: String, enum: ['pending', 'sent', 'downloaded'], default: 'pending' },
  emailStatus: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  downloadTokenHash: String,
  downloadExpiresAt: Date,
  paidAt: Date,
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
