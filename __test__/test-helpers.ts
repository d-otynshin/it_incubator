import { app } from '../src/app'
import { agent } from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Db, MongoClient } from 'mongodb';
import { codedAuth, validBlog, validPost } from './datasets';
import { SETTINGS } from '../src/settings';

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

export const createBlog = async (expectedStatus = 201) => {
  const createBlogResponse = await request
    .set({ 'Authorization': 'Basic ' + codedAuth })
    .post(SETTINGS.PATH.BLOGS)
    .send(validBlog);

  expect(createBlogResponse.status).toBe(expectedStatus);

  return createBlogResponse;
}

export const createPost = async (blogId: string, expectedStatus = 201) => {
  const createPostResponse = await request
  .set({ 'Authorization': 'Basic ' + codedAuth })
  .post(SETTINGS.PATH.POSTS)
  .send({ blogId, ...validPost });

  expect(createPostResponse.status).toBe(expectedStatus);

  return createPostResponse;
}

export const request = agent(app)
