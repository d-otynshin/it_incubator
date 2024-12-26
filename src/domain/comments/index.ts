import { Router } from 'express';
import { updateCommentsController } from './controllers/updateCommentsController';
import { getCommentByIdController } from './controllers/getCommentByIdController';
import { deleteCommentsController } from './controllers/deleteCommentsController';
import { updateCommentsLikeController } from './controllers/updateCommentsLikeController';

import {
  contentValidator,
  likeStatusValidator
} from './middlewares/validation';
import { accessTokenGuard } from '../auth/middlewares/accessTokenGuard';
import { errorsHandlerMiddleware } from '../../infrastructure/middlewares';
import { accessTokenProvider } from '../auth/middlewares/accessTokenProvider';

export const commentsRouter = Router();

commentsRouter.get(
  '/:id',
  accessTokenProvider,
  getCommentByIdController
)

commentsRouter.put(
  '/:id',
  accessTokenGuard,
  contentValidator,
  errorsHandlerMiddleware(),
  updateCommentsController
)

commentsRouter.put(
  '/:id/like-status',
  accessTokenGuard,
  likeStatusValidator,
  errorsHandlerMiddleware(),
  updateCommentsLikeController
)

commentsRouter.delete(
  '/:id',
  accessTokenGuard,
  deleteCommentsController
)
