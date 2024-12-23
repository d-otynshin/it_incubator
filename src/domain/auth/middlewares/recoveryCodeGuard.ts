import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../../../adapters/jwt-service';
import { usersRepository } from '../../users/users.repository';

export const recoveryCodeGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { recoveryCode } = req.body;

  const isExpired = await jwtService.isExpired(recoveryCode, 'SECRET');
  if (isExpired) {
    return res.status(401).json({ error: 'Token expired' });
  }

  const decodedRecoveryToken = await jwtService.verifyToken(recoveryCode, 'SECRET');
  if (!decodedRecoveryToken) {
    return res.status(400).json({ errorsMessages: [{ field: 'recoveryCode', message: 'recoveryCode is invalid' }] });
  }

  const { login } = decodedRecoveryToken;

  const user = await usersRepository.findOne(login);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const { emailConfirmation: { code } } = user;
  if (code !== recoveryCode) {
    return res.status(400).json({ errorsMessages: [{ field: 'recoveryCode', message: 'recoveryCode is invalid' }] });
  }

  next()

  return
}
