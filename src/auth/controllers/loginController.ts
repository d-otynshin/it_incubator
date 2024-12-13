import { Request, Response } from 'express';
import { authService } from '../auth-service';

const error = {
  errorsMessages: [
    {
      message: "login or password is incorrect",
      field: "loginOrEmail"
    }
  ]
}

export const loginController = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  const { loginOrEmail, password } = body;

  const loginResponse = await authService.login(loginOrEmail, password);
  if (!loginResponse) return res.status(401).json(error)

  const { accessToken, refreshToken } = loginResponse;

  const maxAge = 24 * 60 * 60 * 1000;

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge })
  res.status(200).json({ accessToken })

  return;
}
