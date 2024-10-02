import { Response, Request } from 'express'

import { OutputErrorsType } from '../input-output-types/output-errors-type'
import { InputVideoType } from '../input-output-types/video-types'
import { validateVideo } from '../helpers/inputValidation';
import { addDays } from '../helpers/date/addDays';

import { db } from '../db/db'
import { VideoDBType } from '../db/video-db-type';

const generateRandomId = () => {
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 1000);

  return Number(`${timestamp}${randomComponent}`);
};
export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<VideoDBType | OutputErrorsType>) => {
  //@ts-ignore
  const errors = validateVideo(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  const newVideo: any = {
    canBeDownloaded: false,
    createdAt: new Date().toISOString(),
    publicationDate: addDays(new Date(), 1).toISOString(),
    id: generateRandomId(),
    ...req.body,
  }

  db.videos = [...db.videos, newVideo]

  return res.status(201).json(newVideo)
}
