import { Request, Response } from 'express';
import { authService } from '../auth-service';

export const resendEmailController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const isResent = await authService.resendEmail(email);

  return isResent
    ? res.status(204).json()
    : res.status(400).json({ errorsMessages: [{ field: 'email', message: 'Email is not resent' }] });
}
