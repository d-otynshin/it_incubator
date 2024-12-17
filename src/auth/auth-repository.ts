import { db } from '../db/monogo-db';

const validTokensCollection = db.collection('valid_tokens');

export const authRepository = {
  getValidToken: async (userId: string) => {
    return validTokensCollection.findOne({ userId });
  },
  setValidToken: async (userId: string, token: string) => {
    try {
      await validTokensCollection.insertOne({ userId, token });

      return true;
    } catch (error) {
      return null;
    }
  }
}
