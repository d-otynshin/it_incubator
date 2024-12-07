import { Request, Response } from 'express';
import { usersRepository } from '../users-repository';

export const getUsersController = async (
  req: Request,
  res: Response,
) => {
  const { query } = req;
  const users = await usersRepository.get(query);

  return users ? res.status(200).json(users) : res.status(401).send()
}
