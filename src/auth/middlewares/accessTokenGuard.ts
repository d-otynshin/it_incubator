import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../adapters/jwt-service';
import { usersRepository } from '../../users/users-repository';
import { isBefore } from 'date-fns';

export const accessTokenGuard = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) {
    return response.status(401).json({ error: 'No authorization header' });
  }

  const [authType, token] = request.headers.authorization.split(' ');

  if (authType !== 'Bearer') {
    return response.status(401).json({ error: 'Wrong authorization type' });
  }

  const jwtPayload = await jwtService.verifyToken(token);

  if (jwtPayload) {
    const { userId, exp } = jwtPayload;
    const user = await usersRepository.getById(userId);

    const isExpired = isBefore(exp * 1000, Date.now());

    if (isExpired) {
      return response.status(401).json({ error: 'Token is expired' });
    }

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
