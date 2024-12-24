import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export const connectToDb = async (connectionUrl: string): Promise<void> => {
  try {
    await mongoose.connect(connectionUrl);
    console.log('connected to db')
  } catch (e) {
    console.log('db connection error:', e)
    await mongoose.disconnect();
  }
}
