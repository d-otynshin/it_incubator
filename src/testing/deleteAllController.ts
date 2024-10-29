import { Request, Response } from 'express';
import { db } from '../db/monogo-db';

export const deleteAllController = async (
  _: Request,
  response: Response
) => {
  const postsCollection = db.collection('posts');
  const blogsCollection = db.collection('blogs');

  await Promise.all([blogsCollection.deleteMany(), postsCollection.deleteMany()])

  return response.status(204).send({})
}
