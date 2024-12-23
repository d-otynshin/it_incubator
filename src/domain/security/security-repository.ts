import { SessionModel } from '../../db';

export const securityRepository = {
  getSessions: async (id: string) => {
    try {
      return SessionModel.find({ userId: id });
    } catch (error) {
      return null;
    }
  },
  getSession: async (id: string) => {
    try {
      return SessionModel.findOne({ deviceId: id });
    } catch (error) {
      return null;
    }
  },
  terminateSessions: async (deviceId: string) => {
    try {
      const result = await SessionModel.deleteMany({ deviceId: { $ne: deviceId } });

      return result.deletedCount > 0;
    } catch (error) {
      return null;
    }
  },
  terminateSessionById: async (id: string) => {
    try {
      const result = await SessionModel.deleteOne({ deviceId: id });

      return result.deletedCount === 1;
    } catch (error) {
      return null;
    }
  },
  updateSession: async (deviceId: string, iat: number) => {
    try {
      return SessionModel.updateOne({ deviceId }, { $set: { iat } });
    } catch (error) {
      return null;
    }
  },
  createSession: async (session: any) => {
    try {
      return SessionModel.insertMany([session]);
    } catch (error) {
      return null;
    }
  }
}
