import { Request, Response } from 'express';
import { db, setDB } from '../db/db';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const deleteVideoController = (req: FindByIdRequest, res: Response) => {
  const videos = db.videos;
  const { id } = req.params;

  const index = videos.findIndex(video => video.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const modifiedVideos = videos.splice(index, 1);
  setDB({ videos: modifiedVideos });

  return res.status(204).send();
}
