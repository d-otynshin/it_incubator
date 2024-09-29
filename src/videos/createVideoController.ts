import { Response, Request } from 'express'
import { OutputErrorsType } from '../input-output-types/output-errors-type'
import { db } from '../db/db'
import { InputVideoType } from '../input-output-types/video-types'
import { VideoDBType } from '../db/video-db-type';
import { addDays } from '../helpers/date/addDays';
import { validateVideo } from '../helpers/inputValidation';

const generateRandomId = () => {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomComponent = Math.floor(Math.random() * 1000); // A random number to ensure uniqueness
  return Number(`${timestamp}${randomComponent}`);
};
export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<VideoDBType | OutputErrorsType>) => {
  //@ts-ignore
  const errors = validateVideo(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  const newVideo: any = {
    ...req.body,
    createdAt: new Date().toISOString(),
    publicationDate: addDays(new Date(), 1).toISOString(),
    id: generateRandomId(),
  }
  db.videos = [...db.videos, newVideo]

  return res.status(201).json(newVideo)
}
