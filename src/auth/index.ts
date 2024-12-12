import { Router } from 'express';
import { loginController } from './controllers/loginController';
import { accessTokenGuardMiddleware } from './middlewares/accessTokenGuardMiddleware';
import { getMeController } from './controllers/getMeController';
import { confirmController } from './controllers/confirmController';
import { registerController } from './controllers/registerController';
import { resendEmailController } from './controllers/resendEmailController';
import { codeValidator, emailValidator, loginValidator, passwordValidator } from './middlewares/validationMiddlewares';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';

export const authRouter = Router()

authRouter.post('/login', loginController);

authRouter.get(
  '/me',
  accessTokenGuardMiddleware,
  getMeController,
);

authRouter.post(
  '/registration',
  loginValidator,
  emailValidator,
  passwordValidator,
  errorsHandlerMiddleware(),
  registerController
);

authRouter.post(
  '/registration-confirmation',
  codeValidator,
  errorsHandlerMiddleware(),
  confirmController
);

authRouter.post(
  '/registration-email-resending',
  codeValidator,
  errorsHandlerMiddleware(),
  resendEmailController
);
