import { db } from '../db/monogo-db';

const sessisonsCollection = db.collection('sessions');

export const securityRepository = {
  getById: async (id: string) => {
    try {
      return sessisonsCollection.find({ userId: id });
    } catch (error) {
      return null;
    }
  },
  terminateSessions: async (deviceId: string) => {
    try {
      return sessisonsCollection.deleteMany({ deviceId: { $ne: deviceId } });
    } catch (error) {
      return null;
    }
  },
  terminateSessionById: async (id: string) => {
    try {
      return sessisonsCollection.deleteOne({ id: { $ne: id } });
    } catch (error) {
      return null;
    }
  }
}
