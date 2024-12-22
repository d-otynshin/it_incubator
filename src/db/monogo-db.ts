import { Db, MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const dbName: string = 'blogger_platform'
const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const client: MongoClient = new MongoClient(MONGO_DB_URI)
export const db: Db = client.db(dbName);

export const connectToDB = async (): Promise<boolean> => {
  try {
    await client.connect() // remove
    await mongoose.connect(MONGO_DB_URI + '/' + dbName);
    console.log('connected to db')

    return true
  } catch (e) {
    console.log(e)
    await mongoose.disconnect();
    await client.close() // remove

    return false
  }
}
