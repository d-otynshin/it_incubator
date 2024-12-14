import type { Request, Response } from 'express';
import { usersRepository } from '../../users/users-repository';
import { mapId } from '../../helpers/mapId';
import { mapUser } from '../../helpers/mapUser';

export const getMeController = async (
  req: Request,
  res: Response
) => {
  //@ts-ignore
  const userId = req.user.id as string;

  if (!userId) return res.status(401).send();

  const me = await usersRepository.getById(userId);

  if (!me) return res.status(401).send({ error: 'no such user' });

  return res.status(200).send(mapUser(mapId(me)));
}
