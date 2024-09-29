import { Router } from 'express'
import { getVideosController } from './getVideosController'
import { createVideoController } from './createVideoController';
import { deleteVideoController } from './deleteVideoController';
import { updateVideoController } from './updateVideoController';
import { findVideoController } from './findVideoController';

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.put('/:id', updateVideoController)
videosRouter.delete('/:id', deleteVideoController)
