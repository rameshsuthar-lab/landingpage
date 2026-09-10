import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' })

export async function createPaymentOrder(customer) {
  const { data } = await api.post('/payment/create-order', { ...customer, productId: 'ai-productivity-guide' })
  return data
}

export async function verifyPayment(payment) {
  const { data } = await api.post('/payment/verify', payment)
  return data
}

export function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Razorpay Checkout could not be loaded.'))
    document.body.appendChild(script)
  })
}
