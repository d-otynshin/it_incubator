import { Request, Response } from 'express'
import { authService } from '../auth-service';

type TNewPasswordDTO = {
  newPassword: string
  recoveryCode: string
}

export const newPasswordController = async (
  req: Request<TNewPasswordDTO>,
  res: Response,
) => {
  const { newPassword, recoveryCode } = req.body;

  const isUpdated = await authService.newPassword(newPassword, recoveryCode);

  return isUpdated
    ? res.status(204).send()
    : res.status(400).send()
}
