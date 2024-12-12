import { Request, Response } from 'express';
import { authService } from '../auth-service';

export const registerController = async (req: Request, res: Response) => {
  const { login, email, password } = req.body;

  const isCreated = await authService.registerUser(login, password, email);

  console.log(isCreated);

  return isCreated ? res.status(204).json() : res.status(400).json({ error: 'User was not created' });
}
