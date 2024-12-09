import { Router } from 'express';
import { createUserController } from './controllers/createUserController';
import { getUsersController } from './controllers/getUsersController';
import { deleteUsersController } from './controllers/deleteUsersController';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';
import { authMiddleware } from '../middlewares/auth';
import { userValidators } from './middlewares/validation';

export const usersRouter = Router();

usersRouter.get('/', getUsersController)
usersRouter.post('/', authMiddleware, ...userValidators, errorsHandlerMiddleware(), createUserController)
usersRouter.delete('/:id', authMiddleware, deleteUsersController)
