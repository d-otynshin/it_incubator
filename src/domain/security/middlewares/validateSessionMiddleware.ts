import { NextFunction, Request, Response } from 'express';
import { securityService } from '../security-service';

export const validateSessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing required id' });
  }

  const refreshToken = req.cookies.refreshToken;

  const session = await securityService.getById(refreshToken)
  if (!session) {
    return res.status(404).json({ error: 'Refresh token not found' });
  }

  next()

  return
}
