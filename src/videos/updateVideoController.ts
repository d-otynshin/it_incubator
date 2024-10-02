import { Request, Response } from 'express';
import { db, setDB } from '../db/db';
import { Resolutions } from '../input-output-types/video-types';
import { validateVideo } from '../helpers/inputValidation';

interface CreateVideoParams {
  id: string;
}

type CreateVideoRequest = {
  title: string;
  author: string;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
  availableResolutions?: Resolutions[];
  publicationDate?: string;
}

export const updateVideoController = (req: Request<CreateVideoParams, null, CreateVideoRequest>, res: Response) => {
  const videos = db.videos;
  const videoIndex = videos.findIndex(video => video.id === parseInt(req.params.id, 10));

  if (videoIndex === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  //@ts-ignore
  const errors = validateVideo(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  videos[videoIndex] = { ...videos[videoIndex], ...req.body }

  setDB({ videos });

  return res.status(204).send();
}
