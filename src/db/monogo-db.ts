import { Db, MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

console.log('MONGO_DB_URI', MONGO_DB_URI);

const client: MongoClient = new MongoClient(MONGO_DB_URI)
export const db: Db = client.db('blogger_platform');

export const connectToDB = async () => {
  try {
    await client.connect()
    console.log('connected to db')

    return true
  } catch (e) {
    console.log(e)
    await client.close()
    return false
  }
}
