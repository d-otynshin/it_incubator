import { Router } from 'express';
import {
  createUserController,
  getUsersController,
  deleteUsersController
} from './controllers';
import { errorsHandlerMiddleware, authMiddleware } from '../../middlewares';
import {
  loginValidator,
  emailValidator,
  passwordValidator
} from './middlewares/validation'

export const usersRouter = Router();

usersRouter.get('/', getUsersController)

usersRouter.post(
  '/',
  authMiddleware,
  loginValidator,
  emailValidator,
  passwordValidator,
  errorsHandlerMiddleware(),
  createUserController
)

usersRouter.delete('/:id', authMiddleware, deleteUsersController)
