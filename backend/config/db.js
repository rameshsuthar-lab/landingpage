import mongoose from 'mongoose'

export async function connectDatabase() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing. Create backend/.env and add your MongoDB Atlas connection string.')
  if (process.env.MONGO_URI.includes('CLUSTER.mongodb.net') || process.env.MONGO_URI.includes('USERNAME:PASSWORD')) {
    throw new Error('MONGO_URI still contains the example placeholder. Copy the real MongoDB Atlas connection string into backend/.env.')
  }
  await mongoose.connect(process.env.MONGO_URI)
  return true
}
