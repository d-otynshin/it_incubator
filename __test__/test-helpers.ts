import { app } from '../src/app'
import { agent } from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Db, MongoClient } from 'mongodb';

let mongoServer: MongoMemoryServer;
let client: MongoClient;
let db: Db;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  client = new MongoClient(uri);
  await client.connect();

  db = client.db();

  return { client, db };
};

export const closeDatabase = async () => {
  await client.close();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const collections = await db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
};

export const request = agent(app)
