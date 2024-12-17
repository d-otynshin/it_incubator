import { Request, Response } from 'express';
import { securityService } from '../security-service';

export const terminateSessionByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const isDeleted = await securityService.terminateSession(id);

  return isDeleted
    ? res.status(204).send()
    : res.status(404).json({ error: 'Could not terminate sessions' });
}
