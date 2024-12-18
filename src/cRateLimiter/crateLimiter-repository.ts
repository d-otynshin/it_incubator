import { db } from '../db/monogo-db';
import { sub } from 'date-fns/sub';

const tenSecondsAgo = sub(new Date(), { seconds: 10 });

const limitersCollection = db.collection('limiters');

export const crateLimiterRepository = {
  set: async (ip: string, url: string, date: Date) => {
    return limitersCollection.insertOne({ ip, url, date });
  },
  get: async (ip: string, url: string) => {
    return limitersCollection.find({ ip, url, date: { $gte: tenSecondsAgo } }).toArray();
  }
}
