import { Request, Response } from 'express';
import { jwtService } from '../../adapters/jwt-service';
import { authRepository } from '../auth-repository';

export const logoutController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({})

  const decodedToken = await jwtService.decodeToken(token);
  if (!decodedToken) return res.status(401).json({});

  const isSetInvalidToken = await authRepository.setInvalidToken(token);

  return isSetInvalidToken
    ? res.status(204).send()
    : res.status(401).send()
}
