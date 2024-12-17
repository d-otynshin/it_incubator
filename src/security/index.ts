import { Router } from 'express';

import { permissionMiddleware } from './middlewares';
import { refreshTokenGuard } from '../middlewares';
import {
  getSessionsController,
  terminateSessionsController,
  terminateSessionByIdController
} from './controllers';

export const securityRouter = Router();

securityRouter.get(
  '/devices',
  refreshTokenGuard,
  getSessionsController
)

securityRouter.delete(
  '/devices',
  refreshTokenGuard,
  terminateSessionsController
)

securityRouter.delete(
  '/devices/:id',
  refreshTokenGuard,
  permissionMiddleware,
  terminateSessionByIdController
)
