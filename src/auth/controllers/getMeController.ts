import type { Request, Response } from 'express';
import { usersRepository } from '../../users/users-repository';

export const getMeController = async (
  req: Request,
  res: Response
) => {
  //@ts-ignore
  const userId = req.user.id as string;

  if (!userId) return res.status(401).send();

  const me = await usersRepository.getById(userId);

  return res.status(200).send(me);
}
