import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../adapters/jwt-service';
import { usersRepository } from '../../users/users-repository';

export const accessTokenGuardMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) return response.status(401).json({ error: 'No authorization header' });

  const [authType, token] = request.headers.authorization.split(' ');

  if (authType !== 'Bearer') return response.status(401).json({ error: 'Wrong authorization type' });

  const jwtPayload = await jwtService.verifyToken(token);

  if (jwtPayload) {
    const user = await usersRepository.getById(jwtPayload.userId);

    if (!user) return response.status(401).json({ error: 'No user with this token' });
    // @ts-ignore
    const { id, login } = user;

    // check global declaration
    // @ts-ignore
    request.user = { id, login };
    return next();
  }
  return response.status(401).json({ error: 'Wrong token' });

}
