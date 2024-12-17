import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../adapters/jwt-service';
import { securityService } from '../domain/security/security-service';

export const refreshTokenGuard = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      return response.status(401).json({ error: 'No refresh token provided' });
    }

    const isTokenExpired = await jwtService.isExpired(refreshToken, 'REFRESH');
    if (isTokenExpired) {
      return response.status(401).json({ error: 'Refresh token expired' });
    }

    const isTokenInvalid = await securityService.isValid(refreshToken);
    if (!isTokenInvalid) {
      return response.status(401).json({ error: 'Refresh token invalid' });
    }

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Something wrong with token' });
  }
}
