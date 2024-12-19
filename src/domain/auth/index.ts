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
  loginValidator, newPasswordValidation,
  passwordValidator, recoveryCodeValidation
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
import {
  loginController,
  newPasswordController,
  passwordRecoveryController
} from './controllers';

export const authRouter = Router()

authRouter.post(
  '/login',
  cRateLimiterMiddleware,
  loginOrEmailValidator,
  errorsHandlerMiddleware(),
  loginController
);

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

authRouter.get(
  '/me',
  cRateLimiterMiddleware,
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

authRouter.post(
  'password-recovery',
  cRateLimiterMiddleware,
  emailValidator,
  errorsHandlerMiddleware(),
  passwordRecoveryController
)

authRouter.post(
  'new-password',
  cRateLimiterMiddleware,
  newPasswordValidation,
  recoveryCodeValidation,
  errorsHandlerMiddleware(),
  newPasswordController
)
