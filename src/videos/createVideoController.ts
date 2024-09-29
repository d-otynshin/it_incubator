import { Response, Request } from 'express'
import { OutputErrorsType } from '../input-output-types/output-errors-type'
import { db } from '../db/db'
import { InputVideoType, Resolutions } from '../input-output-types/video-types'
import { VideoDBType } from '../db/video-db-type';

const inputValidation = (video: InputVideoType) => {
  const errors: OutputErrorsType = {
    errorsMessages: []
  }

  if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !Resolutions[p])) {

    errors.errorsMessages.push({
      message: 'wrong available resolution', field: 'availableResolution'
    })
  }
  return errors
}

const generateRandomId = () => {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomComponent = Math.floor(Math.random() * 1000); // A random number to ensure uniqueness
  return Number(`${timestamp}${randomComponent}`);
};
export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<VideoDBType | OutputErrorsType>) => {
  const errors = inputValidation(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  const newVideo: any = {
    ...req.body,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    id: generateRandomId(),
  }
  db.videos = [...db.videos, newVideo]

  return res.status(201).json(newVideo)
}
