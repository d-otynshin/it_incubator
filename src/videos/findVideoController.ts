import { Request, Response } from 'express';
import { db } from '../db/db';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const findVideoController = (req: FindByIdRequest, res: Response) => {
  const videos = db.videos;
  const { id } = req.params;

  const video = videos.find(p => p.id === parseInt(id, 10));

  if (video) {
    return res.status(201).json(video);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
}
