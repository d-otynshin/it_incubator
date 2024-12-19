import { Request, Response } from 'express';
import { authService } from '../auth-service';

export const passwordRecoveryController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  await authService.passwordRecovery(email);

  return res.status(204).send()
}
