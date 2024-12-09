import { Router } from 'express';
import { loginController } from './controllers/loginController';
import { accessTokenGuardMiddleware } from './middlewares/accessTokenGuardMiddleware';
import { getMeController } from './controllers/getMeController';

export const authRouter = Router()

authRouter.post('/login', loginController);

authRouter.get(
  '/me',
  accessTokenGuardMiddleware,
  getMeController,
);
