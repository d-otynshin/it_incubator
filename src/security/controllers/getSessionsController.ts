import { Request, Response } from 'express';
import { securityService } from '../security-service';

export const getSessionsController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;
  const devices = securityService.getById(token);

  return Array.isArray(devices)
    ? res.status(200).json(devices)
    : res.status(401).send()
}
