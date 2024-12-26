import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('connected to db')
  } catch (error) {
    console.log(error);
    await mongoose.disconnect();
  }
}
