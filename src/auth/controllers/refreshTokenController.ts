import { Request, Response } from 'express';
import { authService, EXPIRATION_TIME } from '../auth-service';
import { isBefore } from 'date-fns';
import { jwtService } from '../../adapters/jwt-service';

export const refreshTokenController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({})

  const isRefreshTokenExpired = await jwtService.isExpired(token);
  if (isRefreshTokenExpired) return res.status(401).json({ error: 'Refresh token expired' });

  const refreshTokenResponse = await authService.refreshToken(token);
  if (!refreshTokenResponse) return res.status(401).json({})

  const { accessToken, refreshToken } = refreshTokenResponse;

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: EXPIRATION_TIME.REFRESH })
  res.status(200).json({ accessToken })

  return;
}
