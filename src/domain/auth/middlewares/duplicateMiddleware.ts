import { NextFunction, Request, Response } from 'express';
import { usersRepository } from '../../users/users.repository';

export const checkEmailDuplicationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await usersRepository.findOne(email);

  if (user) {
    res.status(400).json({ errorsMessages: [{ field: 'email', message: 'user already exists' }] });

    return
  }

  next()
}

export const checkLoginDuplicationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login } = req.body;
  const user = await usersRepository.findOne(login);

  if (user) {
    res.status(400).json({ errorsMessages: [{ field: 'login', message: 'user already exists' }] });

    return
  }

  next()
}
