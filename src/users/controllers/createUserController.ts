import { Request, Response } from 'express';
import { usersService } from '../users-service';

export const createUserController = async (
  req: Request,
  res: Response
) => {
  const { login, email, password } = req.body;
  const user = await usersService.create({ login, email, password });

  return user ? res.status(200).json({}) : res.status(400).json();
}