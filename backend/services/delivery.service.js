import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { product } from '../config/product.js'

export function createDownloadToken() {
  const raw = crypto.randomBytes(32).toString('hex')
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  const expires = new Date(Date.now() + Number(process.env.DOWNLOAD_TTL_HOURS || 48) * 60 * 60 * 1000)
  return { raw, hash, expires }
}

export function hashDownloadToken(token) { return crypto.createHash('sha256').update(token).digest('hex') }

export function getProductStream() {
  const filePath = path.resolve(product.filePath)
  if (!fs.existsSync(filePath)) return null
  return fs.createReadStream(filePath)
}
