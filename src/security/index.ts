import { Router } from 'express';
import {
  getSessionsController,
  terminateSessionsController,
  terminateSessionByIdController
} from './controllers';
import { refreshTokenGuard } from '../auth/middlewares/refreshTokenGuard';

export const securityRouter = Router();

securityRouter.get('/devices', refreshTokenGuard, getSessionsController)
securityRouter.delete('/devices', refreshTokenGuard, terminateSessionsController)
securityRouter.delete('/devices/:id', refreshTokenGuard, terminateSessionByIdController)
