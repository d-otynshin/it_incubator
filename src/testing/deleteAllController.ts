import { Request, Response } from 'express';
import { setDB } from '../db/db';

export const deleteAllController = (_: Request, response: Response) => {
  setDB({})

  return response.status(204).send({})
}
