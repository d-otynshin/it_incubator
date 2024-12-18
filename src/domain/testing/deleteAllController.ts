import { Request, Response } from 'express';
import { db } from '../../db/monogo-db';

export const deleteAllController = async (
  _: Request,
  response: Response
) => {
  const collections = await db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  return response.status(204).send({})
}
