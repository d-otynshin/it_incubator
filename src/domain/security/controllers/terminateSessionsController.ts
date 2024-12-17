import { Request, Response } from 'express';
import { securityService } from '../security-service';

export const terminateSessionsController = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;
  const isDeleted = await securityService.terminateSessions(token);

  return isDeleted
    ? res.status(204).send()
    : res.status(404).json({ error: 'Could not terminate sessions' });
}
