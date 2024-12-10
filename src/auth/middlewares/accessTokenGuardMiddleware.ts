import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../adapters/jwt-service';
import { usersRepository } from '../../users/users-repository';

export const accessTokenGuardMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) return response.status(401).send();

  const [authType, token] = request.headers.authorization.split(' ')[1];

  if (authType !== 'Bearer') return response.status(401).send();

  const jwtPayload = await jwtService.verifyToken(token);

  if (jwtPayload) {
    const user = await usersRepository.getById(jwtPayload.userId);

    if (!user) return response.status(401).send();
    // @ts-ignore
    const { id, login } = user;

    // check global declaration
    // @ts-ignore
    request.user = { id, login };
    return next();
  }
  return response.status(401).send();

}
