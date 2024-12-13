import { Request, Response } from 'express';
import { authService } from '../auth-service';

export const refreshTokenController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({})

  const refreshTokenResponse = await authService.refreshToken(token);
  if (!refreshTokenResponse) return res.status(401).json({})

  const { accessToken, refreshToken } = refreshTokenResponse;

  const maxAge = 24 * 60 * 60 * 1000;

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge })
  res.status(200).json({ accessToken })

  return;
}
