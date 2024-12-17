import { Router } from 'express';
import { loginController } from './controllers/loginController';
import { accessTokenGuard } from './middlewares/accessTokenGuard';
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
import { errorsHandlerMiddleware, refreshTokenGuard } from '../../middlewares';
import { checkEmailDuplicationMiddleware, checkLoginDuplicationMiddleware } from './middlewares/duplicateMiddleware';
import { logoutController } from './controllers/logoutController';
import { refreshTokenController } from './controllers/refreshTokenController';

export const authRouter = Router()

authRouter.post(
  '/logout',
  refreshTokenGuard,
  logoutController
);

authRouter.post(
  '/refresh-token',
  refreshTokenGuard,
  refreshTokenController
);

authRouter.post(
  '/login',
  loginOrEmailValidator,
  errorsHandlerMiddleware(),
  loginController
);

authRouter.get(
  '/me',
  accessTokenGuard,
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
