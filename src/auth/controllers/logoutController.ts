import { Request, Response } from 'express';
import { jwtService } from '../../adapters/jwt-service';
import { authRepository } from '../auth-repository';

export const logoutController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;

  const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
  if (!decodedToken) return res.status(401).json({ error: 'Could not verify refresh token' });

  const isSetInvalidToken = await authRepository.setInvalidToken(token);

  return isSetInvalidToken
    ? res.status(204).send()
    : res.status(401).send({ error: 'Could not set invalid token' });
}
