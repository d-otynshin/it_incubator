import { db } from '../db/monogo-db';

const tenSecondsAgo = new Date(Date.now() - 10000)

const limitersCollection = db.collection('limiters');

export const crateLimiterRepository = {
  set: async (ip: string, url: string, date: Date) => {
    return limitersCollection.insertOne({ ip, url, date });
  },
  get: async (ip: string, url: string) => {
    return limitersCollection.find({ ip, url, date: { $gte: tenSecondsAgo } }).toArray();
  }
}
