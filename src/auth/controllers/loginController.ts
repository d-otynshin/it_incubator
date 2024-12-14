import { Request, Response } from 'express';
import { authService, EXPIRATION_TIME } from '../auth-service';

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

  const cookieConfig = {
    httpOnly: true,
    secure: true,
    maxAge: EXPIRATION_TIME.REFRESH
  }

  res.cookie('refreshToken', refreshToken, cookieConfig)
  res.status(200).json({ accessToken })

  return;
}
