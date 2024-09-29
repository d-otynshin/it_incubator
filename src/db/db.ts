import { VideoDBType } from './video-db-type';
import { mockVideos } from './mock';

export type DBType = {
  videos: VideoDBType[]
}

export const db: DBType = {
  videos: mockVideos,
}

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    db.videos = []
    return
  }

  db.videos = dataset.videos || db.videos
}
