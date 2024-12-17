import { Router } from 'express';
import {
  getSessionsController,
  terminateSessionsController,
  terminateSessionByIdController
} from './controllers';

export const securityRouter = Router();

securityRouter.get('/devices', getSessionsController)
securityRouter.delete('/devices', terminateSessionsController)
securityRouter.delete('/devices/:id', terminateSessionByIdController)
