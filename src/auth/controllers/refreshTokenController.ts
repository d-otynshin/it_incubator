import { Request, Response } from 'express';
import { authService, EXPIRATION_TIME } from '../auth-service';

export const refreshTokenController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;

  const refreshTokenResponse = await authService.refreshToken(token);
  if (!refreshTokenResponse) return res.status(401).json({})

  const { accessToken, refreshToken } = refreshTokenResponse;

  const cookieConfig = {
    httpOnly: true,
    secure: true,
    maxAge: EXPIRATION_TIME.REFRESH
  }

  res.cookie('refreshToken', refreshToken, cookieConfig)
  res.status(200).json({ accessToken })

  return;
}
