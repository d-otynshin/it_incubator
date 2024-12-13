import type { Request, Response } from "express";
import { usersRepository } from '../../users/users-repository';
import { mapId } from '../../helpers/mapId';
import { jwtService } from '../../adapters/jwt-service';

export const getMeController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({})

  const decodedToken = await jwtService.decodeToken(token);
  if (!decodedToken) return res.status(401).json({});

  const { login } = decodedToken;
  if (!login) return res.status(401).json({});

  const me = await usersRepository.findOne(login);
  if (!me) return res.status(404).send({ error: 'No such user' });

  return res.status(200).send(mapId(me));
}
