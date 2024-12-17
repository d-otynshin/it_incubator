import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../../adapters/jwt-service';

export const permissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing required id' });
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

  if (userId !== id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next()

  return
}
