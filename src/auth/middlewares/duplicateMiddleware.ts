import { NextFunction, Request, Response } from 'express';
import { usersRepository } from '../../users/users-repository';

export const checkDuplicationMiddleware = async (
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
