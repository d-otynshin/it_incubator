import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../adapters/jwt-service';
import { authRepository } from '../auth-repository';

export const refreshTokenGuard = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const refreshToken = request.cookies.refreshToken;
  if (!refreshToken) {
    return response.status(401).json({ error: 'No refresh token provided' });
  }

  const isTokenExpired = await jwtService.isExpired(refreshToken);
  if (isTokenExpired) {
    return response.status(401).json({ error: 'Refresh token expired' });
  }

  const isTokenInvalid = await authRepository.getInvalidToken(refreshToken);
  if (isTokenInvalid) {
    return response.status(401).json({ error: 'Refresh token invalid' });
  }

  return next()
}
