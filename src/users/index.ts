import { Router } from 'express';
import {
  createUserController,
  getUsersController,
  deleteUsersController
} from './controllers';
import { errorsHandlerMiddleware, authMiddleware } from '../middlewares';
import { userValidators } from './middlewares/validation';

export const usersRouter = Router();

usersRouter.get('/', getUsersController)
usersRouter.post('/', authMiddleware, ...userValidators, errorsHandlerMiddleware(), createUserController)
usersRouter.delete('/:id', authMiddleware, deleteUsersController)
