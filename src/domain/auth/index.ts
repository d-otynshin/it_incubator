import { Router } from 'express';
import { loginController } from './controllers/loginController';
import { accessTokenGuard } from './middlewares/accessTokenGuard';
import { getMeController } from './controllers/getMeController';
import { confirmController } from './controllers/confirmController';
import { registerController } from './controllers/registerController';
import { resendEmailController } from './controllers/resendEmailController';
import { logoutController } from './controllers/logoutController';
import { refreshTokenController } from './controllers/refreshTokenController';
import {
  codeValidator,
  emailValidator,
  loginOrEmailValidator,
  loginValidator,
  passwordValidator
} from './middlewares/validationMiddlewares';
import {
  cRateLimiterMiddleware,
  errorsHandlerMiddleware,
  refreshTokenGuard
} from '../../middlewares';
import {
  checkEmailDuplicationMiddleware,
  checkLoginDuplicationMiddleware
} from './middlewares/duplicateMiddleware';

export const authRouter = Router()

authRouter.post(
  '/logout',
  cRateLimiterMiddleware,
  refreshTokenGuard,
  logoutController
);

authRouter.post(
  '/refresh-token',
  cRateLimiterMiddleware,
  refreshTokenGuard,
  refreshTokenController
);

authRouter.post(
  '/login',
  cRateLimiterMiddleware,
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
  cRateLimiterMiddleware,
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
  cRateLimiterMiddleware,
  codeValidator,
  errorsHandlerMiddleware(),
  confirmController
);

authRouter.post(
  '/registration-email-resending',
  cRateLimiterMiddleware,
  emailValidator,
  errorsHandlerMiddleware(),
  resendEmailController
);
