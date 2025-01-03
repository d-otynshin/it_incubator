import { Router } from 'express';
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
  newPasswordValidation,
  passwordValidator,
  recoveryCodeValidation
} from './middlewares/validationMiddlewares';

import {
  rateLimiterMiddleware,
  errorsHandlerMiddleware,
  refreshTokenGuard
} from '../../infrastructure/middlewares';

import {
  checkEmailDuplicationMiddleware,
  checkLoginDuplicationMiddleware
} from './middlewares/duplicateMiddleware';

import {
  loginController,
  newPasswordController,
  passwordRecoveryController
} from './controllers';

import { recoveryCodeGuard } from './middlewares/recoveryCodeGuard';

export const authRouter = Router()

authRouter.post(
  '/login',
  rateLimiterMiddleware,
  loginOrEmailValidator,
  errorsHandlerMiddleware(),
  loginController
);

authRouter.post(
  '/logout',
  rateLimiterMiddleware,
  refreshTokenGuard,
  logoutController
);

authRouter.post(
  '/refresh-token',
  rateLimiterMiddleware,
  refreshTokenGuard,
  refreshTokenController
);

authRouter.get(
  '/me',
  rateLimiterMiddleware,
  accessTokenGuard,
  getMeController,
);

authRouter.post(
  '/registration',
  rateLimiterMiddleware,
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
  rateLimiterMiddleware,
  codeValidator,
  errorsHandlerMiddleware(),
  confirmController
);

authRouter.post(
  '/registration-email-resending',
  rateLimiterMiddleware,
  emailValidator,
  errorsHandlerMiddleware(),
  resendEmailController
);

authRouter.post(
  '/password-recovery',
  rateLimiterMiddleware,
  emailValidator,
  errorsHandlerMiddleware(),
  passwordRecoveryController
)

authRouter.post(
  '/new-password',
  rateLimiterMiddleware,
  newPasswordValidation,
  recoveryCodeValidation,
  errorsHandlerMiddleware(),
  recoveryCodeGuard,
  newPasswordController
)
