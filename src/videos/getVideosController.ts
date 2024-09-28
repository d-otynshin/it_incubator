import { Request, Response } from 'express'
import { db } from '../db/db'

export const getVideosController = (_: Request, res: Response) => {
  const videos = db.videos

  res.status(200).json(videos)
}
