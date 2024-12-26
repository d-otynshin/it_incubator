import { Router } from 'express';
import { updateCommentsController } from './controllers/updateCommentsController';
import { getCommentByIdController } from './controllers/getCommentsController';
import { deleteCommentsController } from './controllers/deleteCommentsController';
import { errorsHandlerMiddleware } from '../../infrastructure/middlewares';
import { contentValidator } from './middlewares/validation';
import { accessTokenGuard } from '../auth/middlewares/accessTokenGuard';

export const commentsRouter = Router();

commentsRouter.get('/:id', getCommentByIdController)

commentsRouter.put(
  '/:id',
  accessTokenGuard,
  contentValidator,
  errorsHandlerMiddleware(),
  updateCommentsController
)

commentsRouter.delete(
  '/:id',
  accessTokenGuard,
  deleteCommentsController
)
