import { Request, Response } from 'express';
import { jwtService } from '../../../adapters/jwt-service';
import { securityService } from '../../security/security-service';
import { authService } from '../auth-service';

export const logoutController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;

  const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
  if (!decodedToken) {
    return res.status(401).json({ error: 'Could not verify refresh token' });
  }

  const { deviceId } = decodedToken;

  const isValid = await securityService.isValid(token);
  if (!isValid) {
    return res.status(401).json({ error: 'Could not verify refresh token' });
  }

  const isTerminated = await securityService.terminateSession(deviceId)

  return isTerminated
    ? res.status(204).send()
    : res.status(401).send({ error: 'Could not set invalid token' });
}
