import { db } from '../db/monogo-db';

const sessionsCollection = db.collection('sessions');

export const securityRepository = {
  getById: async (id: string) => {
    try {
      return sessionsCollection.find({ userId: id }).toArray();
    } catch (error) {
      return null;
    }
  },
  terminateSessions: async (deviceId: string) => {
    try {
      return sessionsCollection.deleteMany({ deviceId: { $ne: deviceId } });
    } catch (error) {
      return null;
    }
  },
  terminateSessionById: async (id: string) => {
    try {
      return sessionsCollection.deleteOne({ deviceId: { $ne: id } });
    } catch (error) {
      return null;
    }
  },
  updateSession: async (deviceId: string, iat: number) => {
    try {
      return sessionsCollection.updateOne({ deviceId }, { $set: { iat } });
    } catch (error) {
      return null;
    }
  },
  createSession: async (session: any) => {
    try {
      return sessionsCollection.insertOne(session);
    } catch (error) {
      return null;
    }
  }
}
