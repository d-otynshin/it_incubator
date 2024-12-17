import { Request, Response } from 'express';
import { securityService } from '../security-service';

export const getSessionsController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;
  const sessions = securityService.getById(token);

  return Array.isArray(sessions)
    ? res.status(200).json(sessions)
    : res.status(401).send()
}
