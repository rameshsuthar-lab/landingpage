import crypto from 'node:crypto'

export function verifyPaymentSignature(orderId, paymentId, signature) {
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex')
  const actual = Buffer.from(signature || '')
  return actual.length === expected.length && crypto.timingSafeEqual(Buffer.from(expected), actual)
}

export function verifyWebhookSignature(rawBody, signature) {
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest('hex')
  const actual = Buffer.from(signature || '')
  return actual.length === expected.length && crypto.timingSafeEqual(Buffer.from(expected), actual)
}
