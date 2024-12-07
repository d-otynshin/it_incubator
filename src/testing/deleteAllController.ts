import { Request, Response } from 'express';
import { db } from '../db/monogo-db';

export const deleteAllController = async (
  _: Request,
  response: Response
) => {
  const postsCollection = db.collection('posts');
  const blogsCollection = db.collection('blogs');
  const usersCollection = db.collection('users');

  await Promise.all([
    blogsCollection.deleteMany(),
    postsCollection.deleteMany(),
    usersCollection.deleteMany()
  ])

  return response.status(204).send({})
}
