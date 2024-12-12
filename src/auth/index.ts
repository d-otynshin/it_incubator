import { Router } from 'express';
import { loginController } from './controllers/loginController';
import { accessTokenGuardMiddleware } from './middlewares/accessTokenGuardMiddleware';
import { getMeController } from './controllers/getMeController';
import { confirmController } from './controllers/confirmController';
import { registerController } from './controllers/registerController';
import { resendEmailController } from './controllers/resendEmailController';
import {
  codeValidator,
  emailValidator,
  loginOrEmailValidator,
  loginValidator,
  passwordValidator
} from './middlewares/validationMiddlewares';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';
import { checkEmailDuplicationMiddleware, checkLoginDuplicationMiddleware } from './middlewares/duplicateMiddleware';

export const authRouter = Router()

authRouter.post(
  '/login',
  loginOrEmailValidator,
  errorsHandlerMiddleware(),
  loginController
);

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
  checkLoginDuplicationMiddleware,
  checkEmailDuplicationMiddleware,
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
  emailValidator,
  errorsHandlerMiddleware(),
  resendEmailController
);
