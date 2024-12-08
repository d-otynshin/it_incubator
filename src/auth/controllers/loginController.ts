import { Request, Response } from 'express';
import { authService } from '../auth-service';

const error = {
  errorsMessages: [
    {
      message: "login or password is incorrect",
      field: "login or password"
    }
  ]
}

export const loginController = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const { loginOrEmail, password } = body;

  const isLoggedIn = await authService.login(loginOrEmail, password);

  return isLoggedIn ? res.status(204).json({}) : res.status(401).json(error)
}
