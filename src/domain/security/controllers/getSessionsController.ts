import { Request, Response } from 'express';
import { securityService } from '../security-service';
import { mapId } from '../../../helpers/mapId';
import { mapSession } from '../helpers/mapSession';

export const getSessionsController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;
  const sessions = await securityService.getByUserId(token);

  return Array.isArray(sessions)
    ? res.status(200).json(sessions.map(mapId).map(mapSession as any))
    : res.status(401).send({ error: 'Could not read sessions' });
}
