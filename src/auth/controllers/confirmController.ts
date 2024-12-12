import { Request, Response } from 'express';
import { authService } from '../auth-service';

export const confirmController = async (req: Request, res: Response) => {
  const { code } = req.body;

  const isConfirmed = await authService.confirmEmail(code);

  return isConfirmed
    ? res.status(204).send()
    : res.status(400).json({ errorsMessages: [{ message: "email is not confirmed", field: "code" }] });
}
