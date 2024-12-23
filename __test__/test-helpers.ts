import { app } from '../src/app'
import { agent } from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Db } from 'mongodb';
import { codedAuth, TValidLogin, validBlog, validPost, validUser } from './datasets';
import { SETTINGS } from '../src/settings';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;
let db: Db;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri)
};

export const closeDatabase = async () => {
  await mongoose.disconnect()
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

export const createUser = async () => {
  const createdUserResponse = await request
    .set({ 'Authorization': 'Basic ' + codedAuth })
    .post(SETTINGS.PATH.USERS)
    .send(validUser);

  expect(createdUserResponse.status).toBe(201);

  return createdUserResponse;
}

export const createLogin = async (validLogin: TValidLogin) => {
  const loginResponse = await request
    .post(`${SETTINGS.PATH.AUTH}/login`)
    .send(validLogin);

  expect(loginResponse.status).toBe(200);

  return loginResponse;
}

export const request = agent(app)
