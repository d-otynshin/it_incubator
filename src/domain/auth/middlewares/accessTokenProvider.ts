import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../../infrastructure/adapters/jwt-service';
import { usersRepository } from '../../users/users.repository';
import { isBefore } from 'date-fns';

export const accessTokenProvider = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) {
    next();
    return;
  }

  const [authType, accessToken] = request.headers.authorization.split(' ');

  if (authType !== 'Bearer') {
    next()
    return;
  }

  const tokenPayload = await jwtService.verifyToken(accessToken, 'SECRET');
  if (!tokenPayload) {
    next()
    return;
  }

  const { userId, exp } = tokenPayload;
  const user = await usersRepository.getById(userId);

  const isExpired = isBefore(exp * 1000, Date.now());
  if (isExpired) {
    next()
    return;
  }

  if (!user) {
    next()
    return
  }
  const { id, login } = user;

  request.user = { id, login };
  return next();
}
