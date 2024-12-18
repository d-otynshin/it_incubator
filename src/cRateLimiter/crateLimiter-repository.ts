import { db } from '../db/monogo-db';

const limitersCollection = db.collection('limiters');

export const crateLimiterRepository = {
  set: async (ip: string, url: string, date: Date, logs: number) => {
    return limitersCollection.insertOne({ ip, url, date, logs });
  },
  get: async (ip: string, url: string) => {
    return limitersCollection.find({ ip, url }).toArray();
  }
}
