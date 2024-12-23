import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const dbName: string = 'blogger_platform'
const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export const connectToDB = async (): Promise<boolean> => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('connected to db')

    return true
  } catch (e) {
    console.log('db connection error:', e)
    await mongoose.disconnect();

    return false
  }
}
