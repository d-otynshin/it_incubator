import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../../../adapters/jwt-service';
import { securityService } from '../security-service';

export const permissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: deviceId } = req.params;
  if (!deviceId) {
    return res.status(400).json({ error: 'Missing required deviceId' });
  }

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Missing refresh token' });
  }

  const decodedToken = await jwtService.verifyToken(refreshToken, 'REFRESH');
  if (!decodedToken) {
    return res.status(401).json({ error: 'Refresh token invalid' });
  }

  const { userId } = decodedToken;

  const session = await securityService.getById(deviceId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const { userId: sessionUserId } = session;

  if (userId !== sessionUserId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next()

  return
}
