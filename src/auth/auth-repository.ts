import { db } from '../db/monogo-db';

const invalidTokensCollection = db.collection('invalid_tokens');
const validTokensCollection = db.collection('invalid_tokens');

export const authRepository = {
  getInvalidToken: async (token: string) => {
    return invalidTokensCollection.findOne({ token });
  },
  setInvalidToken: async (token: string) => {
    try {
      await invalidTokensCollection.insertOne({ token });

      return true;
    } catch (error) {
      return null;
    }
  },
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
