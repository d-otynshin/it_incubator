import { Request, Response } from 'express';
import { authService } from '../auth-service';

export const refreshTokenController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({})

  const refreshTokenResponse = await authService.refreshToken(token);
  if (!refreshTokenResponse) return res.status(401).json({})

  const { accessToken, refreshToken } = refreshTokenResponse;

  res.cookie('refresh', refreshToken, { httpOnly: true, secure: true })
  res.status(200).json({ accessToken })

  return;
}
